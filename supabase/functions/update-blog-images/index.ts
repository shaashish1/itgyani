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
    console.log('Starting blog image update process...');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is required');
    }

    // Helper function to generate images using Nano banana
    async function generateBlogImage(title: string, excerpt: string, category: string) {
      try {
        const imagePrompt = `Create a professional, modern blog header image for an article about: "${title}". 
Category: ${category}
Context: ${excerpt}

Style: Clean, tech-focused, professional, high-quality. Use vibrant colors and modern design elements. Make it visually appealing for a tech blog about AI and automation.`;

        console.log(`Generating image for: ${title}`);
        
        // Set timeout for image generation (30 seconds)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(
          'https://ai.gateway.lovable.dev/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${LOVABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash-image-preview',
              messages: [
                {
                  role: 'user',
                  content: imagePrompt
                }
              ],
              modalities: ['image', 'text']
            }),
            signal: controller.signal
          }
        );
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Image generation failed: ${response.status} - ${errorText}`);
          return null;
        }

        const data = await response.json();
        const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        
        if (imageUrl) {
          console.log(`✓ Image generated successfully for: ${title}`);
          return imageUrl;
        }
        
        console.error('No image URL in response');
        return null;
      } catch (error) {
        console.error(`Image generation error for ${title}:`, error);
        return null;
      }
    }

    // Get blogs without images (limit to 10 per batch to avoid timeout)
    const BATCH_SIZE = 10;
    const { data: blogsWithoutImages, error: fetchError } = await supabaseClient
      .from('blog_posts')
      .select('id, title, excerpt, category_id, categories(name)')
      .is('featured_image_url', null)
      .limit(BATCH_SIZE);

    if (fetchError) {
      throw new Error(`Failed to fetch blogs: ${fetchError.message}`);
    }

    if (!blogsWithoutImages || blogsWithoutImages.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        message: 'All blogs already have images',
        updated: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`Found ${blogsWithoutImages.length} blogs without images (processing batch of ${BATCH_SIZE})`);

    const results = {
      successful: 0,
      failed: 0,
      total: blogsWithoutImages.length,
      errors: [] as string[]
    };

    // Update each blog with a generated image
    for (const blog of blogsWithoutImages) {
      try {
        const categoryName = (blog.categories as any)?.name || 'Technology';
        
        // Generate image
        const imageUrl = await generateBlogImage(
          blog.title,
          blog.excerpt || '',
          categoryName
        );

        if (imageUrl) {
          // Update blog post with image
          const { error: updateError } = await supabaseClient
            .from('blog_posts')
            .update({ featured_image_url: imageUrl })
            .eq('id', blog.id);

          if (updateError) {
            console.error(`Failed to update blog ${blog.id}:`, updateError);
            results.failed++;
            results.errors.push(`Update failed: ${blog.title}`);
          } else {
            console.log(`✓ Updated ${blog.title} with image`);
            results.successful++;
          }
        } else {
          console.log(`⚠ Image generation failed for: ${blog.title}`);
          results.failed++;
          results.errors.push(`Image generation failed: ${blog.title}`);
        }

        // Add delay between generations to avoid rate limits (8 seconds like blog generation)
        if (blog.id !== blogsWithoutImages[blogsWithoutImages.length - 1].id) {
          await new Promise(resolve => setTimeout(resolve, 8000));
        }

      } catch (error) {
        console.error(`Error processing ${blog.title}:`, error);
        results.failed++;
        results.errors.push(`${blog.title}: ${error.message}`);
      }
    }

    console.log(`Update complete: ${results.successful} updated, ${results.failed} failed`);

    return new Response(JSON.stringify({
      success: true,
      message: `Updated ${results.successful} of ${results.total} blogs`,
      results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in update-blog-images:', error);
    return new Response(JSON.stringify({
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
