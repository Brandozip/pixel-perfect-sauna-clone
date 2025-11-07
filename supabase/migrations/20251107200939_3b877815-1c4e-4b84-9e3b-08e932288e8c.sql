-- Create reviews table for testimonial management
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Author information
  author_name TEXT NOT NULL,
  author_location TEXT NOT NULL,
  author_avatar_url TEXT,
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  
  -- Project details
  project_type TEXT,
  project_date DATE,
  
  -- Status and visibility
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  
  -- Admin fields
  admin_notes TEXT,
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'google', 'facebook', 'other'))
);

-- Add comments for documentation
COMMENT ON TABLE public.reviews IS 'Customer reviews and testimonials with approval workflow';
COMMENT ON COLUMN public.reviews.rating IS 'Star rating from 1-5';
COMMENT ON COLUMN public.reviews.status IS 'Review approval status: pending, approved, or rejected';
COMMENT ON COLUMN public.reviews.is_published IS 'Whether the review is visible on the public website';
COMMENT ON COLUMN public.reviews.is_featured IS 'Featured reviews appear prominently on homepage';
COMMENT ON COLUMN public.reviews.source IS 'Where the review originated from';

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published and approved reviews
CREATE POLICY "Anyone can view published reviews"
ON public.reviews
FOR SELECT
USING (is_published = true AND status = 'approved');

-- Policy: Admins can view all reviews
CREATE POLICY "Admins can view all reviews"
ON public.reviews
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Policy: Admins can insert reviews
CREATE POLICY "Admins can insert reviews"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Policy: Admins can update reviews
CREATE POLICY "Admins can update reviews"
ON public.reviews
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Policy: Admins can delete reviews
CREATE POLICY "Admins can delete reviews"
ON public.reviews
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Policy: Anyone can submit a review (for future customer submission form)
CREATE POLICY "Anyone can submit reviews"
ON public.reviews
FOR INSERT
WITH CHECK (status = 'pending' AND is_published = false);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_reviews_updated_at();

-- Migrate existing testimonials data
INSERT INTO public.reviews (author_name, author_location, author_avatar_url, rating, review_text, status, is_published, is_featured, project_date, source)
VALUES 
  ('Nick S.', 'Buckhead', '/assets/testimonial-nick.png', 5, 'We had our sauna installed by Grayson in May 2024. The room was originally a closet turned into a wine cellar. Meeting with Grayson the first visit inspired confidence and a vision. He told us to plan and the timelines and stuck to it. In addition he was always available after the installation to fine tune some extras. I think it''s rare to get this kind of professionalism and I recommend him without reservation.', 'approved', true, true, '2024-05-15', 'website'),
  ('Anonymous', 'Atlanta', '/assets/residential-sauna.png', 5, 'Grayson is the consummate professional. His work is exemplary. Punctual, straightforward, honest and cleans up afterwards which more than I can say for many contractors.', 'approved', true, false, '2024-06-20', 'website'),
  ('Katherine and John', 'Brookhaven', '/assets/outdoor-sauna.png', 5, 'We wanted a custom-cut sauna as part of an extensive home remodel, and had a clear idea of how the sauna should complement our home''s overall design. Of the three companies we spoke with, Grayson was the only one who didn''t try to force a sale by phone, and after a site visit, he presented a design that fit our aesthetic and space perfectly. It was clear that he had actually listened and could honor our vision. Through the build, Grayson and his helpers were honest, professional, and accessible. We love our beautiful new sauna and can''t recommend Grayson highly enough.', 'approved', true, false, '2024-07-10', 'website')
ON CONFLICT DO NOTHING;

-- Create index for better query performance
CREATE INDEX idx_reviews_status ON public.reviews(status);
CREATE INDEX idx_reviews_published ON public.reviews(is_published);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);