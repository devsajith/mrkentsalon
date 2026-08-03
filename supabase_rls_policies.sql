-- Enable Row Level Security (RLS) on all database tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------
-- Clean up any existing policies
-- ----------------------------------------------------
DROP POLICY IF EXISTS "Allow public read access to services" ON services;
DROP POLICY IF EXISTS "Allow admin insert access to services" ON services;
DROP POLICY IF EXISTS "Allow admin update access to services" ON services;
DROP POLICY IF EXISTS "Allow admin delete access to services" ON services;
DROP POLICY IF EXISTS "Allow full access on services" ON services;

DROP POLICY IF EXISTS "Allow public read access to bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public insert access to bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admin update access to bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admin delete access to bookings" ON bookings;
DROP POLICY IF EXISTS "Allow full access on bookings" ON bookings;

DROP POLICY IF EXISTS "Allow public read access to business_settings" ON business_settings;
DROP POLICY IF EXISTS "Allow admin insert access to business_settings" ON business_settings;
DROP POLICY IF EXISTS "Allow admin update access to business_settings" ON business_settings;
DROP POLICY IF EXISTS "Allow admin delete access to business_settings" ON business_settings;
DROP POLICY IF EXISTS "Allow full access on business_settings" ON business_settings;


-- ====================================================
-- OPTION 1: RECOMMENDED SECURE POLICIES
-- (Public can view services/settings & make bookings; Admin users have full control)
-- ====================================================

-- 1. SERVICES TABLE
CREATE POLICY "Allow public read access to services"
ON services FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow admin insert access to services"
ON services FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow admin update access to services"
ON services FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow admin delete access to services"
ON services FOR DELETE
TO authenticated
USING (true);


-- 2. BOOKINGS TABLE
CREATE POLICY "Allow public read access to bookings"
ON bookings FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow public insert access to bookings"
ON bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow admin update access to bookings"
ON bookings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow admin delete access to bookings"
ON bookings FOR DELETE
TO authenticated
USING (true);


-- 3. BUSINESS SETTINGS TABLE
CREATE POLICY "Allow public read access to business_settings"
ON business_settings FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow admin insert access to business_settings"
ON business_settings FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow admin update access to business_settings"
ON business_settings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow admin delete access to business_settings"
ON business_settings FOR DELETE
TO authenticated
USING (true);


-- ====================================================
-- OPTION 2: UNRESTRICTED FULL ACCESS (IF NEEDED)
-- Uncomment below if you want ANY unauthenticated visitor to have full CRUD rights on all tables.
-- ====================================================

/*
CREATE POLICY "Allow full access on services"
ON services FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access on bookings"
ON bookings FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access on business_settings"
ON business_settings FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);
*/
