import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ImageMetadata {
  title: string;
  alt_text: string;
  description: string;
  seo_keywords: string;
  seo_title: string;
  seo_description: string;
  suggested_category: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'imageBase64 is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Calling Lovable AI for image analysis...');

    // Call Lovable AI with vision capabilities
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in SEO and image analysis. Analyze images and generate comprehensive, SEO-optimized metadata for sauna and wellness-related images. Focus on details like sauna type, materials, location context, and features visible in the image.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this sauna/wellness image and provide SEO-optimized metadata. Return ONLY a JSON object with these exact fields: title (compelling, under 60 chars), alt_text (descriptive, accessibility-focused, under 125 chars), description (detailed, 2-3 sentences), seo_keywords (comma-separated, 5-8 relevant keywords), seo_title (SEO-optimized with location if visible, under 60 chars), seo_description (marketing-focused, under 160 chars), suggested_category (one of: residential, commercial, outdoor, infrared, traditional, steam). Respond ONLY with valid JSON, no other text.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'generate_image_metadata',
              description: 'Generate SEO-optimized metadata for sauna/wellness images',
              parameters: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Compelling title under 60 characters'
                  },
                  alt_text: {
                    type: 'string',
                    description: 'Descriptive alt text for accessibility, under 125 characters'
                  },
                  description: {
                    type: 'string',
                    description: 'Detailed description, 2-3 sentences'
                  },
                  seo_keywords: {
                    type: 'string',
                    description: 'Comma-separated keywords, 5-8 relevant terms'
                  },
                  seo_title: {
                    type: 'string',
                    description: 'SEO-optimized title with location if visible, under 60 characters'
                  },
                  seo_description: {
                    type: 'string',
                    description: 'Marketing-focused meta description, under 160 characters'
                  },
                  suggested_category: {
                    type: 'string',
                    enum: ['residential', 'commercial', 'outdoor', 'infrared', 'traditional', 'steam'],
                    description: 'Best fitting category for the image'
                  }
                },
                required: ['title', 'alt_text', 'description', 'seo_keywords', 'seo_title', 'seo_description', 'suggested_category'],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'generate_image_metadata' } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response:', JSON.stringify(data));

    // Extract metadata from tool call
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== 'generate_image_metadata') {
      throw new Error('Invalid AI response format');
    }

    const metadata: ImageMetadata = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({ metadata }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating metadata:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to generate metadata'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
