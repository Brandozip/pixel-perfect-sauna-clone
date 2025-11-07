-- Create table for blog generator settings
CREATE TABLE IF NOT EXISTS public.blog_generator_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Cron schedule settings
  schedule_enabled BOOLEAN NOT NULL DEFAULT true,
  cron_expression TEXT NOT NULL DEFAULT '0 0,12 * * *',
  
  -- Prompt templates for each step
  topic_prompt TEXT NOT NULL DEFAULT 'Act as an experienced blog post copywriter specializing in saunas and wellness. Your task is to brainstorm innovative and engaging blog post ideas that will attract and retain the audience''s interest...',
  research_prompt TEXT NOT NULL DEFAULT 'Act as an experienced blog post copywriter. Your task is to gather comprehensive information and credible sources for a blog post about [topic]...',
  outline_prompt TEXT NOT NULL DEFAULT 'Act as an experienced blog post copywriter tasked with creating a compelling and informative outline for a blog post about [topic]...',
  content_prompt TEXT NOT NULL DEFAULT 'Act as an experienced blog post copywriter tasked with writing a [n] words long blog post based on the provided [outline]...',
  fact_check_prompt TEXT NOT NULL DEFAULT 'Act as a fact-checker and research analyst. Review the following blog post content and identify any claims, statistics, or facts that need verification...',
  clarity_edit_prompt TEXT NOT NULL DEFAULT 'Act as an experienced blog post copywriter. Your task is to meticulously edit the [blog post] to enhance its clarity and coherence...',
  sentence_improve_prompt TEXT NOT NULL DEFAULT 'Act as an experienced blog post copywriter. Your task is to meticulously review and improve the sentence structure in the provided [piece of text]...',
  image_suggestions_prompt TEXT NOT NULL DEFAULT 'Act as an experienced blog post copywriter with a keen eye for enhancing reader engagement through visuals...',
  seo_prompt TEXT NOT NULL DEFAULT 'Generate SEO metadata for this blog post...',
  
  -- Model selection
  use_pro_for_content BOOLEAN NOT NULL DEFAULT true,
  use_pro_for_fact_check BOOLEAN NOT NULL DEFAULT true,
  
  -- Generation settings
  target_word_count INTEGER NOT NULL DEFAULT 2000,
  generate_images BOOLEAN NOT NULL DEFAULT true,
  max_images INTEGER NOT NULL DEFAULT 4
);

-- Enable RLS
ALTER TABLE public.blog_generator_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can view settings"
  ON public.blog_generator_settings
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update settings"
  ON public.blog_generator_settings
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert settings"
  ON public.blog_generator_settings
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_blog_generator_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public';

CREATE TRIGGER update_blog_generator_settings_updated_at
  BEFORE UPDATE ON public.blog_generator_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_generator_settings_updated_at();

