-- ============================================
-- QBX Platform — Add Username + Fix RLS
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add username column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text;

-- 2. Set username for existing profiles (derive from email)
UPDATE public.profiles SET username = split_part(email, '@', 1) WHERE username IS NULL;

-- 3. Fix RLS: allow any authenticated user to insert their own profile
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
