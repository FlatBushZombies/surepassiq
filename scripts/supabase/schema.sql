-- Surepass IQ — profiles + enrollment on signup (using Clerk)

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- Profiles mirror Clerk users
create table if not exists public.profiles (
  clerk_id text primary key,
  full_name text,
  avatar_url text,
  enrolled_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Allow users to read and update their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.jwt() ->> 'sub' = clerk_id);

-- Courses table
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  slug text unique not null,
  image_url text,
  duration_hours integer,
  level text check (level in ('beginner', 'intermediate', 'advanced')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.courses enable row level security;

-- Allow everyone to read courses
create policy "Anyone can read courses"
  on public.courses for select
  using (true);

-- User course progress
create table if not exists public.user_course_progress (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  progress_percentage integer not null default 0 check (progress_percentage >= 0 and progress_percentage <= 100),
  completed_at timestamptz,
  last_accessed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(clerk_id, course_id)
);

alter table public.user_course_progress enable row level security;

create policy "Users can read own progress"
  on public.user_course_progress for select
  using (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can insert own progress"
  on public.user_course_progress for insert
  with check (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can update own progress"
  on public.user_course_progress for update
  using (auth.jwt() ->> 'sub' = clerk_id);

-- Achievements table
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  type text not null check (type in ('course_completion', 'streak', 'milestone')),
  criteria jsonb, -- e.g., {"courses_completed": 5}
  created_at timestamptz not null default now()
);

alter table public.achievements enable row level security;

-- Allow everyone to read achievements
create policy "Anyone can read achievements"
  on public.achievements for select
  using (true);

-- User achievements
create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  achievement_id uuid not null references public.achievements (id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique(clerk_id, achievement_id)
);

alter table public.user_achievements enable row level security;

create policy "Users can read own achievements"
  on public.user_achievements for select
  using (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can insert own achievements"
  on public.user_achievements for insert
  with check (auth.jwt() ->> 'sub' = clerk_id);

-- Optional: audit trail of signup / enrollment events
create table if not exists public.enrollment_events (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  source text default 'signup',
  created_at timestamptz not null default now()
);

alter table public.enrollment_events enable row level security;

create policy "Users can read own enrollment events"
  on public.enrollment_events for select
  using (auth.jwt() ->> 'sub' = clerk_id);

-- Function to handle new user (called from webhook or app)
create or replace function public.handle_new_user(clerk_id_input text, full_name_input text, avatar_url_input text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (clerk_id, full_name, avatar_url)
  values (clerk_id_input, full_name_input, avatar_url_input)
  on conflict (clerk_id) do update
    set full_name = excluded.full_name,
        avatar_url = excluded.avatar_url,
        updated_at = now();

  insert into public.enrollment_events (clerk_id, source)
  values (clerk_id_input, 'signup');
end;
$$;
