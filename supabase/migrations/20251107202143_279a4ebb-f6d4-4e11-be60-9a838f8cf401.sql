-- Drop triggers first, then functions, then recreate with proper search_path
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
DROP TRIGGER IF EXISTS generate_blog_slug_trigger ON public.blog_posts;
DROP FUNCTION IF EXISTS public.update_blog_posts_updated_at();
DROP FUNCTION IF EXISTS public.generate_blog_slug();

-- Recreate function with proper search_path
CREATE FUNCTION public.update_blog_posts_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate slug generation function with proper search_path
CREATE FUNCTION public.generate_blog_slug()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
    NEW.slug := trim(both '-' from NEW.slug);
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate triggers
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_blog_posts_updated_at();

CREATE TRIGGER generate_blog_slug_trigger
BEFORE INSERT OR UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.generate_blog_slug();