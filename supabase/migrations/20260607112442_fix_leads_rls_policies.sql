-- Drop the insecure policies
DROP POLICY IF EXISTS "Allow public insert access" ON early_access_leads;
DROP POLICY IF EXISTS "Allow individual read access" ON early_access_leads;

-- Allow anonymous inserts from the landing page (no auth required to sign up)
CREATE POLICY "insert_leads_public" ON early_access_leads
  FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated users (admins) can read leads
-- Anon/public cannot read any lead data
CREATE POLICY "select_leads_authenticated" ON early_access_leads
  FOR SELECT TO authenticated USING (true);

-- Service role can do everything (used by edge functions)
-- No additional policy needed - service_role bypasses RLS