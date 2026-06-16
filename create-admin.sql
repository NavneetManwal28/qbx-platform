-- ============================================
-- QBX Platform — Create Admin User
-- Run this in Supabase SQL Editor
-- ============================================
-- 
-- STEP 1: First create the admin user via Supabase Dashboard
--   Go to Authentication → Users → Add User
--   Email: admin@qbx.com  (or your preferred email)
--   Password: your-secure-password
--   Check "Auto Confirm User"
--   Click "Create User"
--
-- STEP 2: Copy the user's UUID from the Users list, then run:

INSERT INTO public.profiles (id, email, name, company, phone, territory, role)
VALUES (
  'PASTE_USER_UUID_HERE',   -- Replace with the UUID from Step 1
  'admin@qbx.com',          -- Same email as Step 1
  'QBX Admin',              -- Admin display name
  'QBX Agency',             -- Company
  '+91 9876543210',         -- Phone
  'All India',              -- Territory
  'admin'                   -- This makes them an admin
);
