-- Create site_content table to store all page metadata
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Page Identity
  url TEXT UNIQUE NOT NULL,
  page_type TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT,
  
  -- Content Analysis
  content_summary TEXT,
  key_topics JSONB,
  main_keywords TEXT[],
  excerpt TEXT,
  
  -- Relationships
  internal_links_to JSONB,
  related_pages JSONB,
  category TEXT,
  tags TEXT[],
  
  -- SEO & Context
  h1_heading TEXT,
  h2_headings TEXT[],
  call_to_actions JSONB,
  
  -- Metadata
  word_count INTEGER,
  last_indexed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_modified_at TIMESTAMP WITH TIME ZONE,
  indexed_content TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_site_content_page_type ON public.site_content(page_type);
CREATE INDEX IF NOT EXISTS idx_site_content_category ON public.site_content(category);
CREATE INDEX IF NOT EXISTS idx_site_content_url ON public.site_content(url);
CREATE INDEX IF NOT EXISTS idx_site_content_keywords ON public.site_content USING GIN(main_keywords);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can view site content"
  ON public.site_content
  FOR SELECT
  USING (true);

-- Admins can manage
CREATE POLICY "Admins can insert site content"
  ON public.site_content
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site content"
  ON public.site_content
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site content"
  ON public.site_content
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create content_relationships table
CREATE TABLE IF NOT EXISTS public.content_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  relationship_type TEXT NOT NULL,
  relevance_score FLOAT,
  ai_reasoning TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  UNIQUE(source_url, target_url, relationship_type)
);

-- Enable RLS
ALTER TABLE public.content_relationships ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view content relationships"
  ON public.content_relationships
  FOR SELECT
  USING (true);

-- Admins can manage
CREATE POLICY "Admins can insert content relationships"
  ON public.content_relationships
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update content relationships"
  ON public.content_relationships
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete content relationships"
  ON public.content_relationships
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create blog_writing_context table
CREATE TABLE IF NOT EXISTS public.blog_writing_context (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Business Knowledge
  company_name TEXT DEFAULT 'Saunas Plus',
  brand_voice TEXT,
  target_audience TEXT,
  service_area TEXT DEFAULT 'Atlanta, GA',
  
  -- Internal Linking Strategy
  priority_pages JSONB,
  common_phrases JSONB,
  
  -- Content Guidelines
  linking_rules JSONB,
  prohibited_links TEXT[],
  
  -- Stats for AI Context
  total_published_posts INTEGER DEFAULT 0,
  most_popular_categories JSONB,
  avg_post_length INTEGER DEFAULT 2000,
  
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_writing_context ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view blog writing context"
  ON public.blog_writing_context
  FOR SELECT
  USING (true);

-- Admins can manage
CREATE POLICY "Admins can insert blog writing context"
  ON public.blog_writing_context
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update blog writing context"
  ON public.blog_writing_context
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default context
INSERT INTO public.blog_writing_context (brand_voice, target_audience, linking_rules) VALUES (
  'Professional yet approachable, educational, wellness-focused. Write like a knowledgeable friend sharing expert insights, not a salesperson. Use clear, accessible language that educates while maintaining authority. Balance technical sauna knowledge with practical lifestyle benefits.',
  'Homeowners aged 35-65 interested in wellness, home improvement, and luxury lifestyle upgrades. Mix of sauna beginners researching their first purchase and enthusiasts looking to upgrade. Value quality, health benefits, and expert installation.',
  '{"min_internal_links": 3, "max_internal_links": 8, "prefer_same_category": true, "always_include_contact": true, "prioritize_service_pages": true}'
) ON CONFLICT DO NOTHING;

-- Create trigger to update site_content when blog posts change
CREATE OR REPLACE FUNCTION public.trigger_content_reindex()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.status = 'published') OR 
     (TG_OP = 'UPDATE' AND NEW.status = 'published' AND OLD.status != 'published') OR
     (TG_OP = 'UPDATE' AND NEW.content != OLD.content) THEN
    
    INSERT INTO public.site_content (url, slug, page_type, title, excerpt, category, tags, last_modified_at)
    VALUES (
      '/blog/' || NEW.slug,
      NEW.slug,
      'blog',
      NEW.title,
      NEW.excerpt,
      NEW.category,
      NEW.tags,
      now()
    )
    ON CONFLICT (url) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      category = EXCLUDED.category,
      tags = EXCLUDED.tags,
      last_modified_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER blog_posts_reindex_trigger
AFTER INSERT OR UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.trigger_content_reindex();

-- Create update trigger for site_content
CREATE OR REPLACE FUNCTION public.update_site_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_site_content_updated_at_trigger
BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.update_site_content_updated_at();