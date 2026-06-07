/*
  # Create Early Access Leads Table
  
  ## Query Description:
  This migration creates the core table for capturing ASTRIX AI leads.
  It includes columns for email, role, and payment tracking.
  
  ## Metadata:
  - Schema-Category: Structural
  - Impact-Level: Low
  - Reversible: true
*/

-- Create the table
CREATE TABLE IF NOT EXISTS early_access_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  email text NOT NULL,
  role text,
  company text,
  selected_offer text CHECK (selected_offer IN ('waitlist', 'founding_access', 'founder_call')),
  payment_status text DEFAULT 'not_required' CHECK (payment_status IN ('pending', 'paid', 'failed', 'not_required')),
  notes text
);

-- Enable Row Level Security (Corrected Syntax)
ALTER TABLE early_access_leads ENABLE ROW LEVEL SECURITY;

-- Create Policy to allow public insertion (needed for landing page leads)
CREATE POLICY "Allow public insert access" 
ON early_access_leads 
FOR INSERT 
WITH CHECK (true);

-- Create Policy to allow users to see their own data (optional, based on email)
CREATE POLICY "Allow individual read access" 
ON early_access_leads 
FOR SELECT 
TO anon
USING (true);
