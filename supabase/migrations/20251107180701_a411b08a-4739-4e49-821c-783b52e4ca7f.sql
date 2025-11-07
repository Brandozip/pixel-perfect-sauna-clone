-- Create contacts table for storing form submissions
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_interested_in TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact form submissions
CREATE POLICY "Anyone can submit contact form"
  ON public.contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can view contacts (for admin purposes)
CREATE POLICY "Admins can view contacts"
  ON public.contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON public.contacts(email);