-- Insert default settings
INSERT INTO public.blog_generator_settings (
  topic_prompt,
  research_prompt,
  outline_prompt,
  content_prompt,
  fact_check_prompt,
  clarity_edit_prompt,
  sentence_improve_prompt,
  image_suggestions_prompt,
  seo_prompt
) VALUES (
  'Act as an experienced blog post copywriter specializing in saunas, wellness, and home improvement. Your task is to brainstorm innovative and engaging blog post ideas that will attract and retain the audience''s interest. These ideas should not only be informative and relevant to current trends but also encourage interaction and sharing. Consider various angles: how-to guides, health benefit deep-dives, installation tutorials, design inspiration, cost comparisons, customer stories, and expert interviews. Each idea should address specific customer pain points or questions. Prioritize originality and the potential to rank well in search engines while offering fresh insights.

Existing blog topics to avoid:
[EXISTING_TOPICS]

Generate 1 unique blog topic with high search potential.',

  'Act as an experienced research analyst specializing in saunas and wellness. Your task is to gather comprehensive, credible information for a blog post about [TOPIC]. Conduct thorough research ensuring content is engaging, informative, and factually accurate. Identify key points, relevant statistics, expert opinions, recent studies, and industry developments. Source illustrative examples and case studies. Focus on reputable sources and cite them properly. Your research should provide a solid foundation addressing the target audience''s needs while offering genuine value and insight.',

  'Act as an experienced blog post copywriter. Create a compelling, SEO-optimized outline for: [TOPIC]

The outline should:
- Start with an attention-grabbing introduction (hook + problem + solution preview)
- Include 5-7 main H2 sections with 2-3 H3 subsections each
- Have a dedicated FAQ section with 4-5 common questions
- End with a strong conclusion and clear call-to-action
- Target length: 1800-2500 words
- Incorporate SEO best practices and natural keyword placement
- Flow logically with smooth transitions
- Maintain reader engagement throughout',

  'Act as an experienced blog post copywriter. Write a compelling [WORD_COUNT]-word blog post based on this outline:

[OUTLINE]

Requirements:
- Write in markdown format with proper heading hierarchy
- Maintain an engaging, conversational tone (professional but friendly)
- Include specific examples, statistics, and practical advice
- Use target keywords naturally (3-5 times throughout)
- Incorporate LSI keywords related to saunas and wellness
- Add internal linking suggestions in this format: [anchor text](/path)
- Include bullet points and numbered lists for readability
- Write for both beginners and experienced sauna users
- Add a FAQ section at the end with clear Q&A format
- End with a strong call-to-action encouraging readers to contact or learn more
- Use short paragraphs (2-4 sentences) for better readability
- Include transition sentences between sections',

  'Act as a fact-checker and research analyst with expertise in wellness and home improvement. Review this blog post and verify all claims, statistics, and facts:

[CONTENT]

For each claim:
1. Identify the specific statement
2. Verify its accuracy
3. Rate confidence level (High/Medium/Low)
4. Suggest corrections if inaccurate
5. Recommend adding citations where needed

Focus on:
- Health benefit claims
- Statistical data
- Cost estimates
- Technical specifications
- Industry standards
- Safety information

Provide a summary report with:
- Overall accuracy score
- List of verified facts
- List of questionable claims needing correction
- Recommended citations to add',

  'Act as an experienced content editor. Meticulously edit this blog post to enhance clarity and coherence:

[CONTENT]

Focus on:
- Refining structure and logical flow
- Improving readability and accessibility
- Eliminating ambiguity and redundancy
- Simplifying complex sentences
- Enhancing grammar, punctuation, and style
- Ensuring consistent tone and voice
- Strengthening transitions between paragraphs
- Removing jargon or explaining technical terms
- Making the content more engaging and digestible

Your goal: Produce a polished, professional piece that resonates with the target audience from beginning to end.',

  'Act as an experienced copywriter specializing in sentence structure. Review and improve the following text:

[CONTENT]

Focus on:
- Varying sentence lengths for rhythm
- Using active voice predominantly
- Incorporating smooth transitions
- Improving word choice for impact
- Enhancing readability and flow
- Maintaining or improving the original tone
- Making sentences more concise and powerful
- Removing unnecessary words
- Strengthening verbs and reducing adverbs

Ensure the revised text is more attractive, accessible, and engaging.',

  'Act as an experienced blog post copywriter with expertise in visual content strategy. Analyze this blog post and identify where images would significantly boost reader engagement:

[CONTENT]

For each image suggestion provide:
1. Exact location in the article (after which paragraph/section)
2. Type of image needed (photo, infographic, diagram, chart, illustration)
3. Detailed description of what the image should show
4. How it enhances understanding or engagement
5. Suggested alt text for SEO
6. Image generation prompt (detailed description for AI image generation)

Consider:
- Flow of content
- Points of emphasis
- Complex information that needs visualization
- Reader engagement and retention
- SEO image optimization

Provide 3-5 strategic image placements that will maximize impact.',

  'Generate comprehensive SEO metadata for this blog post:

Title: [TITLE]
Content preview: [CONTENT_PREVIEW]

Create:
1. SEO Title: 50-60 characters, include primary keyword, compelling and click-worthy
2. Meta Description: 150-160 characters, summarize value, include keyword, create urgency
3. Focus Keyword: Primary keyword phrase (2-4 words)
4. LSI Keywords: 5-8 related keyword phrases
5. Tags: 5-7 relevant tags
6. Excerpt: 120-150 characters for preview cards
7. URL Slug: SEO-friendly, keyword-rich, short

Ensure all metadata is optimized for search engines while remaining natural and engaging for humans.'
);

-- Create table for tracking generation progress
CREATE TABLE IF NOT EXISTS public.blog_generation_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  
  -- Progress tracking
  status TEXT NOT NULL DEFAULT 'started',
  current_step TEXT,
  total_steps INTEGER DEFAULT 10,
  completed_steps INTEGER DEFAULT 0,
  
  -- Step results
  topic_result JSONB,
  research_result JSONB,
  outline_result JSONB,
  content_result JSONB,
  fact_check_result JSONB,
  clarity_edit_result JSONB,
  sentence_improve_result JSONB,
  image_suggestions_result JSONB,
  image_generation_result JSONB,
  seo_result JSONB,
  
  -- Metadata
  error_message TEXT,
  total_time_seconds INTEGER,
  manual_trigger BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.blog_generation_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can view generation logs"
  ON public.blog_generation_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Index for performance
CREATE INDEX idx_blog_generation_logs_status ON public.blog_generation_logs(status);
CREATE INDEX idx_blog_generation_logs_created_at ON public.blog_generation_logs(created_at DESC);