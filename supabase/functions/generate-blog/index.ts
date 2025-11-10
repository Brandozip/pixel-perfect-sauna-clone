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
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!;
    
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

    // Fetch content knowledge base
    console.log('📚 Loading content knowledge base...');
    const { data: contentKnowledge } = await supabase
      .from('site_content')
      .select('url, title, page_type, content_summary, main_keywords, related_pages, category');

    const { data: writingContext } = await supabase
      .from('blog_writing_context')
      .select('*')
      .single();

    // Build site context for AI
    const servicePages = contentKnowledge?.filter(c => c.page_type === 'service') || [];
    const healthPages = contentKnowledge?.filter(c => c.page_type === 'health-benefit') || [];
    const utilityPages = contentKnowledge?.filter(c => c.page_type === 'utility') || [];

    const siteContext = `
═══════════════════════════════════════════════════════════════
WEBSITE KNOWLEDGE BASE - USE THIS FOR INTERNAL LINKING
═══════════════════════════════════════════════════════════════

COMPANY INFO:
- Name: ${writingContext?.company_name || 'Saunas Plus'}
- Location: ${writingContext?.service_area || 'Atlanta, GA'}
- Brand Voice: ${writingContext?.brand_voice || 'Professional yet approachable'}

AVAILABLE SERVICE PAGES (Link to these when mentioning services):
${servicePages.map(c => `  • ${c.title} → ${c.url}
    Keywords: ${c.main_keywords?.slice(0, 4).join(', ') || 'N/A'}`).join('\n')}

HEALTH BENEFIT PAGES (Link when discussing wellness/health topics):
${healthPages.map(c => `  • ${c.title} → ${c.url}
    Keywords: ${c.main_keywords?.slice(0, 4).join(', ') || 'N/A'}`).join('\n')}

KEY UTILITY PAGES:
${utilityPages.map(c => `  • ${c.title} → ${c.url}`).join('\n')}

EXISTING BLOG POSTS (Reference to show content depth):
${existingPosts?.slice(0, 10).map(p => `  • ${p.title} → /blog/${p.slug}`).join('\n') || 'None yet'}

═══════════════════════════════════════════════════════════════
INTERNAL LINKING RULES (CRITICAL - FOLLOW EXACTLY):
═══════════════════════════════════════════════════════════════

REQUIREMENTS:
- Include ${writingContext?.linking_rules?.min_internal_links || 3}-${writingContext?.linking_rules?.max_internal_links || 8} internal links per post
- Use EXACT URLs from the lists above (copy them precisely)
- Always link to /contact when mentioning consultations or getting started
- Link naturally within the content flow, not in a separate "Resources" section

HOW TO LINK:
✅ GOOD: "...our [custom sauna design](/services/custom-sauna-design) team can help..."
✅ GOOD: "...studies show [cardiovascular benefits](/health-benefits/cardiovascular) improve..."
✅ GOOD: "...ready to begin? [Contact our team](/contact) for a free consultation..."

❌ BAD: "Click here for more info"
❌ BAD: Links not from the available pages list above
❌ BAD: Too many links in one paragraph

PRIORITY LINK TARGETS (try to include 2-3 of these):
1. Service pages when mentioning installation/design/types
2. Health benefit pages when discussing wellness
3. /contact when suggesting next steps
4. /gallery when mentioning projects/examples
5. Related blog posts for additional reading

═══════════════════════════════════════════════════════════════
`;

    console.log('✅ Content knowledge loaded:', {
      services: servicePages.length,
      health: healthPages.length,
      blogs: existingPosts?.length || 0
    });

    // Step 2: Generate unique topic
    await updateLog('Generating Topic', 3);
    const topicPrompt = settings.topic_prompt.replace('[EXISTING_TOPICS]', existingTopics) + 
      '\n\nIMPORTANT: Return ONLY a valid JSON object with this exact structure, no markdown formatting, no explanations:\n' +
      '{\n' +
      '  "title": "Blog post title here",\n' +
      '  "category": "Category name",\n' +
      '  "target_keyword": "primary keyword phrase",\n' +
      '  "search_intent": "informational"\n' +
      '}';
    
    const topicResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: topicPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
        }
      }),
    });

    if (!topicResponse.ok) {
      const errorText = await topicResponse.text();
      throw new Error(`Topic generation failed: ${errorText}`);
    }

    const topicData = await topicResponse.json();
    const topicText = topicData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    
    // Extract JSON from markdown code blocks if present
    let topic;
    try {
      // Try to find JSON in markdown code blocks first
      const jsonMatch = topicText.match(/```json\s*([\s\S]*?)\s*```/) || 
                       topicText.match(/```\s*([\s\S]*?)\s*```/) ||
                       topicText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        topic = JSON.parse(jsonStr);
      } else {
        topic = JSON.parse(topicText);
      }
    } catch (parseError) {
      console.error('Failed to parse topic JSON:', topicText);
      throw new Error(`Invalid topic JSON response: ${parseError instanceof Error ? parseError.message : 'Parse failed'}`);
    }
    
    await updateLog('Generating Topic', 3, topic);

    // Step 3: Research & gather information
    await updateLog('Researching Content', 4);
    const researchPrompt = settings.research_prompt.replace('[TOPIC]', topic.title);
    
    const researchResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: researchPrompt }] }],
      }),
    });

    const researchData = await researchResponse.json();
    const researchText = researchData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    await updateLog('Researching Content', 4, { research: researchText.substring(0, 500) });

    // Step 4: Generate outline
    await updateLog('Creating Outline', 5);
    const outlinePrompt = settings.outline_prompt
      .replace('[TOPIC]', topic.title)
      .replace('[RESEARCH]', researchText) +
      '\n\nIMPORTANT: Return ONLY a valid JSON object with this structure, no markdown formatting:\n' +
      '{\n' +
      '  "outline": [{"heading": "H2 text", "subheadings": ["H3 text"], "key_points": ["point"]}],\n' +
      '  "introduction_hook": "Opening sentence",\n' +
      '  "conclusion_cta": "Call to action"\n' +
      '}';
    
    const outlineResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: outlinePrompt }] }],
      }),
    });

    const outlineData = await outlineResponse.json();
    const outlineText = outlineData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    
    // Extract JSON from markdown code blocks if present
    let outline;
    try {
      const jsonMatch = outlineText.match(/```json\s*([\s\S]*?)\s*```/) || 
                       outlineText.match(/```\s*([\s\S]*?)\s*```/) ||
                       outlineText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        outline = JSON.parse(jsonStr);
      } else {
        outline = JSON.parse(outlineText);
      }
    } catch (parseError) {
      console.error('Failed to parse outline JSON:', outlineText);
      throw new Error(`Invalid outline JSON response: ${parseError instanceof Error ? parseError.message : 'Parse failed'}`);
    }
    
    await updateLog('Creating Outline', 5, outline);

    // Step 5: Write full content (use Pro if enabled)
    await updateLog('Writing Content', 6);
    const contentPrompt = `${siteContext}

${settings.content_prompt
  .replace('[WORD_COUNT]', settings.target_word_count.toString())
  .replace('[OUTLINE]', JSON.stringify(outline, null, 2))}

CRITICAL INSTRUCTIONS FOR THIS POST:
1. Write ${settings.target_word_count} words of engaging, informative content
2. Include ${writingContext?.linking_rules?.min_internal_links || 3}-${writingContext?.linking_rules?.max_internal_links || 8} natural internal links using EXACT URLs from the knowledge base above
3. Link to relevant service pages when discussing sauna types/installation
4. Link to health benefit pages when discussing wellness topics  
5. Include at least ONE link to /contact when suggesting consultation
6. Make links flow naturally - don't force them
7. Use descriptive anchor text that includes keywords

Write the complete blog post now with all internal links embedded naturally:`;
    
    const contentModel = settings.use_pro_for_content ? 'gemini-2.0-flash-thinking-exp' : 'gemini-2.0-flash-exp';
    
    const contentResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${contentModel}:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: contentPrompt }] }],
      }),
    });

    const contentData = await contentResponse.json();
    let content = contentData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    const wordCount = content.split(/\s+/).length;
    
    // Validate internal links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const foundLinks = [...content.matchAll(linkRegex)];
    const internalLinks = foundLinks.filter(([, , url]) => url.startsWith('/'));
    
    console.log(`📊 Link validation: Found ${internalLinks.length} internal links`);
    
    // Check each internal link exists
    const validLinks: string[] = [];
    const invalidLinks: string[] = [];
    
    for (const [fullMatch, text, url] of internalLinks) {
      const exists = contentKnowledge?.find(c => c.url === url);
      if (exists) {
        validLinks.push(url);
      } else {
        invalidLinks.push(url);
        console.warn(`⚠️  Invalid internal link: ${url} (${text})`);
      }
    }
    
    const minLinks = writingContext?.linking_rules?.min_internal_links || 3;
    if (validLinks.length < minLinks) {
      console.warn(`⚠️  Only ${validLinks.length} valid internal links (minimum: ${minLinks})`);
    }
    
    // Check for required /contact link
    const hasContactLink = validLinks.some(url => url === '/contact');
    if (!hasContactLink && writingContext?.linking_rules?.always_include_contact) {
      console.warn('⚠️  Missing required link to /contact');
    }
    
    await updateLog('Writing Content', 6, { 
      wordCount, 
      internalLinks: validLinks.length,
      invalidLinks: invalidLinks.length 
    });

    // Step 6: Fact check (use Pro if enabled)
    await updateLog('Fact Checking', 7);
    const factCheckPrompt = settings.fact_check_prompt.replace('[CONTENT]', content);
    const factCheckModel = settings.use_pro_for_fact_check ? 'gemini-2.0-flash-thinking-exp' : 'gemini-2.0-flash-exp';
    
    const factCheckResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${factCheckModel}:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: factCheckPrompt }] }],
      }),
    });

    const factCheckData = await factCheckResponse.json();
    const factCheckResult = factCheckData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    await updateLog('Fact Checking', 7, { summary: factCheckResult.substring(0, 500) });

    // Step 7: Edit for clarity
    await updateLog('Editing for Clarity', 8);
    const clarityPrompt = settings.clarity_edit_prompt.replace('[CONTENT]', content);
    
    const clarityResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: clarityPrompt }] }],
      }),
    });

    const clarityData = await clarityResponse.json();
    content = clarityData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    await updateLog('Editing for Clarity', 8);

    // Step 8: Get image suggestions
    await updateLog('Planning Images', 9);
    const imagePrompt = settings.image_suggestions_prompt.replace('[CONTENT]', content);
    
    const imageSuggestionsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: imagePrompt }] }],
      }),
    });

    const imageSuggestionsData = await imageSuggestionsResponse.json();
    const imageSuggestionsText = imageSuggestionsData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    
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
          const imageGenResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${geminiApiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              instances: [{
                prompt: imagePromptText
              }],
              parameters: {
                sampleCount: 1,
                aspectRatio: "16:9"
              }
            }),
          });

          const imageGenData = await imageGenResponse.json();
          const imageUrl = imageGenData.predictions?.[0]?.bytesBase64Encoded ? 
            `data:image/png;base64,${imageGenData.predictions[0].bytesBase64Encoded}` : null;
          
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
      .replace('[CONTENT_PREVIEW]', content.substring(0, 500)) +
      '\n\nIMPORTANT: Return ONLY a valid JSON object, no markdown formatting:\n' +
      '{\n' +
      '  "seo_title": "SEO title",\n' +
      '  "seo_description": "Meta description",\n' +
      '  "seo_keywords": "keyword1, keyword2",\n' +
      '  "excerpt": "Brief excerpt",\n' +
      '  "tags": ["tag1", "tag2"]\n' +
      '}';

    const seoResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: seoPrompt }] }],
      }),
    });

    const seoData = await seoResponse.json();
    const seoText = seoData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    
    // Extract JSON from markdown code blocks if present
    let seo;
    try {
      const jsonMatch = seoText.match(/```json\s*([\s\S]*?)\s*```/) || 
                       seoText.match(/```\s*([\s\S]*?)\s*```/) ||
                       seoText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        seo = JSON.parse(jsonStr);
      } else {
        seo = JSON.parse(seoText);
      }
    } catch (parseError) {
      console.error('Failed to parse SEO JSON:', seoText);
      throw new Error(`Invalid SEO JSON response: ${parseError instanceof Error ? parseError.message : 'Parse failed'}`);
    }

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
