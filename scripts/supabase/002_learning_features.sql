-- Surepass IQ - learner features schema extension
-- Run after scripts/supabase/schema.sql

create extension if not exists pgcrypto;

create table if not exists public.course_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  icon text,
  created_at timestamptz not null default now()
);

alter table public.course_categories enable row level security;

create policy "Anyone can read course categories"
  on public.course_categories for select
  using (true);

alter table public.courses
  add column if not exists category_slug text,
  add column if not exists subcategory text,
  add column if not exists language text default 'English',
  add column if not exists last_updated_label text,
  add column if not exists skills jsonb not null default '[]'::jsonb,
  add column if not exists target_audience jsonb not null default '[]'::jsonb,
  add column if not exists learning_outcomes jsonb not null default '[]'::jsonb,
  add column if not exists requirements jsonb not null default '[]'::jsonb;

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  title text not null,
  summary text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create unique index if not exists course_modules_course_position_idx
  on public.course_modules (course_id, position);

alter table public.course_modules enable row level security;

create policy "Anyone can read course modules"
  on public.course_modules for select
  using (true);

create table if not exists public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules (id) on delete cascade,
  title text not null,
  slug text not null,
  kind text not null check (kind in ('video', 'reading', 'lab', 'reflection')),
  summary text,
  objectives jsonb not null default '[]'::jsonb,
  duration_minutes integer not null default 0,
  position integer not null default 0,
  is_preview boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists course_lessons_module_position_idx
  on public.course_lessons (module_id, position);

alter table public.course_lessons enable row level security;

create policy "Anyone can read course lessons"
  on public.course_lessons for select
  using (true);

create table if not exists public.course_assessments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null unique references public.courses (id) on delete cascade,
  title text not null,
  description text,
  pass_mark integer not null default 70 check (pass_mark >= 0 and pass_mark <= 100),
  created_at timestamptz not null default now()
);

alter table public.course_assessments enable row level security;

create policy "Anyone can read assessments"
  on public.course_assessments for select
  using (true);

create table if not exists public.assessment_questions (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.course_assessments (id) on delete cascade,
  prompt text not null,
  options jsonb not null default '[]'::jsonb,
  correct_option integer not null default 0,
  explanation text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create unique index if not exists assessment_questions_position_idx
  on public.assessment_questions (assessment_id, position);

alter table public.assessment_questions enable row level security;

create policy "Anyone can read assessment questions"
  on public.assessment_questions for select
  using (true);

create table if not exists public.learner_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  lesson_id uuid not null references public.course_lessons (id) on delete cascade,
  completed_at timestamptz,
  bookmarked_at timestamptz,
  last_opened_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(clerk_id, lesson_id)
);

alter table public.learner_lesson_progress enable row level security;

create policy "Users can read own lesson progress"
  on public.learner_lesson_progress for select
  using (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can insert own lesson progress"
  on public.learner_lesson_progress for insert
  with check (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can update own lesson progress"
  on public.learner_lesson_progress for update
  using (auth.jwt() ->> 'sub' = clerk_id);

create table if not exists public.learner_assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  assessment_id uuid not null references public.course_assessments (id) on delete cascade,
  score integer not null check (score >= 0 and score <= 100),
  passed boolean not null default false,
  submitted_answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.learner_assessment_attempts enable row level security;

create policy "Users can read own assessment attempts"
  on public.learner_assessment_attempts for select
  using (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can insert own assessment attempts"
  on public.learner_assessment_attempts for insert
  with check (auth.jwt() ->> 'sub' = clerk_id);

create table if not exists public.learner_notes (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  lesson_id uuid references public.course_lessons (id) on delete set null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.learner_notes enable row level security;

create policy "Users can read own notes"
  on public.learner_notes for select
  using (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can insert own notes"
  on public.learner_notes for insert
  with check (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can update own notes"
  on public.learner_notes for update
  using (auth.jwt() ->> 'sub' = clerk_id);

create table if not exists public.wishlists (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(clerk_id, course_id)
);

alter table public.wishlists enable row level security;

create policy "Users can read own wishlist"
  on public.wishlists for select
  using (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can insert own wishlist"
  on public.wishlists for insert
  with check (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can delete own wishlist"
  on public.wishlists for delete
  using (auth.jwt() ->> 'sub' = clerk_id);

create table if not exists public.course_discussions (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  lesson_id uuid references public.course_lessons (id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.course_discussions enable row level security;

create policy "Anyone can read course discussions"
  on public.course_discussions for select
  using (true);

create policy "Users can insert own discussion posts"
  on public.course_discussions for insert
  with check (auth.jwt() ->> 'sub' = clerk_id);

create table if not exists public.learner_notifications (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  course_id uuid references public.courses (id) on delete cascade,
  type text not null check (type in ('course', 'assessment', 'achievement', 'engagement')),
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.learner_notifications enable row level security;

create policy "Users can read own notifications"
  on public.learner_notifications for select
  using (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can insert own notifications"
  on public.learner_notifications for insert
  with check (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can update own notifications"
  on public.learner_notifications for update
  using (auth.jwt() ->> 'sub' = clerk_id);

create table if not exists public.course_certificates (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null references public.profiles (clerk_id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  issued_at timestamptz not null default now(),
  certificate_code text not null unique default encode(gen_random_bytes(8), 'hex'),
  unique(clerk_id, course_id)
);

alter table public.course_certificates enable row level security;

create policy "Users can read own certificates"
  on public.course_certificates for select
  using (auth.jwt() ->> 'sub' = clerk_id);

create policy "Users can insert own certificates"
  on public.course_certificates for insert
  with check (auth.jwt() ->> 'sub' = clerk_id);

create or replace function public.refresh_course_progress(progress_clerk_id text, progress_course_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  total_lessons integer;
  completed_lessons integer;
  passed_assessment boolean;
  calculated_progress integer;
begin
  select count(*)
  into total_lessons
  from public.course_lessons lessons
  join public.course_modules modules on modules.id = lessons.module_id
  where modules.course_id = progress_course_id;

  select count(*)
  into completed_lessons
  from public.learner_lesson_progress progress
  join public.course_lessons lessons on lessons.id = progress.lesson_id
  join public.course_modules modules on modules.id = lessons.module_id
  where progress.clerk_id = progress_clerk_id
    and modules.course_id = progress_course_id
    and progress.completed_at is not null;

  select exists (
    select 1
    from public.learner_assessment_attempts attempts
    join public.course_assessments assessments on assessments.id = attempts.assessment_id
    where attempts.clerk_id = progress_clerk_id
      and assessments.course_id = progress_course_id
      and attempts.passed = true
  )
  into passed_assessment;

  if total_lessons = 0 then
    calculated_progress := case when passed_assessment then 100 else 0 end;
  else
    calculated_progress := round(((completed_lessons + case when passed_assessment then 1 else 0 end)::numeric / (total_lessons + 1)::numeric) * 100);
  end if;

  insert into public.user_course_progress (
    clerk_id,
    course_id,
    progress_percentage,
    completed_at,
    last_accessed_at,
    updated_at
  )
  values (
    progress_clerk_id,
    progress_course_id,
    calculated_progress,
    case when calculated_progress = 100 then now() else null end,
    now(),
    now()
  )
  on conflict (clerk_id, course_id) do update
    set progress_percentage = excluded.progress_percentage,
        completed_at = excluded.completed_at,
        last_accessed_at = excluded.last_accessed_at,
        updated_at = excluded.updated_at;
end;
$$;
