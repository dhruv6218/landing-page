-- Add unique constraint on email to prevent duplicate submissions
-- This ensures the webhook can safely upsert and the landing page handles duplicates gracefully
ALTER TABLE early_access_leads ADD CONSTRAINT unique_email UNIQUE (email);

-- Add index on selected_offer for filtering
CREATE INDEX idx_leads_offer ON early_access_leads(selected_offer);
CREATE INDEX idx_leads_payment_status ON early_access_leads(payment_status);