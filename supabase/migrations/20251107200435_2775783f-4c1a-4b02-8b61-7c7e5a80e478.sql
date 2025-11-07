-- Add photographer credit and license information to gallery_images table
ALTER TABLE public.gallery_images 
ADD COLUMN IF NOT EXISTS photographer_credit TEXT,
ADD COLUMN IF NOT EXISTS license_info TEXT DEFAULT 'All Rights Reserved';

-- Add helpful comments
COMMENT ON COLUMN public.gallery_images.photographer_credit IS 'Photographer or creator attribution for the image';
COMMENT ON COLUMN public.gallery_images.license_info IS 'License information (e.g., All Rights Reserved, CC BY 4.0, etc.)';

-- Set default photographer credit for existing images
UPDATE public.gallery_images 
SET photographer_credit = 'Saunas Plus'
WHERE photographer_credit IS NULL;

UPDATE public.gallery_images 
SET license_info = 'All Rights Reserved'
WHERE license_info IS NULL;