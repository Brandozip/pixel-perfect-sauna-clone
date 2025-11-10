-- Enhance the trigger_content_reindex function to properly extract keywords
CREATE OR REPLACE FUNCTION public.trigger_content_reindex()
RETURNS TRIGGER AS $$
DECLARE
  keywords_array text[];
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.status = 'published') OR 
     (TG_OP = 'UPDATE' AND NEW.status = 'published' AND OLD.status != 'published') OR
     (TG_OP = 'UPDATE' AND NEW.content != OLD.content) THEN
    
    -- Extract keywords from seo_keywords (comma-separated string) into array
    IF NEW.seo_keywords IS NOT NULL AND NEW.seo_keywords != '' THEN
      keywords_array := string_to_array(NEW.seo_keywords, ',');
      -- Trim whitespace from each keyword
      keywords_array := array_agg(trim(keyword)) FROM unnest(keywords_array) AS keyword;
    ELSE
      keywords_array := ARRAY[]::text[];
    END IF;
    
    INSERT INTO public.site_content (
      url, 
      slug, 
      page_type, 
      title, 
      excerpt, 
      category, 
      tags, 
      main_keywords,
      last_modified_at
    )
    VALUES (
      '/blog/' || NEW.slug,
      NEW.slug,
      'blog',
      NEW.title,
      NEW.excerpt,
      NEW.category,
      NEW.tags,
      keywords_array,
      now()
    )
    ON CONFLICT (url) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      category = EXCLUDED.category,
      tags = EXCLUDED.tags,
      main_keywords = EXCLUDED.main_keywords,
      last_modified_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;