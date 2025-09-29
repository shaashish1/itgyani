import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogTopic {
  topic: string;
  category: string;
  keywords?: string[];
}

interface BatchGenerationRequest {
  topics: BlogTopic[];
  tone?: 'professional' | 'casual' | 'technical';
  audience?: 'beginner' | 'intermediate' | 'advanced';
  length?: 'short' | 'medium' | 'long';
  isPremium?: boolean;
  delayBetweenRequests?: number; // milliseconds
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      topics,
      tone = 'professional',
      audience = 'intermediate',
      length = 'medium',
      isPremium = false,
      delayBetweenRequests = 2000,
      adminPassword
    } = body;

    // Verify admin password
    const ADMIN_PASSWORD = 'itgyani2024admin';
    if (adminPassword !== ADMIN_PASSWORD) {
      console.error('Invalid admin password provided');
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid admin password' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Use service role key to bypass RLS for admin operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (!topics || topics.length === 0) {
      return new Response(JSON.stringify({ error: 'At least one topic is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const HUGGING_FACE_TOKEN = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
    if (!HUGGING_FACE_TOKEN) {
      throw new Error('HUGGING_FACE_ACCESS_TOKEN is not configured');
    }

    const hf = new HfInference(HUGGING_FACE_TOKEN);

    const results = {
      successful: 0,
      failed: 0,
      total: topics.length,
      errors: [] as string[],
      posts: [] as any[]
    };

    // Process topics one by one to avoid rate limits
    for (let i = 0; i < topics.length; i++) {
      const topicData = topics[i];
      
      try {
        console.log(`Processing topic ${i + 1}/${topics.length}: ${topicData.topic}`);

        // Get category info
        const { data: categoryData, error: categoryError } = await supabaseClient
          .from('categories')
          .select('*')
          .eq('slug', topicData.category)
          .maybeSingle();

        if (categoryError || !categoryData) {
          console.error(`Category lookup failed for "${topicData.category}":`, categoryError);
          results.errors.push(`Invalid category "${topicData.category}" for topic: ${topicData.topic}`);
          results.failed++;
          continue;
        }

        // Build AI prompt
        const wordCount = length === 'short' ? '800-1200' : length === 'medium' ? '1500-2000' : '2500-3500';
        const keywordText = topicData.keywords && topicData.keywords.length > 0 
          ? `Focus on these keywords: ${topicData.keywords.join(', ')}` 
          : '';
        
        const prompt = `Write a comprehensive blog post about "${topicData.topic}" for the FutureFlow AI blog.

Category: ${categoryData.name}
Target Audience: ${audience} level
Tone: ${tone}
Word Count: ${wordCount} words
${keywordText}

Requirements:
1. Create an engaging, SEO-optimized title
2. Write a compelling meta description (150-160 characters)
3. Include relevant keywords naturally throughout
4. Structure with clear headings (H2, H3)
5. Add practical examples and actionable insights
6. Focus on ${categoryData.description}
7. Include a strong call-to-action at the end
8. Generate 5-7 relevant tags

Format your response as JSON with these fields:
{
  "title": "SEO-optimized title",
  "slug": "url-friendly-slug",
  "excerpt": "Brief excerpt (2-3 sentences)",
  "content": "Full blog post content in markdown",
  "metaTitle": "SEO meta title",
  "metaDescription": "SEO meta description",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "tags": ["tag1", "tag2", "tag3"],
  "readingTime": estimated_reading_time_in_minutes
}`;

        // Call HuggingFace AI with free model
        const startTime = Date.now();
        console.log('Calling HuggingFace API...');
        
        let generatedContent: string;
        try {
          const systemMessage = 'You are an expert content writer for FutureFlow AI, specializing in creating engaging, SEO-optimized blog posts about AI, automation, and future technology. Always respond with valid JSON format only, no markdown code blocks.';
          const fullPrompt = `${systemMessage}\n\n${prompt}`;
          
          const response = await hf.textGeneration({
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            inputs: fullPrompt,
            parameters: {
              max_new_tokens: 3000,
              temperature: 0.7,
              return_full_text: false,
            }
          });

          generatedContent = response.generated_text || '';
          console.log('Raw AI response length:', generatedContent.length);
        } catch (error: any) {
          console.error(`HuggingFace API error for topic ${topicData.topic}:`, error);
          
          if (error.message?.includes('rate limit') || error.message?.includes('429')) {
            results.errors.push(`Rate limit exceeded at topic ${i + 1}. Consider increasing delay.`);
            results.failed++;
            await new Promise(resolve => setTimeout(resolve, 10000));
            continue;
          }

          results.errors.push(`AI error for "${topicData.topic}": ${error.message}`);
          results.failed++;
          continue;
        }

        const generationTime = Date.now() - startTime;

        // Parse the AI response - strip markdown code blocks if present
        let blogData;
        try {
          // Remove markdown code blocks (```json ... ``` or ``` ... ```)
          let cleanedContent = generatedContent.trim();
          if (cleanedContent.startsWith('```')) {
            cleanedContent = cleanedContent.replace(/^```(?:json)?\s*\n/, '').replace(/\n```\s*$/, '');
          }
          
          blogData = JSON.parse(cleanedContent);
        } catch (parseError) {
          console.error('Failed to parse AI response:', generatedContent.substring(0, 500));
          results.errors.push(`Failed to parse response for "${topicData.topic}"`);
          results.failed++;
          continue;
        }

        // Create blog post (without author_id since we don't have authenticated user)
        const { data: blogPost, error: insertError } = await supabaseClient
          .from('blog_posts')
          .insert({
            title: blogData.title,
            slug: blogData.slug,
            excerpt: blogData.excerpt,
            content: blogData.content,
            category_id: categoryData.id,
            meta_title: blogData.metaTitle,
            meta_description: blogData.metaDescription,
            keywords: blogData.keywords,
            tags: blogData.tags,
            reading_time: blogData.readingTime,
            is_premium: isPremium,
            status: 'draft'
          })
          .select()
          .single();

        if (insertError) {
          console.error('Failed to insert blog post:', insertError);
          results.errors.push(`Failed to save "${topicData.topic}": ${insertError.message}`);
          results.failed++;
          continue;
        }

        // Log AI generation
        await supabaseClient
          .from('ai_generation_logs')
          .insert({
            blog_post_id: blogPost.id,
            prompt: topicData.topic,
            model_used: 'mistralai/Mistral-7B-Instruct-v0.3',
            tokens_used: 0, // HuggingFace doesn't provide token count
            generation_time_ms: generationTime,
            status: 'success'
          });

        results.successful++;
        results.posts.push({
          id: blogPost.id,
          title: blogData.title,
          topic: topicData.topic
        });

        console.log(`✓ Successfully generated: ${blogData.title}`);

        // Delay between requests to avoid rate limits (except for last item)
        if (i < topics.length - 1) {
          await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
        }

      } catch (error) {
        console.error(`Error processing topic "${topicData.topic}":`, error);
        results.errors.push(`Error for "${topicData.topic}": ${error instanceof Error ? error.message : 'Unknown error'}`);
        results.failed++;
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      results,
      message: `Batch complete: ${results.successful} successful, ${results.failed} failed out of ${results.total} topics`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in generate-blog-batch function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
