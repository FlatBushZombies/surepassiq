# Scripts

SQL and operational helpers for Supabase live in `scripts/supabase/`.

## Setup

1. Create a Supabase project and enable Google under Authentication -> Providers. Add the Google OAuth client ID and secret from Google Cloud Console.
2. In Supabase Authentication -> URL configuration, add your site URL and redirect: `https://<your-domain>/auth/callback` and `http://localhost:3000/auth/callback` for local development.
3. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Database

Run the SQL files in this order:

1. `scripts/supabase/schema.sql`
   Creates learner profiles, base courses, achievements, and course-level progress tables.
2. `scripts/supabase/002_learning_features.sql`
   Adds category, module, lesson, assessment, wishlist, notes, notifications, certificates, and discussion tables.
3. `scripts/supabase/003_learning_seed.sql`
   Seeds starter catalog data aligned to the current learning experience in the app.

These scripts intentionally stop short of payments and admin CMS models, since those are scheduled for a later phase.
