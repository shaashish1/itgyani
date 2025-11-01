import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { queueItemId } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!supabaseUrl || !supabaseServiceKey || !openAIApiKey) {
      throw new Error('Missing required configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get queue item
    const { data: queueItem, error: queueError } = await supabase
      .from('blog_generation_queue')
      .select('*')
      .eq('id', queueItemId)
      .single();

    if (queueError || !queueItem) {
      throw new Error('Queue item not found');
    }

    // Mark as processing
    await supabase
      .from('blog_generation_queue')
      .update({
        status: 'processing',
        started_at: new Date().toISOString()
      })
      .eq('id', queueItemId);

    const topic = queueItem.topic;
    const startTime = Date.now();

    try {
      // Generate blog content (700-1000 words)
      const blogPrompt = `Write a comprehensive blog post about: ${topic.title}

Category: ${topic.category}
Keywords: ${topic.keywords?.join(', ')}

Requirements:
- **Word Count: 700-1000 words** (this is CRITICAL - do not exceed 1000 words)
- Write in a professional, engaging tone
- Include practical insights and examples
- Structure with clear headings (H2, H3)
- SEO-optimized with natural keyword usage
- Include a strong conclusion with call-to-action
- Format in Markdown

Keep content concise and focused. Quality over quantity.`;

      const contentResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            { role: 'system', content: 'You are an expert technical writer who creates concise, high-quality blog content.' },
            { role: 'user', content: blogPrompt }
          ],
          max_completion_tokens: 1500, // ~1000 words max
          tools: [{
            type: "function",
            function: {
              name: "generate_blog",
              description: "Generate a structured blog post",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                  excerpt: { type: "string" },
                  keywords: { type: "array", items: { type: "string" } },
                  meta_description: { type: "string" },
                  tags: { type: "array", items: { type: "string" } }
                },
                required: ["title", "content", "excerpt", "keywords", "meta_description"]
              }
            }
          }],
          tool_choice: { type: "function", function: { name: "generate_blog" }}
        }),
      });

      if (!contentResponse.ok) {
        const errorText = await contentResponse.text();
        throw new Error(`OpenAI API error: ${contentResponse.status} - ${errorText}`);
      }

      const contentData = await contentResponse.json();
      const toolCall = contentData.choices[0]?.message?.tool_calls?.[0];
      if (!toolCall?.function?.arguments) {
        throw new Error('Invalid response from OpenAI');
      }

      const blogContent = JSON.parse(toolCall.function.arguments);

      // Generate blog image
      let featuredImageUrl = null;
      try {
        const imagePrompt = `Professional blog header image: ${blogContent.title}. Style: Modern tech illustration, ${topic.category} theme, professional and clean, 16:9 aspect ratio, ultra high resolution.`;
        
        const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-image-1',
            prompt: imagePrompt,
            n: 1,
            size: '1024x1024',
            quality: 'high',
            output_format: 'png'
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          featuredImageUrl = `data:image/png;base64,${imageData.data[0].b64_json}`;
        }
      } catch (imageError) {
        console.error('Image generation failed:', imageError);
        // Continue without image
      }

      // Get category ID
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name')
        .ilike('name', `%${topic.category}%`)
        .limit(1);

      const categoryId = categories?.[0]?.id || null;

      // Create blog post
      const slug = blogContent.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const { data: blogPost, error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          title: blogContent.title,
          slug,
          content: blogContent.content,
          excerpt: blogContent.excerpt,
          category_id: categoryId,
          keywords: blogContent.keywords || topic.keywords,
          meta_title: blogContent.title.substring(0, 60),
          meta_description: blogContent.meta_description?.substring(0, 160),
          tags: blogContent.tags || [],
          reading_time: Math.ceil(blogContent.content.split(' ').length / 200),
          featured_image_url: featuredImageUrl,
          status: 'published',
          published_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Mark queue item as completed
      await supabase
        .from('blog_generation_queue')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', queueItemId);

      // Update run stats
      await supabase.rpc('increment', {
        row_id: queueItem.run_id,
        x: 1
      });

      const duration = Date.now() - startTime;
      console.log(`✅ Blog created in ${duration}ms: ${blogContent.title}`);

      return new Response(
        JSON.stringify({
          success: true,
          blogPost,
          duration
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (error: any) {
      console.error('Blog generation error:', error);
      
      // Update queue item with error
      await supabase
        .from('blog_generation_queue')
        .update({
          status: 'failed',
          error_message: error.message,
          attempts: queueItem.attempts + 1,
          completed_at: new Date().toISOString()
        })
        .eq('id', queueItemId);

      // If we haven't exceeded max attempts, it can be retried
      if (queueItem.attempts + 1 < queueItem.max_attempts) {
        console.log(`Will retry (attempt ${queueItem.attempts + 2}/${queueItem.max_attempts})`);
      }

      throw error;
    }

  } catch (error: any) {
    console.error('Error in process-single-blog:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
