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

  const startTime = Date.now();
  let logId: string | null = null;

  try {
    console.log('🚀 Starting automated blog generation...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create generation log
    const { data: logData, error: logError } = await supabase
      .from('blog_generation_logs')
      .insert([{ 
        status: 'in_progress',
        current_step: 'initializing',
        total_steps: 10,
        completed_steps: 0
      }])
      .select()
      .single();

    if (logError) throw logError;
    logId = logData.id;

    const updateLog = async (step: string, stepNum: number, result?: any) => {
      console.log(`📍 Step ${stepNum}/10: ${step}`);
      await supabase
        .from('blog_generation_logs')
        .update({
          current_step: step,
          completed_steps: stepNum,
          ...(result && { [`${step.replace(/ /g, '_').toLowerCase()}_result`]: result })
        })
        .eq('id', logId);
    };

    // Fetch settings
    await updateLog('Loading Settings', 1);
    const { data: settings, error: settingsError } = await supabase
      .from('blog_generator_settings')
      .select('*')
      .single();

    if (settingsError) throw settingsError;

    // Step 1: Fetch existing blog posts
    await updateLog('Analyzing Existing Content', 2);
    const { data: existingPosts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('title, slug, category, tags, excerpt')
      .order('created_at', { ascending: false })
      .limit(100);

    if (fetchError) throw fetchError;

    const existingTopics = existingPosts?.map(p => `- ${p.title} (${p.category})`).join('\n') || '';

    // Step 2: Generate unique topic
    await updateLog('Generating Topic', 3);
    const topicPrompt = settings.topic_prompt.replace('[EXISTING_TOPICS]', existingTopics);
    
    const topicResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: topicPrompt }],
      }),
    });

    if (!topicResponse.ok) {
      const errorText = await topicResponse.text();
      throw new Error(`Topic generation failed: ${errorText}`);
    }

    const topicData = await topicResponse.json();
    const topicText = topicData.choices[0].message.content.trim();
    const topicJsonMatch = topicText.match(/\{[\s\S]*\}/);
    const topic = JSON.parse(topicJsonMatch ? topicJsonMatch[0] : topicText);
    
    await updateLog('Generating Topic', 3, topic);

    // Step 3: Research & gather information
    await updateLog('Researching Content', 4);
    const researchPrompt = settings.research_prompt.replace('[TOPIC]', topic.title);
    
    const researchResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: researchPrompt }],
      }),
    });

    const researchData = await researchResponse.json();
    const researchText = researchData.choices[0].message.content.trim();
    await updateLog('Researching Content', 4, { research: researchText.substring(0, 500) });

    // Step 4: Generate outline
    await updateLog('Creating Outline', 5);
    const outlinePrompt = settings.outline_prompt
      .replace('[TOPIC]', topic.title)
      .replace('[RESEARCH]', researchText);
    
    const outlineResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: outlinePrompt }],
      }),
    });

    const outlineData = await outlineResponse.json();
    const outlineText = outlineData.choices[0].message.content.trim();
    const outlineJsonMatch = outlineText.match(/\{[\s\S]*\}/);
    const outline = JSON.parse(outlineJsonMatch ? outlineJsonMatch[0] : outlineText);
    
    await updateLog('Creating Outline', 5, outline);

    // Step 5: Write full content (use Pro if enabled)
    await updateLog('Writing Content', 6);
    const contentPrompt = settings.content_prompt
      .replace('[WORD_COUNT]', settings.target_word_count.toString())
      .replace('[OUTLINE]', JSON.stringify(outline, null, 2));
    
    const contentModel = settings.use_pro_for_content ? 'google/gemini-2.5-pro' : 'google/gemini-2.5-flash';
    
    const contentResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: contentModel,
        messages: [{ role: 'user', content: contentPrompt }],
      }),
    });

    const contentData = await contentResponse.json();
    let content = contentData.choices[0].message.content.trim();
    const wordCount = content.split(/\s+/).length;
    
    await updateLog('Writing Content', 6, { wordCount });

    // Step 6: Fact check (use Pro if enabled)
    await updateLog('Fact Checking', 7);
    const factCheckPrompt = settings.fact_check_prompt.replace('[CONTENT]', content);
    const factCheckModel = settings.use_pro_for_fact_check ? 'google/gemini-2.5-pro' : 'google/gemini-2.5-flash';
    
    const factCheckResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: factCheckModel,
        messages: [{ role: 'user', content: factCheckPrompt }],
      }),
    });

    const factCheckData = await factCheckResponse.json();
    const factCheckResult = factCheckData.choices[0].message.content.trim();
    await updateLog('Fact Checking', 7, { summary: factCheckResult.substring(0, 500) });

    // Step 7: Edit for clarity
    await updateLog('Editing for Clarity', 8);
    const clarityPrompt = settings.clarity_edit_prompt.replace('[CONTENT]', content);
    
    const clarityResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: clarityPrompt }],
      }),
    });

    const clarityData = await clarityResponse.json();
    content = clarityData.choices[0].message.content.trim();
    await updateLog('Editing for Clarity', 8);

    // Step 8: Get image suggestions
    await updateLog('Planning Images', 9);
    const imagePrompt = settings.image_suggestions_prompt.replace('[CONTENT]', content);
    
    const imageSuggestionsResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: imagePrompt }],
      }),
    });

    const imageSuggestionsData = await imageSuggestionsResponse.json();
    const imageSuggestionsText = imageSuggestionsData.choices[0].message.content.trim();
    
    // Parse image suggestions
    let imageSuggestions: any[] = [];
    try {
      const jsonMatch = imageSuggestionsText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        imageSuggestions = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.log('Could not parse image suggestions as JSON, using raw text');
    }

    await updateLog('Planning Images', 9, { count: imageSuggestions.length });

    // Step 9: Generate images if enabled
    const generatedImages: string[] = [];
    if (settings.generate_images && imageSuggestions.length > 0) {
      await updateLog('Generating Images', 10);
      
      const imagesToGenerate = imageSuggestions.slice(0, settings.max_images);
      
      for (let i = 0; i < imagesToGenerate.length; i++) {
        const suggestion = imagesToGenerate[i];
        const imagePromptText = suggestion.generation_prompt || suggestion.description || 
          `A professional photograph for a sauna blog article, showing ${suggestion.type}`;
        
        try {
          const imageGenResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${lovableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash-image',
              messages: [{
                role: 'user',
                content: imagePromptText
              }],
              modalities: ['image', 'text']
            }),
          });

          const imageGenData = await imageGenResponse.json();
          const imageUrl = imageGenData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
          
          if (imageUrl) {
            generatedImages.push(imageUrl);
            
            // Insert image into content at suggested location
            const imageMarkdown = `\n\n![${suggestion.alt_text || 'Sauna image'}](${imageUrl})\n*${suggestion.description || ''}*\n\n`;
            
            // Find a good place to insert (after the suggested section)
            const sectionMatch = content.match(new RegExp(`## ${suggestion.section}[\\s\\S]*?(?=##|$)`, 'i'));
            if (sectionMatch) {
              const insertPos = sectionMatch.index! + sectionMatch[0].length;
              content = content.slice(0, insertPos) + imageMarkdown + content.slice(insertPos);
            }
          }
        } catch (imgError) {
          console.error(`Failed to generate image ${i + 1}:`, imgError);
        }
      }
    }

    await updateLog('Generating Images', 10, { generated: generatedImages.length });

    // Step 10: Generate SEO metadata
    const seoPrompt = settings.seo_prompt
      .replace('[TITLE]', topic.title)
      .replace('[CONTENT_PREVIEW]', content.substring(0, 500));

    const seoResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: seoPrompt }],
      }),
    });

    const seoData = await seoResponse.json();
    const seoText = seoData.choices[0].message.content.trim();
    const seoJsonMatch = seoText.match(/\{[\s\S]*\}/);
    const seo = JSON.parse(seoJsonMatch ? seoJsonMatch[0] : seoText);

    // Calculate reading time
    const readingTimeMinutes = Math.ceil(wordCount / 200);

    // Generate slug
    const slug = topic.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Save blog post
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
        featured_image_url: generatedImages[0] || null,
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    // Update log with completion
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    await supabase
      .from('blog_generation_logs')
      .update({
        status: 'completed',
        blog_post_id: insertedPost.id,
        total_time_seconds: totalTime,
        image_generation_result: { count: generatedImages.length, images: generatedImages }
      })
      .eq('id', logId);

    console.log('✅ Blog post generated:', insertedPost.id);

    return new Response(
      JSON.stringify({
        success: true,
        logId,
        post: {
          id: insertedPost.id,
          title: insertedPost.title,
          slug: insertedPost.slug,
          category: insertedPost.category,
          wordCount,
          readingTime: readingTimeMinutes,
          imagesGenerated: generatedImages.length,
          totalTime,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('❌ Blog generation failed:', error);
    
    if (logId) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      await supabase
        .from('blog_generation_logs')
        .update({
          status: 'failed',
          error_message: error instanceof Error ? error.message : 'Unknown error',
          total_time_seconds: totalTime
        })
        .eq('id', logId);
    }

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
