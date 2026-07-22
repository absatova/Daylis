# Daylis + Supabase

## 1. Install

```bash
npm install
```

## 2. Create `.env.local`

Copy `.env.example` to `.env.local` and insert your Supabase Project URL and publishable key.

## 3. Database

Open Supabase SQL Editor and run the complete contents of `supabase-setup.sql`.

## 4. Run

```bash
npm run dev
```

This build stores all entries in Supabase and listens for realtime changes.

Security note: the current profile picker has no passwords, so the included RLS policies allow public access through the publishable key. Add Supabase Auth/PIN-based authorization before using sensitive data.


## Secure passwords

Read `PASSWORD-SETUP.md`. This version uses Supabase Auth and Row Level Security.

## Automatic user setup

Run `supabase-setup.sql`, then follow `SETUP-STEPS.md`. The included private one-time script creates all nine Supabase Auth users with the supplied passwords and links their profiles automatically.
