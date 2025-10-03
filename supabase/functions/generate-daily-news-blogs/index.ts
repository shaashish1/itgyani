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
    async function callGemini(prompt: string, maxTokens = 2000) {
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY is not configured');
      }
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
              { role: 'system', content: 'You are a helpful AI assistant for news blog generation. Keep answers concise and return JSON only when asked.' },
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
      lastModelUsed = 'google/gemini-2.5-flash';
      return data.choices?.[0]?.message?.content || '';
    }

    // Helper function for OpenRouter API
    async function callOpenRouter(prompt: string, maxTokens = 2000) {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://itgyani.com',
            'X-Title': 'IT Gyani Blog Generator'
          },
          body: JSON.stringify({
            model: 'anthropic/claude-3.5-sonnet',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxTokens
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content;
    }

    // AI call wrapper with fallback
    async function callAI(prompt: string, maxTokens = 2000, attemptFallback = true): Promise<string> {
      try {
        if (useGemini) {
          return await callGemini(prompt, maxTokens);
        } else {
          return await callOpenRouter(prompt, maxTokens);
        }
      } catch (error) {
        console.error(`Primary AI provider failed:`, error);
        
        // Try fallback if available and not already attempted
        if (attemptFallback && GEMINI_API_KEY && OPENROUTER_API_KEY) {
          console.log('Attempting fallback to alternate provider...');
          try {
            if (useGemini) {
              return await callOpenRouter(prompt, maxTokens);
            } else {
              return await callGemini(prompt, maxTokens);
            }
          } catch (fallbackError) {
            console.error('Fallback provider also failed:', fallbackError);
            throw new Error('All AI providers failed');
          }
        }
        
        throw error;
      }
    }

    // Get trending AI/automation topics
    console.log('Fetching trending AI topics...');
    const trendingPrompt = `List ${requestedCount} trending topics in AI/automation. Return ONLY this JSON array, nothing else:
[{"title":"Topic Title","category":"ai-machine-learning","keywords":["key1","key2","key3"]}]

Categories: ai-machine-learning, automation, n8n-workflows, quantum-computing, edge-ai, future-tech`;

    let trendingContent = await callAI(trendingPrompt, 1500);
    
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

    // Get category mappings
    const { data: categories } = await supabaseClient
      .from('categories')
      .select('*');

    const categoryMap = new Map(categories?.map(c => [c.slug, c]) || []);

    // Generate blogs for each topic
    const results = {
      successful: 0,
      failed: 0,
      total: trendingTopics.length,
      errors: [] as string[],
      posts: [] as any[]
    };

    for (let i = 0; i < trendingTopics.length; i++) {
      const topic = trendingTopics[i];
      
      try {
        console.log(`Processing ${i + 1}/${trendingTopics.length}: ${topic.title}`);

        const category = categoryMap.get(topic.category);
        if (!category) {
          console.error(`Invalid category: ${topic.category}`);
          results.errors.push(`Invalid category for: ${topic.title}`);
          results.failed++;
          continue;
        }

        // Generate blog content
        const blogPrompt = `Write a 1500-word blog about: "${topic.title}"
Category: ${category.name} | Keywords: ${topic.keywords.join(', ')}

Return ONLY this JSON, no extra text:
{"title":"Title (max 60 chars)","slug":"url-slug","excerpt":"Summary (150 chars)","content":"Full markdown with ## headings","metaTitle":"SEO title","metaDescription":"SEO desc (150 chars)","keywords":["kw1","kw2","kw3","kw4","kw5"],"tags":["tag1","tag2","tag3","tag4"],"readingTime":10}`;

        let blogContent;
        try {
          blogContent = await callAI(blogPrompt, 4000);
        } catch (error) {
          if (error.message?.includes('429') || error.message?.includes('rate limit')) {
            console.log('Rate limit hit, waiting 15 seconds...');
            await new Promise(resolve => setTimeout(resolve, 15000));
            results.errors.push(`Rate limited: ${topic.title}`);
            results.failed++;
            continue;
          }
          console.error(`AI error for ${topic.title}:`, error);
          results.errors.push(`AI error: ${topic.title}`);
          results.failed++;
          continue;
        }

        let parsedBlog;
        try {
          let cleanBlog = blogContent.trim()
            .replace(/^```(?:json)?\s*\n?/i, '')
            .replace(/\n?```\s*$/i, '')
            .replace(/^[^{]*/, '')
            .replace(/[^}]*$/, '');
          
          parsedBlog = JSON.parse(cleanBlog);
          
          if (!parsedBlog.title || !parsedBlog.content) {
            throw new Error('Missing required fields');
          }
        } catch (parseError) {
          console.error(`Parse error for "${topic.title}". Raw response:`, blogContent.substring(0, 500));
          results.errors.push(`Parse error: ${topic.title}`);
          results.failed++;
          continue;
        }

        // Insert blog post as draft
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
            status: 'draft',
            published_at: null,
            is_premium: false
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
            model_used: useGemini ? 'gemini-1.5-flash-latest' : 'anthropic/claude-3.5-sonnet',
            tokens_used: 0, // Token counting would require parsing from response
            status: 'success'
          });

        results.successful++;
        results.posts.push({
          id: newPost.id,
          title: parsedBlog.title,
          category: category.name
        });

        console.log(`✓ Created as draft: ${parsedBlog.title}`);

        // Delay between blogs to avoid rate limits
        if (i < trendingTopics.length - 1) {
          console.log('Waiting 5 seconds before next blog...');
          await new Promise(resolve => setTimeout(resolve, 5000));
        }

      } catch (error) {
        console.error(`Error processing ${topic.title}:`, error);
        results.errors.push(`${topic.title}: ${error.message}`);
        results.failed++;
      }
    }

    const summary = `Daily news blog generation complete: ${results.successful} created as drafts, ${results.failed} failed`;
    console.log(summary);

    return new Response(JSON.stringify({
      success: true,
      message: summary,
      results,
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
