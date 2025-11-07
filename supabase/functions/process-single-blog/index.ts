import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Content validation function
function validateBlogContent(blogContent: any): { isValid: boolean; errors: string[]; warnings: string[]; score: number } {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Word count validation (700-1000 words target)
  const wordCount = blogContent.content?.split(/\s+/).length || 0;
  if (wordCount < 500) {
    errors.push(`Content too short: ${wordCount} words (minimum 500)`);
    score -= 30;
  } else if (wordCount < 700) {
    warnings.push(`Content below target: ${wordCount} words (target 700-1000)`);
    score -= 10;
  } else if (wordCount > 1200) {
    warnings.push(`Content too long: ${wordCount} words (target 700-1000)`);
    score -= 5;
  }

  // Title validation (50-60 chars optimal)
  const titleLength = blogContent.title?.length || 0;
  if (titleLength < 30) {
    warnings.push(`Title too short: ${titleLength} chars (optimal 50-60)`);
    score -= 5;
  } else if (titleLength > 70) {
    warnings.push(`Title too long: ${titleLength} chars (optimal 50-60)`);
    score -= 5;
  }

  // Meta description validation (150-160 chars optimal)
  const metaLength = blogContent.meta_description?.length || 0;
  if (metaLength < 120) {
    warnings.push(`Meta description too short: ${metaLength} chars (optimal 150-160)`);
    score -= 5;
  } else if (metaLength > 170) {
    warnings.push(`Meta description too long: ${metaLength} chars (optimal 150-160)`);
    score -= 5;
  }

  // Required fields validation
  if (!blogContent.title) {
    errors.push('Missing title');
    score -= 20;
  }
  if (!blogContent.content) {
    errors.push('Missing content');
    score -= 30;
  }
  if (!blogContent.excerpt) {
    warnings.push('Missing excerpt');
    score -= 5;
  }

  // SEO keywords validation
  if (!blogContent.keywords || blogContent.keywords.length < 3) {
    warnings.push('Insufficient keywords (minimum 3 recommended)');
    score -= 5;
  }

  const isValid = errors.length === 0 && score >= 60;
  
  return { isValid, errors, warnings, score };
}

// Image generation with retry logic
async function generateImageWithRetry(prompt: string, apiKey: string, maxAttempts = 3): Promise<string | null> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`🎨 Image generation attempt ${attempt}/${maxAttempts}`);
      
      const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size: '1024x1024',
          quality: 'standard',
          response_format: 'b64_json'
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        console.log(`✅ Image generated successfully on attempt ${attempt}`);
        return `data:image/png;base64,${imageData.data[0].b64_json}`;
      }

      const errorText = await imageResponse.text();
      console.error(`❌ Image generation failed (attempt ${attempt}):`, errorText);

      // If not the last attempt, wait with exponential backoff
      if (attempt < maxAttempts) {
        const delayMs = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`⏳ Waiting ${delayMs}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`❌ Image generation error (attempt ${attempt}):`, error);
      
      if (attempt < maxAttempts) {
        const delayMs = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  console.log('⚠️ All image generation attempts failed, will use fallback');
  return null;
}

// Get default image based on category
function getDefaultImageUrl(category: string): string {
  const categoryImages: Record<string, string> = {
    'technology': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop',
    'automation': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop',
    'business': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop',
    'ai': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&auto=format&fit=crop'
  };
  
  return categoryImages[category.toLowerCase()] || categoryImages['default'];
}

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

Keep content concise and focused. Quality over quantity.

Return a JSON object with these fields:
{
  "title": "Blog post title (60 chars max)",
  "content": "Full blog content in Markdown format",
  "excerpt": "Brief summary (150 chars max)",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "meta_description": "SEO meta description (160 chars max)",
  "tags": ["tag1", "tag2", "tag3"]
}`;

      const contentResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an expert technical writer who creates concise, high-quality blog content.' },
            { role: 'user', content: blogPrompt }
          ],
          max_completion_tokens: 1500, // ~1000 words max
          response_format: { type: "json_object" },
          temperature: 0.7
        }),
      });

      if (!contentResponse.ok) {
        const errorText = await contentResponse.text();
        throw new Error(`OpenAI API error: ${contentResponse.status} - ${errorText}`);
      }

      const contentData = await contentResponse.json();
      const message = contentData.choices[0]?.message;
      
      if (!message?.content) {
        console.error('OpenAI response:', JSON.stringify(contentData, null, 2));
        throw new Error('Invalid response from OpenAI - no content in message');
      }

      const blogContent = JSON.parse(message.content);

      // Validate blog content
      console.log('📋 Validating blog content...');
      const validation = validateBlogContent(blogContent);
      console.log(`✅ Validation score: ${validation.score}/100`);
      
      if (validation.errors.length > 0) {
        console.error('❌ Validation errors:', validation.errors);
      }
      if (validation.warnings.length > 0) {
        console.warn('⚠️ Validation warnings:', validation.warnings);
      }

      if (!validation.isValid) {
        throw new Error(`Content validation failed (score: ${validation.score}): ${validation.errors.join(', ')}`);
      }

      // Generate blog image with retry logic
      console.log('🎨 Generating featured image...');
      const imagePrompt = `Professional blog header image: ${blogContent.title}. Style: Modern tech illustration, ${topic.category} theme, professional and clean, 16:9 aspect ratio, ultra high resolution.`;
      
      let featuredImageUrl = await generateImageWithRetry(imagePrompt, openAIApiKey, 3);
      
      // Fallback to default category image if generation failed
      if (!featuredImageUrl) {
        console.log('📷 Using default category image');
        featuredImageUrl = getDefaultImageUrl(topic.category || 'default');
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

      // Update run stats - increment created count
      const { data: run } = await supabase
        .from('daily_blog_runs')
        .select('blogs_created')
        .eq('id', queueItem.run_id)
        .single();
      
      if (run) {
        await supabase
          .from('daily_blog_runs')
          .update({ blogs_created: (run.blogs_created || 0) + 1 })
          .eq('id', queueItem.run_id);
      }

      const duration = Date.now() - startTime;
      const wordCount = blogContent.content.split(/\s+/).length;
      console.log(`✅ Blog created in ${duration}ms: ${blogContent.title} (${wordCount} words, quality: ${validation.score}/100)`);

      return new Response(
        JSON.stringify({
          success: true,
          blogPost,
          duration,
          validation: {
            score: validation.score,
            warnings: validation.warnings,
            wordCount: blogContent.content.split(/\s+/).length
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (error: any) {
      console.error('Blog generation error:', error);
      
      // Update queue item with error
      await supabase
        .from('blog_generation_queue')
        .update({
          status: queueItem.attempts + 1 < queueItem.max_attempts ? 'pending' : 'failed',
          error_message: error.message,
          attempts: queueItem.attempts + 1,
          completed_at: queueItem.attempts + 1 >= queueItem.max_attempts ? new Date().toISOString() : null
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
