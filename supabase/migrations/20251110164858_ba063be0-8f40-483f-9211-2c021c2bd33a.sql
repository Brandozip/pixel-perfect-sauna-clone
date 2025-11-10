-- Create storage bucket for owner photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('owner-photos', 'owner-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create owner_profile table
CREATE TABLE IF NOT EXISTS public.owner_profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT 'Grayson',
  title TEXT DEFAULT 'Owner & Founder',
  bio TEXT NOT NULL,
  short_bio TEXT,
  years_of_experience INTEGER DEFAULT 20,
  photo_url TEXT,
  additional_photos JSONB DEFAULT '[]'::jsonb,
  
  -- Credentials and trust signals
  certifications TEXT[] DEFAULT ARRAY[]::TEXT[],
  license_numbers TEXT[] DEFAULT ARRAY[]::TEXT[],
  insurance_info TEXT,
  bbb_rating TEXT,
  
  -- Contact information
  phone TEXT,
  email TEXT,
  response_time_guarantee TEXT DEFAULT 'Within 24 hours',
  
  -- Additional details
  specialties TEXT[] DEFAULT ARRAY[]::TEXT[],
  favorite_project_description TEXT,
  personal_sauna_details TEXT,
  community_involvement TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.owner_profile ENABLE ROW LEVEL SECURITY;

-- Anyone can view the owner profile (public information)
CREATE POLICY "Anyone can view owner profile"
ON public.owner_profile
FOR SELECT
USING (true);

-- Only admins can update owner profile
CREATE POLICY "Admins can update owner profile"
ON public.owner_profile
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert owner profile
CREATE POLICY "Admins can insert owner profile"
ON public.owner_profile
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_owner_profile_updated_at
BEFORE UPDATE ON public.owner_profile
FOR EACH ROW
EXECUTE FUNCTION public.update_contacts_updated_at();

-- Storage policies for owner photos bucket
CREATE POLICY "Anyone can view owner photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'owner-photos');

CREATE POLICY "Admins can upload owner photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'owner-photos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update owner photos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'owner-photos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete owner photos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'owner-photos' AND has_role(auth.uid(), 'admin'::app_role));

-- Insert default owner profile
INSERT INTO public.owner_profile (
  full_name,
  title,
  bio,
  short_bio,
  years_of_experience,
  certifications,
  specialties
)
VALUES (
  'Grayson',
  'Owner & Founder',
  'Founded Saunas Plus in 2004 after discovering the transformative power of sauna therapy while traveling in Scandinavia. Inspired by the tradition and the profound health benefits, I committed to bringing this experience to the Atlanta community with the highest standards of quality and craftsmanship. Over the past 20 years, I''ve completed over 1,000 installations, each one a testament to my commitment to excellence.',
  'Bringing authentic sauna experiences to Atlanta homes and businesses for over 20 years.',
  20,
  ARRAY['Certified Sauna Installation Professional', 'Licensed General Contractor'],
  ARRAY['Custom Sauna Design', 'Infrared Sauna Installation', 'Steam Shower Systems', 'Outdoor Sauna Construction']
)
ON CONFLICT DO NOTHING;