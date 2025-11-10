-- Fix contacts table RLS policy to restrict access to admins only
DROP POLICY IF EXISTS "Admins can view contacts" ON public.contacts;

CREATE POLICY "Admins can view contacts"
ON public.contacts
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix blog_writing_context table to restrict SELECT access to admins only
DROP POLICY IF EXISTS "Anyone can view blog writing context" ON public.blog_writing_context;

CREATE POLICY "Admins can view blog writing context"
ON public.blog_writing_context
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));