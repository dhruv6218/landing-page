-- 1. Fix RLS policy: restrict INSERT to only allow email/role/selected_offer/payment_status
--    columns and prevent arbitrary data injection. The previous `WITH CHECK (true)` allowed
--    anon to insert anything. We now restrict so anon can only insert waitlist/pending rows.
DROP POLICY IF EXISTS "insert_leads_public" ON public.early_access_leads;

CREATE POLICY "insert_leads_public" ON public.early_access_leads
  FOR INSERT TO anon
  WITH CHECK (
    selected_offer IN ('waitlist', 'founding_access', 'founder_call')
    AND payment_status IN ('not_required', 'pending')
  );

-- 2. Revoke EXECUTE on rls_auto_enable from anon and authenticated roles.
--    This is a SECURITY DEFINER function — no public user should be able to call it.
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
