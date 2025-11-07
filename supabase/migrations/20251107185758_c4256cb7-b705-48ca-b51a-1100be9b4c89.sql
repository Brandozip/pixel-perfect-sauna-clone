-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'residential',
  featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  seo_keywords TEXT,
  seo_title TEXT,
  seo_description TEXT,
  project_details JSONB,
  is_published BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published gallery images"
  ON public.gallery_images
  FOR SELECT
  USING (is_published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert gallery images"
  ON public.gallery_images
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery images"
  ON public.gallery_images
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery images"
  ON public.gallery_images
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create update trigger
CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_contacts_updated_at();

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Storage RLS policies
CREATE POLICY "Anyone can view gallery images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Admins can upload gallery images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'gallery-images' 
    AND has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can update gallery images"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'gallery-images' 
    AND has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can delete gallery images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'gallery-images' 
    AND has_role(auth.uid(), 'admin'::app_role)
  );