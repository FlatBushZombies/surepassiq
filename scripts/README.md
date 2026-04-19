# Scripts

SQL and operational helpers for Supabase live in `scripts/supabase/`.

## Setup

1. Create a Supabase project and enable **Google** under Authentication → Providers. Add the Google OAuth client ID and secret from Google Cloud Console.
2. In Supabase Authentication → URL configuration, add your site URL and redirect: `https://<your-domain>/auth/callback` (and `http://localhost:3000/auth/callback` for local dev).
3. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Database

Run `scripts/supabase/schema.sql` in the Supabase SQL editor (or via CLI) to create `profiles`, enrollment tracking, Row Level Security, and the trigger that enrolls new users when they sign up.
