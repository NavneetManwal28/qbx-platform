-- ============================================
-- QBX Platform — Fix RLS Policies
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create a helper function that bypasses RLS to check role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = user_id LIMIT 1;
$$;

-- Step 2: Drop old policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Partners can insert own uploads" ON public.uploads;
DROP POLICY IF EXISTS "Partners can read own uploads" ON public.uploads;
DROP POLICY IF EXISTS "Admins can read all uploads" ON public.uploads;

-- Step 3: Recreate profiles policies
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

-- Step 4: Recreate uploads policies
CREATE POLICY "Partners can insert own uploads"
  ON public.uploads FOR INSERT
  WITH CHECK (auth.uid() = partner_id);

CREATE POLICY "Partners can read own uploads"
  ON public.uploads FOR SELECT
  USING (auth.uid() = partner_id);

CREATE POLICY "Admins can read all uploads"
  ON public.uploads FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');
