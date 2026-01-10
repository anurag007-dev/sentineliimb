-- Create enum for organization types
CREATE TYPE public.organization_type AS ENUM (
  'PR Agency / Communication',
  'Legal / Compliance',
  'Company',
  'Government / Public Institute',
  'Individual'
);

-- Create early_access_submissions table
CREATE TABLE public.early_access_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization_type organization_type NOT NULL,
  requirement TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.early_access_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (no auth required for early access form)
CREATE POLICY "Allow public to submit early access requests"
ON public.early_access_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to prevent public from reading submissions (admin only via service role)
CREATE POLICY "Prevent public from reading submissions"
ON public.early_access_submissions
FOR SELECT
TO anon
USING (false);

-- Add index on email to help with duplicate checking
CREATE INDEX idx_early_access_email ON public.early_access_submissions(email);

-- Add index on submitted_at for sorting
CREATE INDEX idx_early_access_submitted_at ON public.early_access_submissions(submitted_at DESC);