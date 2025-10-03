import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsSource {
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse incoming request for optional count
    let requestedCount = 10;
    try {
      const body = await req.json();
      if (typeof body?.count === 'number' && body.count > 0 && body.count <= 20) {
        requestedCount = body.count;
      }
    } catch (_) {
      // No body provided or invalid JSON
    }

    console.log(`Starting daily news blog generation (count=${requestedCount})...`);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is required');
    }

    console.log('Using Lovable AI (Gemini 2.5 Flash)');

    // Start background processing
    const processingPromise = (async () => {
    // Parse incoming request for optional count
    let requestedCount = 10;
    try {
      const body = await req.json();
      if (typeof body?.count === 'number' && body.count > 0 && body.count <= 20) {
        requestedCount = body.count;
      }
    } catch (_) {
      // No body provided or invalid JSON
    }

    console.log(`Starting daily news blog generation (count=${requestedCount})...`);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY'); // legacy, not used directly
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!LOVABLE_API_KEY && !OPENROUTER_API_KEY) {
      throw new Error('No AI access configured. Lovable AI is required or provide OPENROUTER_API_KEY.');
    }

    // Prefer Lovable AI (Gemini 2.5 Flash). Fallback to OpenRouter if provided.
    const useGemini = !!LOVABLE_API_KEY; 
    const useOpenRouter = !useGemini && !!OPENROUTER_API_KEY;
    
    console.log(`Using AI provider: ${useGemini ? 'Lovable Gemini' : 'OpenRouter'}`);

    // Track the model actually used for logging
    let lastModelUsed = '';

    // Helper function for Gemini API via Lovable AI Gateway
    async function callGemini(prompt: string, maxTokens = 3000) {
      const response = await fetch(
        'https://ai.gateway.lovable.dev/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: 'You are a helpful AI assistant for news blog generation. ALWAYS return valid, complete JSON. Never truncate responses.' },
              { role: 'user', content: prompt }
            ],
            max_tokens: maxTokens,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429) {
          throw new Error('429: Rate limits exceeded by Lovable AI');
        }
        if (response.status === 402) {
          throw new Error('402: Payment required for Lovable AI');
        }
        throw new Error(`Lovable AI error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    }

    // Helper function to generate images using Nano banana
    async function generateBlogImage(title: string, excerpt: string, category: string) {
      try {
        const imagePrompt = `Create a professional, modern blog header image for an article about: "${title}". 
Category: ${category}
Context: ${excerpt}

Style: Clean, tech-focused, professional, high-quality. Use vibrant colors and modern design elements. Make it visually appealing for a tech blog about AI and automation.`;

        console.log(`Generating image for: ${title}`);
        
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
          }
        );

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

    // Get trending AI/automation topics
    console.log('Fetching trending AI topics...');
    const trendingPrompt = `List ${requestedCount} trending topics in AI/automation. Return ONLY this JSON array, nothing else:
[{"title":"Topic Title","category":"ai-machine-learning","keywords":["key1","key2","key3"]}]

Categories: ai-machine-learning, automation, n8n-workflows, quantum-computing, edge-ai, future-tech`;

    let trendingContent = await callGemini(trendingPrompt, 1500);
    
    let trendingTopics: NewsSource[];
    try {
      trendingContent = trendingContent.trim()
        .replace(/^```(?:json)?\s*\n?/i, '')
        .replace(/\n?```\s*$/i, '')
        .replace(/^[^[{]*/, '')
        .replace(/[^}\]]*$/, '');
      
      trendingTopics = JSON.parse(trendingContent);
      
      if (!Array.isArray(trendingTopics) || trendingTopics.length === 0) {
        throw new Error('No topics returned');
      }
    } catch (parseError) {
      console.error('Failed to parse trending topics. Raw response:', trendingContent);
      throw new Error(`AI returned invalid JSON: ${parseError.message}`);
    }

    console.log(`Found ${trendingTopics.length} trending topics`);

    // Get existing blog posts to check for duplicates
    console.log('Fetching existing blog posts for duplicate checking...');
    const { data: existingBlogs } = await supabaseClient
      .from('blog_posts')
      .select('title, slug, keywords, tags');

    const existingTitles = new Set(existingBlogs?.map(b => b.title.toLowerCase()) || []);
    const existingSlugs = new Set(existingBlogs?.map(b => b.slug.toLowerCase()) || []);
    const existingKeywords = new Set(
      existingBlogs?.flatMap(b => b.keywords || []).map(k => k.toLowerCase()) || []
    );

    // Filter out duplicate topics
    const uniqueTopics = trendingTopics.filter(topic => {
      const titleLower = topic.title.toLowerCase();
      const slugifiedTitle = titleLower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      // Check if title already exists
      if (existingTitles.has(titleLower)) {
        console.log(`⚠ Skipping duplicate title: ${topic.title}`);
        return false;
      }
      
      // Check if slug already exists
      if (existingSlugs.has(slugifiedTitle)) {
        console.log(`⚠ Skipping duplicate slug: ${slugifiedTitle}`);
        return false;
      }
      
      // Check if any keywords overlap significantly (3+ matching keywords = duplicate)
      const topicKeywords = topic.keywords.map(k => k.toLowerCase());
      const matchingKeywords = topicKeywords.filter(k => existingKeywords.has(k));
      if (matchingKeywords.length >= 3) {
        console.log(`⚠ Skipping similar topic (${matchingKeywords.length} matching keywords): ${topic.title}`);
        return false;
      }
      
      return true;
    });

    console.log(`After duplicate check: ${uniqueTopics.length} unique topics (filtered ${trendingTopics.length - uniqueTopics.length} duplicates)`);

    // If we filtered out too many, request more topics
    if (uniqueTopics.length < requestedCount / 2) {
      console.log('Too many duplicates found, requesting additional topics...');
      const additionalNeeded = requestedCount - uniqueTopics.length;
      const additionalPrompt = `List ${additionalNeeded} MORE trending topics in AI/automation. Return ONLY this JSON array, nothing else:
[{"title":"Topic Title","category":"ai-machine-learning","keywords":["key1","key2","key3"]}]

Categories: ai-machine-learning, automation, n8n-workflows, quantum-computing, edge-ai, future-tech

Avoid these topics: ${uniqueTopics.map(t => t.title).join(', ')}`;

      let additionalContent = await callGemini(additionalPrompt, 1500);
      
      try {
        additionalContent = additionalContent.trim()
          .replace(/^```(?:json)?\s*\n?/i, '')
          .replace(/\n?```\s*$/i, '')
          .replace(/^[^[{]*/, '')
          .replace(/[^}\]]*$/, '');
        
        const additionalTopics: NewsSource[] = JSON.parse(additionalContent);
        
        // Filter additional topics for duplicates too
        const filteredAdditional = additionalTopics.filter(topic => {
          const titleLower = topic.title.toLowerCase();
          const slugifiedTitle = titleLower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          return !existingTitles.has(titleLower) && !existingSlugs.has(slugifiedTitle);
        });
        
        uniqueTopics.push(...filteredAdditional);
        console.log(`Added ${filteredAdditional.length} additional unique topics`);
      } catch (parseError) {
        console.error('Failed to parse additional topics:', parseError);
      }
    }

    // Get category mappings
    const { data: categories } = await supabaseClient
      .from('categories')
      .select('*');

    const categoryMap = new Map(categories?.map(c => [c.slug, c]) || []);

    // Create initial run record
    const { data: runRecord, error: runError } = await supabaseClient
      .from('daily_blog_runs')
      .insert({
        run_date: new Date().toISOString(),
        blogs_created: 0,
        blogs_failed: 0,
        status: 'pending'
      })
      .select()
      .single();

    if (runError) {
      console.error('Failed to create run record:', runError);
    }

    const runId = runRecord?.id;

    // Generate blogs for each unique topic
    const results = {
      successful: 0,
      failed: 0,
      total: uniqueTopics.length,
      duplicatesSkipped: trendingTopics.length - uniqueTopics.length,
      errors: [] as string[],
      posts: [] as any[]
    };

    for (let i = 0; i < uniqueTopics.length; i++) {
      const topic = uniqueTopics[i];
      
      try {
        console.log(`Processing ${i + 1}/${uniqueTopics.length}: ${topic.title}`);

        const category = categoryMap.get(topic.category);
        if (!category) {
          console.error(`Invalid category: ${topic.category}`);
          results.errors.push(`Invalid category for: ${topic.title}`);
          results.failed++;
          continue;
        }

        // Generate blog content with explicit JSON-only instruction
        const blogPrompt = `Write a blog article about: "${topic.title}"
Category: ${category.name}
Keywords: ${topic.keywords.join(', ')}

Write approximately 800 words with proper ## markdown headings.

YOU MUST RETURN ONLY PURE JSON. NO MARKDOWN BLOCKS. NO EXTRA TEXT.
Start with { and end with }

Required JSON format:
{
  "title": "Engaging title under 60 characters",
  "slug": "url-friendly-slug",
  "excerpt": "Compelling summary under 150 characters",
  "content": "Full article in markdown with ## headings. Make it engaging and informative.",
  "metaTitle": "SEO title under 60 characters",
  "metaDescription": "SEO description under 150 characters",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "readingTime": 6
}`;

        let blogContent;
        let retryCount = 0;
        const maxRetries = 2;
        
        while (retryCount <= maxRetries) {
          try {
            blogContent = await callGemini(blogPrompt, 10000);
            break; // Success, exit retry loop
          } catch (error) {
            if (error.message?.includes('429') || error.message?.includes('rate limit')) {
              console.log('Rate limit hit, waiting 10 seconds...');
              await new Promise(resolve => setTimeout(resolve, 10000));
              results.errors.push(`Rate limited: ${topic.title}`);
              results.failed++;
              continue;
            }
            
            retryCount++;
            if (retryCount > maxRetries) {
              console.error(`AI error for ${topic.title} after ${maxRetries} retries:`, error);
              results.errors.push(`AI error: ${topic.title}`);
              results.failed++;
              break;
            }
            
            console.log(`Retry ${retryCount}/${maxRetries} for ${topic.title}`);
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
        
        if (retryCount > maxRetries) {
          continue; // Skip to next topic
        }

        let parsedBlog;
        try {
          let cleanBlog = blogContent.trim();
          
          // Step 1: Remove markdown code blocks
          cleanBlog = cleanBlog.replace(/```json\s*/gi, '').replace(/```\s*/gi, '');
          
          // Step 2: Find JSON boundaries
          const firstBrace = cleanBlog.indexOf('{');
          const lastBrace = cleanBlog.lastIndexOf('}');
          
          if (firstBrace === -1 || lastBrace === -1) {
            throw new Error('No JSON boundaries found');
          }
          
          cleanBlog = cleanBlog.substring(firstBrace, lastBrace + 1);
          
          // Step 3: Fix common JSON issues
          // Replace smart quotes with regular quotes
          cleanBlog = cleanBlog.replace(/[""]/g, '"').replace(/['']/g, "'");
          
          // Step 4: Parse JSON
          parsedBlog = JSON.parse(cleanBlog);
          
          // Step 5: Validate required fields
          const required = ['title', 'slug', 'excerpt', 'content', 'metaTitle', 'metaDescription', 'keywords', 'tags', 'readingTime'];
          for (const field of required) {
            if (!parsedBlog[field]) {
              throw new Error(`Missing required field: ${field}`);
            }
          }
          
          // Validate content length
          if (parsedBlog.content.length < 300) {
            throw new Error('Content too short');
          }
          
          console.log(`✓ Successfully parsed blog for: ${topic.title}`);
          
        } catch (parseError) {
          console.error(`❌ Parse failed for "${topic.title}"`);
          console.error('Error:', parseError.message);
          console.error('Response length:', blogContent.length);
          console.error('First 300 chars:', blogContent.substring(0, 300));
          console.error('Last 300 chars:', blogContent.substring(Math.max(0, blogContent.length - 300)));
          
          results.errors.push(`Parse error: ${topic.title}`);
          results.failed++;
          
          // Update run record with failure
          if (runId) {
            await supabaseClient
              .from('daily_blog_runs')
              .update({
                blogs_failed: results.failed,
                status: 'pending'
              })
              .eq('id', runId);
          }
          
          continue;
        }

        // Generate blog image with retry logic
        console.log(`Generating image for: ${parsedBlog.title}`);
        let featuredImageUrl = null;
        let imageRetries = 0;
        const maxImageRetries = 2;
        
        while (!featuredImageUrl && imageRetries <= maxImageRetries) {
          try {
            featuredImageUrl = await generateBlogImage(
              parsedBlog.title, 
              parsedBlog.excerpt, 
              category.name
            );
            
            if (!featuredImageUrl && imageRetries < maxImageRetries) {
              console.log(`⚠ Image generation attempt ${imageRetries + 1} failed, retrying...`);
              await new Promise(resolve => setTimeout(resolve, 3000));
              imageRetries++;
            } else if (featuredImageUrl) {
              console.log(`✓ Image generated successfully for: ${parsedBlog.title}`);
            }
          } catch (imgError) {
            console.error(`Image generation error (attempt ${imageRetries + 1}):`, imgError);
            if (imageRetries < maxImageRetries) {
              await new Promise(resolve => setTimeout(resolve, 3000));
              imageRetries++;
            } else {
              console.log(`⚠ All image generation attempts failed for: ${parsedBlog.title}, continuing without image`);
            }
          }
        }

        // Insert blog post as PUBLISHED immediately with generated image
        const { data: newPost, error: insertError } = await supabaseClient
          .from('blog_posts')
          .insert({
            title: parsedBlog.title,
            slug: parsedBlog.slug,
            excerpt: parsedBlog.excerpt,
            content: parsedBlog.content,
            category_id: category.id,
            meta_title: parsedBlog.metaTitle,
            meta_description: parsedBlog.metaDescription,
            keywords: parsedBlog.keywords,
            tags: parsedBlog.tags,
            reading_time: parsedBlog.readingTime,
            status: 'published',
            published_at: new Date().toISOString(),
            is_premium: false,
            featured_image_url: featuredImageUrl
          })
          .select()
          .single();

        if (insertError) {
          console.error('Insert error:', insertError);
          results.errors.push(`Save error for: ${topic.title}`);
          results.failed++;
          continue;
        }

        // Log generation
        await supabaseClient
          .from('ai_generation_logs')
          .insert({
            blog_post_id: newPost.id,
            prompt: topic.title,
            model_used: 'google/gemini-2.5-flash',
            tokens_used: 0,
            status: 'success'
          });

        results.successful++;
        results.posts.push({
          id: newPost.id,
          title: parsedBlog.title,
          category: category.name
        });

        console.log(`✓ Published: ${parsedBlog.title}`);

        // Update run record after each successful blog
        if (runId) {
          await supabaseClient
            .from('daily_blog_runs')
            .update({
              blogs_created: results.successful,
              blogs_failed: results.failed,
              status: 'pending'
            })
            .eq('id', runId);
        }

        // Shorter delay between blogs
        if (i < uniqueTopics.length - 1) {
          console.log('Waiting 3 seconds before next blog...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }

      } catch (error) {
        console.error(`Error processing ${topic.title}:`, error);
        results.errors.push(`${topic.title}: ${error.message}`);
        results.failed++;
        
        // Update run record after each failure
        if (runId) {
          await supabaseClient
            .from('daily_blog_runs')
            .update({
              blogs_created: results.successful,
              blogs_failed: results.failed,
              status: 'pending'
            })
            .eq('id', runId);
        }
      }
    }

    // Final update to run record
    if (runId) {
      await supabaseClient
        .from('daily_blog_runs')
        .update({
          blogs_created: results.successful,
          blogs_failed: results.failed,
          status: results.failed > 0 ? 'partial' : 'success',
          error_message: results.errors.length > 0 ? results.errors.join('; ') : null
        })
        .eq('id', runId);
    }

    console.log(`Generation complete: ${results.successful} published, ${results.failed} failed, ${results.duplicatesSkipped} duplicates skipped`);
    
    return results;
    })();

    // Use EdgeRuntime.waitUntil to keep function alive
    // @ts-ignore
    if (typeof EdgeRuntime !== 'undefined' && EdgeRuntime.waitUntil) {
      // @ts-ignore
      EdgeRuntime.waitUntil(processingPromise);
    }

    // Return immediately with processing status
    return new Response(JSON.stringify({
      success: true,
      message: `Started generating ${requestedCount} blog posts. Each will be published immediately after generation.`,
      processing: true,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in generate-daily-news-blogs:', error);
    return new Response(JSON.stringify({
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
