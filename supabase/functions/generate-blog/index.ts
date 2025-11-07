import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting automated blog generation...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Step 1: Fetch existing blog posts for duplicate prevention
    console.log('📚 Fetching existing blog posts...');
    const { data: existingPosts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('title, slug, category, tags, excerpt')
      .order('created_at', { ascending: false })
      .limit(100);

    if (fetchError) {
      console.error('Error fetching posts:', fetchError);
      throw fetchError;
    }

    const existingTopics = existingPosts?.map(p => ({
      title: p.title,
      category: p.category,
      tags: p.tags || []
    })) || [];

    console.log(`Found ${existingTopics.length} existing posts`);

    // Step 2: Generate unique topic
    console.log('🎯 Generating unique topic...');
    const topicPrompt = `You are a sauna industry expert content strategist. 

Existing blog topics:
${existingTopics.map(t => `- ${t.title} (${t.category})`).slice(0, 30).join('\n')}

Generate 1 unique, SEO-optimized blog topic about saunas that:
1. Has NOT been covered in the existing topics above
2. Is highly searchable and valuable for potential sauna buyers
3. Falls into one of these categories: Health Benefits, Installation Guide, Maintenance, Design Trends, Cost Analysis, Customer Stories, Seasonal Usage, Buying Guide, Technology, Safety
4. Will rank well in search engines
5. Addresses specific customer questions or pain points

Focus areas: traditional saunas, infrared saunas, outdoor saunas, steam rooms, sauna installation, health benefits, maintenance, design ideas.

Return ONLY a JSON object with this exact structure:
{
  "title": "Engaging blog post title (50-60 characters)",
  "category": "One of the categories listed above",
  "target_keyword": "Primary SEO keyword phrase",
  "search_intent": "informational/commercial/transactional"
}`;

    const topicResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: topicPrompt }],
        temperature: 0.9,
      }),
    });

    if (!topicResponse.ok) {
      const errorText = await topicResponse.text();
      console.error('Topic generation failed:', topicResponse.status, errorText);
      throw new Error(`Topic generation failed: ${errorText}`);
    }

    const topicData = await topicResponse.json();
    const topicText = topicData.choices[0].message.content.trim();
    const topicJsonMatch = topicText.match(/\{[\s\S]*\}/);
    const topic = JSON.parse(topicJsonMatch ? topicJsonMatch[0] : topicText);
    
    console.log('✅ Generated topic:', topic.title);

    // Step 3: Generate outline
    console.log('📝 Generating outline...');
    const outlinePrompt = `Create a detailed blog post outline for: "${topic.title}"

Target keyword: "${topic.target_keyword}"
Category: ${topic.category}
Search intent: ${topic.search_intent}

Create a comprehensive outline with:
- Engaging introduction (hook + problem + solution preview)
- 5-7 main H2 sections with 2-3 H3 subsections each
- FAQ section with 4-5 common questions
- Conclusion with clear call-to-action
- Target length: 1800-2200 words

Return ONLY a JSON object:
{
  "outline": [
    {
      "heading": "H2 heading text",
      "subheadings": ["H3 text", "H3 text"],
      "key_points": ["point 1", "point 2"]
    }
  ],
  "introduction_hook": "Compelling opening sentence",
  "conclusion_cta": "Call to action text"
}`;

    const outlineResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: outlinePrompt }],
        temperature: 0.7,
      }),
    });

    const outlineData = await outlineResponse.json();
    const outlineText = outlineData.choices[0].message.content.trim();
    const outlineJsonMatch = outlineText.match(/\{[\s\S]*\}/);
    const outline = JSON.parse(outlineJsonMatch ? outlineJsonMatch[0] : outlineText);
    
    console.log('✅ Generated outline with', outline.outline.length, 'sections');

    // Step 4: Write full blog post
    console.log('✍️ Writing full blog post...');
    const contentPrompt = `Write a complete, SEO-optimized blog post about: "${topic.title}"

Target keyword: "${topic.target_keyword}"
Outline: ${JSON.stringify(outline, null, 2)}

Requirements:
1. Write in markdown format
2. 1800-2200 words total
3. Engaging, conversational tone (professional but friendly)
4. Include specific examples and practical advice
5. Use target keyword naturally 3-5 times
6. Include LSI keywords related to saunas
7. Add internal linking suggestions [like this](/services/custom-sauna-design)
8. Include statistics or facts where relevant
9. Write for both beginners and experienced sauna users
10. Add FAQ section at the end with schema-markup-friendly Q&A format
11. End with clear call-to-action

Target audience: Homeowners considering buying or installing a sauna

Return ONLY the markdown content (no JSON wrapper, just the blog post content).`;

    const contentResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: contentPrompt }],
        temperature: 0.7,
      }),
    });

    const contentData = await contentResponse.json();
    const content = contentData.choices[0].message.content.trim();
    
    const wordCount = content.split(/\s+/).length;
    console.log('✅ Generated content:', wordCount, 'words');

    // Step 5: Generate SEO metadata
    console.log('🔍 Generating SEO metadata...');
    const seoPrompt = `Generate SEO metadata for this blog post:

Title: "${topic.title}"
Content preview: ${content.substring(0, 500)}...

Generate optimized metadata:

Return ONLY a JSON object:
{
  "seo_title": "SEO-optimized title (50-60 chars, include target keyword)",
  "seo_description": "Compelling meta description (150-160 chars)",
  "seo_keywords": "keyword1, keyword2, keyword3, keyword4, keyword5",
  "excerpt": "Brief 2-3 sentence excerpt for preview (120-150 chars)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`;

    const seoResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: seoPrompt }],
        temperature: 0.5,
      }),
    });

    const seoData = await seoResponse.json();
    const seoText = seoData.choices[0].message.content.trim();
    const seoJsonMatch = seoText.match(/\{[\s\S]*\}/);
    const seo = JSON.parse(seoJsonMatch ? seoJsonMatch[0] : seoText);
    
    console.log('✅ Generated SEO metadata');

    // Step 6: Calculate reading time
    const readingTimeMinutes = Math.ceil(wordCount / 200);

    // Step 7: Generate slug
    const slug = topic.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Step 8: Save to database
    console.log('💾 Saving blog post to database...');
    const { data: insertedPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert([{
        title: topic.title,
        slug,
        content,
        excerpt: seo.excerpt,
        category: topic.category,
        tags: seo.tags,
        seo_title: seo.seo_title,
        seo_description: seo.seo_description,
        seo_keywords: seo.seo_keywords,
        reading_time_minutes: readingTimeMinutes,
        status: 'draft',
        author_name: 'Saunas Plus',
        article_type: 'BlogPosting',
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Error saving post:', insertError);
      throw insertError;
    }

    console.log('✅ Blog post saved as draft:', insertedPost.id);

    // Step 9: Optional - Send admin notification
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      console.log('📧 Sending admin notification...');
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Saunas Plus <onboarding@resend.dev>',
            to: ['admin@saunasplus.com'], // Update with actual admin email
            subject: `New Blog Post Generated: ${topic.title}`,
            html: `
              <h2>🎉 New Blog Post Ready for Review</h2>
              <p>A new blog post has been automatically generated and saved as a draft.</p>
              <h3>${topic.title}</h3>
              <p><strong>Category:</strong> ${topic.category}</p>
              <p><strong>Word Count:</strong> ${wordCount} words</p>
              <p><strong>Reading Time:</strong> ${readingTimeMinutes} minutes</p>
              <p><strong>Keywords:</strong> ${seo.seo_keywords}</p>
              <p><strong>Excerpt:</strong> ${seo.excerpt}</p>
              <p><a href="https://your-domain.com/admin/blog/${insertedPost.id}/edit">Edit Post</a></p>
            `,
          }),
        });

        if (emailResponse.ok) {
          console.log('✅ Admin notification sent');
        }
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the whole operation if email fails
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        post: {
          id: insertedPost.id,
          title: insertedPost.title,
          slug: insertedPost.slug,
          category: insertedPost.category,
          wordCount,
          readingTime: readingTimeMinutes,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('❌ Blog generation failed:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
