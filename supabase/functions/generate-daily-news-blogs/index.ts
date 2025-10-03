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
    console.log('Starting daily news blog generation...');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!GEMINI_API_KEY && !OPENROUTER_API_KEY) {
      throw new Error('No AI API keys configured. Please add either GEMINI_API_KEY or OPENROUTER_API_KEY.');
    }

    const useGemini = !!GEMINI_API_KEY;
    const useOpenRouter = !useGemini && !!OPENROUTER_API_KEY;
    
    console.log(`Using AI provider: ${useGemini ? 'Gemini' : 'OpenRouter'}`);

    // Helper function for Gemini API
    async function callGemini(prompt: string, maxTokens = 2000) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: maxTokens,
            }
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
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

    // Get trending AI/automation topics using Gemini API
    console.log('Fetching trending AI topics...');
    const trendingPrompt = `You are a tech news analyst. List 10 trending and newsworthy topics in AI, automation, and future technology from the past 24-48 hours. For each topic:

1. Provide a compelling blog title
2. Assign to one of these categories: ai-machine-learning, automation, n8n-workflows, quantum-computing, edge-ai, future-tech
3. Suggest 3-5 relevant SEO keywords

Return ONLY valid JSON array in this format:
[
  {
    "title": "Breaking: [Trending Topic Title]",
    "category": "category-slug",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  }
]

Focus on:
- Latest AI model releases and updates
- Automation breakthroughs and tools
- Industry adoption news
- Emerging tech trends
- Practical use cases gaining traction

Make titles engaging and newsworthy. Ensure variety across categories.`;

    const trendingContent = await callAI(
      `You are a tech news analyst focused on AI and automation trends. Always return valid JSON only.\n\n${trendingPrompt}`,
      2000
    );
    
    let trendingTopics: NewsSource[];
    try {
      // Clean up response
      let cleanContent = trendingContent.trim();
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```(?:json)?\s*\n/, '').replace(/\n```\s*$/, '');
      }
      trendingTopics = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse trending topics:', trendingContent);
      throw new Error('AI returned invalid JSON for trending topics');
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

        // Generate comprehensive blog content
        const blogPrompt = `Write a comprehensive, news-focused blog post about: "${topic.title}"

Category: ${category.name}
Keywords: ${topic.keywords.join(', ')}

This is a NEWS article about a TRENDING topic. Requirements:
1. Start with current news/announcement context
2. Explain why this matters NOW
3. Include latest developments and updates
4. Provide expert analysis and insights
5. Discuss practical implications
6. Add actionable takeaways
7. Professional, informative tone
8. 1500-2000 words
9. Use markdown formatting with clear H2/H3 headings
10. Optimize for SEO

Return ONLY valid JSON:
{
  "title": "SEO-optimized title (max 60 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Compelling summary (150-160 chars)",
  "content": "Full markdown content",
  "metaTitle": "SEO meta title",
  "metaDescription": "SEO meta description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "readingTime": estimated_minutes
}`;

        let blogContent;
        try {
          blogContent = await callAI(
            `You are an expert tech journalist for FutureFlow AI. Write engaging, SEO-optimized news articles. Always return valid JSON only.\n\n${blogPrompt}`,
            4000
          );
        } catch (error) {
          if (error.message?.includes('429') || error.message?.includes('rate limit')) {
            console.log('Rate limit hit, waiting 10 seconds...');
            await new Promise(resolve => setTimeout(resolve, 10000));
            continue;
          }
          throw error;
        }

        let parsedBlog;
        try {
          let cleanBlog = blogContent.trim();
          if (cleanBlog.startsWith('```')) {
            cleanBlog = cleanBlog.replace(/^```(?:json)?\s*\n/, '').replace(/\n```\s*$/, '');
          }
          parsedBlog = JSON.parse(cleanBlog);
        } catch (parseError) {
          console.error('Failed to parse blog content');
          results.errors.push(`Parse error for: ${topic.title}`);
          results.failed++;
          continue;
        }

        // Insert blog post as published
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

        console.log(`✓ Published: ${parsedBlog.title}`);

        // Rate limiting delay
        if (i < trendingTopics.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }

      } catch (error) {
        console.error(`Error processing ${topic.title}:`, error);
        results.errors.push(`${topic.title}: ${error.message}`);
        results.failed++;
      }
    }

    const summary = `Daily news blog generation complete: ${results.successful} published, ${results.failed} failed`;
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
