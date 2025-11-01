import "https://deno.land/x/xhr@0.1.0/mod.ts";
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

// Global state for graceful shutdown
let currentRunId: string | null = null;
let blogsCreatedCount = 0;
let blogsFailedCount = 0;
let supabaseClient: any = null;

// Handle shutdown events to save progress
addEventListener('beforeunload', async (ev) => {
  console.log('⚠️ Function shutdown detected, saving progress...');
  
  if (currentRunId && supabaseClient) {
    try {
      await supabaseClient
        .from('daily_blog_runs')
        .update({
          status: blogsCreatedCount > 0 ? 'partial' : 'failed',
          blogs_created: blogsCreatedCount,
          blogs_failed: blogsFailedCount,
          error_message: `Function shutdown during generation. Created: ${blogsCreatedCount}, Failed: ${blogsFailedCount}`
        })
        .eq('id', currentRunId);
      
      console.log('✅ Progress saved before shutdown');
    } catch (error) {
      console.error('Failed to save progress on shutdown:', error);
    }
  }
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestStartTime = Date.now();
  console.log('🚀 Daily blog generation started at:', new Date().toISOString());

  try {
    const { count = 10, config, topicsOnly = false } = await req.json();
    
    // Default config if not provided
    const modelConfig = config || {
      contentModel: 'auto',
      imageModel: 'gpt-image-1',
      maxTokens: 3000,
      imageSize: '1024x1024',
      imageQuality: 'high',
      temperature: 0.7
    };

    console.log('📋 Using config:', modelConfig);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    supabaseClient = supabase; // Store for shutdown handler

    // Helper function to log steps
    const logStep = async (
      runId: string, 
      stepNumber: number, 
      stepName: string, 
      status: 'pending' | 'running' | 'completed' | 'failed',
      details: any = {},
      errorMessage?: string
    ) => {
      const stepData: any = {
        run_id: runId,
        step_number: stepNumber,
        step_name: stepName,
        status,
        details,
        error_message: errorMessage
      };

      if (status === 'completed' || status === 'failed') {
        stepData.completed_at = new Date().toISOString();
      }

      // Try to find existing step
      const { data: existingStep } = await supabase
        .from('blog_generation_steps')
        .select('id, started_at')
        .eq('run_id', runId)
        .eq('step_number', stepNumber)
        .single();

      if (existingStep) {
        // Update existing step
        const updates: any = { status, details };
        if (errorMessage) updates.error_message = errorMessage;
        if (status === 'completed' || status === 'failed') {
          updates.completed_at = new Date().toISOString();
          const duration = Date.now() - new Date(existingStep.started_at).getTime();
          updates.duration_ms = duration;
        }
        
        await supabase
          .from('blog_generation_steps')
          .update(updates)
          .eq('id', existingStep.id);
      } else {
        // Create new step
        await supabase
          .from('blog_generation_steps')
          .insert(stepData);
      }

      console.log(`📊 Step ${stepNumber}: ${stepName} - ${status}`, details);
    };

    // Create initial run record with target count
    const { data: runRecord, error: runError } = await supabase
      .from('daily_blog_runs')
      .insert({
        status: 'running',
        blogs_created: 0,
        blogs_failed: 0,
        blogs_total: count
      })
      .select()
      .single();

    if (runError) {
      console.error('Error creating run record:', runError);
      throw runError;
    }

    const runId = runRecord.id;
    currentRunId = runId; // Store for shutdown handler
    console.log('📝 Created run record:', runId);

    // Start background processing
    (async () => {
      let blogsCreated = 0;
      let blogsFailed = 0;
      
      try {

        // Helper: Call OpenAI for text generation with model selection
        const callOpenAI = async (messages: any[], maxTokens = modelConfig.maxTokens) => {
          // Auto-select model based on task complexity if set to 'auto'
          let selectedModel = modelConfig.contentModel;
          if (selectedModel === 'auto') {
            // Simple heuristic: use faster models for shorter content, premium for longer
            selectedModel = maxTokens > 4000 ? 'gpt-5-2025-08-07' : 'gpt-5-mini-2025-08-07';
          }

          const requestBody: any = {
            model: selectedModel,
            messages,
            max_completion_tokens: maxTokens,
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
          };

          // Only add temperature for legacy models
          const legacyModels = ['gpt-4o', 'gpt-4o-mini', 'dall-e-2', 'dall-e-3'];
          if (legacyModels.some(m => selectedModel.includes(m))) {
            requestBody.temperature = modelConfig.temperature;
          }

          console.log(`  Using model: ${selectedModel}`);

          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openAIApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
          }

          return await response.json();
        };

        // Helper: Generate blog image with OpenAI using config
        const generateBlogImage = async (title: string, excerpt: string, category: string) => {
          console.log(`🎨 Generating image for: ${title}`);
          
          // Category-specific image prompts
          const categoryStyles: Record<string, string> = {
            'AI/ML': 'Modern tech illustration with neural network patterns, blue and purple gradients, futuristic AI elements, professional and clean, 16:9 aspect ratio',
            'Automation': 'Digital workflow illustration showing connected systems, process flow diagrams, efficiency icons, corporate blue theme, 16:9 aspect ratio',
            'Quantum Computing': 'Scientific visualization of quantum particles, abstract quantum circuits, blue and gold color scheme, futuristic lab aesthetic, 16:9 aspect ratio',
            'Edge AI': 'Distributed systems illustration, edge devices network, real-time processing visual, tech-forward design, 16:9 aspect ratio',
            'Future Tech': 'Innovation-focused illustration, cutting-edge technology, forward-thinking design, vibrant colors, inspiring composition, 16:9 aspect ratio'
          };

          const styleGuide = categoryStyles[category] || categoryStyles['AI/ML'];
          const imagePrompt = `Professional blog header image: ${title}. ${excerpt}. Style: ${styleGuide}. Ultra high resolution, magazine quality.`;

          try {
            const requestBody: any = {
              model: modelConfig.imageModel,
              prompt: imagePrompt,
              n: 1
            };

            // Add model-specific parameters
            if (modelConfig.imageModel === 'gpt-image-1') {
              // gpt-image-1 supports: 1024x1024, 1536x1024, 1024x1536, auto
              const validSizes = ['1024x1024', '1024x1536', '1536x1024', 'auto'];
              requestBody.size = validSizes.includes(modelConfig.imageSize) ? modelConfig.imageSize : '1024x1024';
              requestBody.quality = modelConfig.imageQuality;
              requestBody.output_format = 'png';
              requestBody.background = 'opaque';
            } else if (modelConfig.imageModel === 'dall-e-3') {
              // DALL-E 3 supports 1024x1024, 1024x1792, 1792x1024
              const validSizes = ['1024x1024', '1024x1792', '1792x1024'];
              requestBody.size = validSizes.includes(modelConfig.imageSize) ? modelConfig.imageSize : '1024x1024';
              requestBody.quality = modelConfig.imageQuality === 'high' ? 'hd' : 'standard';
              requestBody.style = 'vivid';
            } else if (modelConfig.imageModel === 'dall-e-2') {
              // DALL-E 2 only supports square images
              requestBody.size = '1024x1024';
            }

            const response = await fetch('https://api.openai.com/v1/images/generations', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${openAIApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
              const errorText = await response.text();
              console.error('Image generation error:', errorText);
              return null;
            }

            const data = await response.json();
            
            // Handle different response formats
            if (modelConfig.imageModel === 'gpt-image-1') {
              const imageBase64 = data.data[0].b64_json;
              return `data:image/png;base64,${imageBase64}`;
            } else {
              // DALL-E returns URL
              return data.data[0].url;
            }
          } catch (imageError: any) {
            console.error('Error generating image:', imageError);
            return null;
          }
        };

        // Step 1: Generate trending topics
        await logStep(runId, 1, 'Fetching trending topics', 'running', { count });
        console.log('📰 Fetching trending topics...');
        const topicsPrompt = `Generate ${count} trending AI and automation blog topics for ${new Date().toLocaleDateString()}. Focus on:
- Latest AI developments and breakthroughs
- Business automation trends
- Quantum computing advances
- Edge AI applications
- Future technology predictions`;

        const topicsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-5-mini-2025-08-07',
            messages: [
              { role: 'system', content: 'You are an AI trends expert.' },
              { role: 'user', content: topicsPrompt }
            ],
            max_completion_tokens: 2000,
            tools: [{
              type: "function",
              function: {
                name: "generate_topics",
                description: "Generate a list of trending blog topics",
                parameters: {
                  type: "object",
                  properties: {
                    topics: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          description: { type: "string" },
                          category: { type: "string" },
                          keywords: { type: "array", items: { type: "string" } }
                        },
                        required: ["title", "description", "category", "keywords"]
                      }
                    }
                  },
                  required: ["topics"]
                }
              }
            }],
            tool_choice: { type: "function", function: { name: "generate_topics" }}
          }),
        });

        if (!topicsResponse.ok) {
          const errorText = await topicsResponse.text();
          console.error('Topics generation error:', errorText);
          throw new Error(`OpenAI API error: ${topicsResponse.status} - ${errorText}`);
        }

        const topicsData = await topicsResponse.json();
        let topics: NewsSource[] = [];
        try {
          const toolCall = topicsData.choices[0]?.message?.tool_calls?.[0];
          if (toolCall?.function?.arguments) {
            const parsed = JSON.parse(toolCall.function.arguments);
            topics = parsed.topics || [];
            console.log('✅ Parsed topics from tool call:', topics.length);
          } else {
            console.error('No tool call found in response:', JSON.stringify(topicsData.choices[0]?.message, null, 2));
          }
        } catch (parseError) {
          console.error('Error parsing topics:', parseError);
          console.error('Tool call arguments:', topicsData.choices[0]?.message?.tool_calls?.[0]?.function?.arguments);
          topics = [];
        }

        console.log(`📋 Generated ${topics.length} topics`);
        await logStep(runId, 1, 'Fetching trending topics', 'completed', { 
          topicsCount: topics.length,
          topics: topics.map(t => t.title) 
        });

        // If topicsOnly mode, return just the topics without creating blogs
        if (topicsOnly) {
          console.log('📤 Returning topics only (topics will be queued)');
          
          // Create queue items for each topic
          const queueItems = topics.map(topic => ({
            run_id: runId,
            topic: topic,
            status: 'pending'
          }));

          const { error: queueError } = await supabase
            .from('blog_generation_queue')
            .insert(queueItems);

          if (queueError) {
            console.error('Error creating queue items:', queueError);
            throw queueError;
          }

          // Update run record
          await supabase
            .from('daily_blog_runs')
            .update({
              status: 'running', // Will be marked completed by queue processor
              blogs_total: topics.length
            })
            .eq('id', runId);
          
          return new Response(
            JSON.stringify({ 
              success: true,
              runId: runId,
              topics: topics,
              count: topics.length,
              message: 'Topics queued for processing'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Check if we have topics to work with
        if (topics.length === 0) {
          throw new Error('No topics were generated by AI. Please check your API key and try again.');
        }

        // Step 2: Filter out duplicates
        await logStep(runId, 2, 'Filtering duplicate topics', 'running', { totalTopics: topics.length });
        const recentTitles = await supabase
          .from('blog_posts')
          .select('title')
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

        const existingTitles = new Set(
          (recentTitles.data || []).map((post: any) => 
            post.title.toLowerCase().replace(/[^a-z0-9]/g, '')
          )
        );

        const uniqueTopics = topics.filter((topic: NewsSource) => {
          const normalizedTitle = topic.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          return !existingTitles.has(normalizedTitle);
        });

        console.log(`✅ ${uniqueTopics.length} unique topics after filtering`);
        await logStep(runId, 2, 'Filtering duplicate topics', 'completed', { 
          uniqueTopicsCount: uniqueTopics.length,
          duplicatesRemoved: topics.length - uniqueTopics.length 
        });

        // If no unique topics, update status and exit
        if (uniqueTopics.length === 0) {
          await supabase
            .from('daily_blog_runs')
            .update({
              status: 'failed',
              blogs_created: 0,
              blogs_failed: 0,
              error_message: 'All generated topics were duplicates of recent posts'
            })
            .eq('id', runId);
          
          throw new Error('No unique topics found. All topics were duplicates of recent posts.');
        }

        // Step 3: Get category mappings
        const { data: categories } = await supabase
          .from('categories')
          .select('id, name, slug');

        const categoryMap = new Map(
          (categories || []).map((cat: any) => [cat.name.toLowerCase(), cat.id])
        );

        // Step 4: Generate blogs for each topic
        await logStep(runId, 3, 'Starting blog generation', 'running', { totalBlogs: Math.min(uniqueTopics.length, count) });
        
        for (const topic of uniqueTopics.slice(0, count)) {
          try {
            const blogStepNumber = 4 + blogsCreatedCount;
            await logStep(runId, blogStepNumber, `Generating blog: ${topic.title}`, 'running', { topic: topic.title });
            console.log(`\n📝 Generating blog: ${topic.title}`);
            
            const blogPrompt = `Write a comprehensive, engaging blog post about: ${topic.title}

Description: ${topic.description}
Keywords: ${topic.keywords.join(', ')}
Category: ${topic.category}

Requirements:
- **Word Count: 700-1000 words** (this is CRITICAL - do not exceed 1000 words)
- Use clear structure with sections and subsections
- Include practical examples and real-world applications
- Make it informative yet accessible
- SEO optimized with natural keyword integration
- Professional tone with engaging storytelling
- Keep content focused and concise`;

            const maxRetries = 3;
            let blogData = null;
            
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
              try {
                console.log(`  Attempt ${attempt}/${maxRetries}...`);
                const blogResponse = await callOpenAI([
                  { role: 'system', content: 'You are an expert tech writer specializing in AI, automation, and emerging technologies. You write concise, high-quality content.' },
                  { role: 'user', content: blogPrompt }
                ], 1500); // Reduced to ~1000 words max

                const toolCall = blogResponse.choices[0]?.message?.tool_calls?.[0];
                if (toolCall) {
                  blogData = JSON.parse(toolCall.function.arguments);
                  break;
                }
              } catch (retryError: any) {
                console.error(`  Attempt ${attempt} failed:`, retryError.message);
                if (attempt < maxRetries) {
                  await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
                }
              }
            }

            if (!blogData) {
              console.error('❌ Failed to generate blog content after retries');
              await logStep(runId, blogStepNumber, `Generating blog: ${topic.title}`, 'failed', 
                { topic: topic.title }, 'Failed to generate content after retries');
              blogsFailed++;
              blogsFailedCount = blogsFailed;
              
              // Update failed count immediately
              await supabase
                .from('daily_blog_runs')
                .update({
                  blogs_created: blogsCreated,
                  blogs_failed: blogsFailed
                })
                .eq('id', runId);
              
              continue;
            }

            // Validate and provide fallbacks
            const blogContent = {
              title: blogData.title || topic.title,
              content: blogData.content || `# ${topic.title}\n\n${topic.description}`,
              excerpt: blogData.excerpt || topic.description.substring(0, 200),
              keywords: Array.isArray(blogData.keywords) ? blogData.keywords : topic.keywords,
              meta_description: blogData.meta_description || topic.description.substring(0, 160),
              tags: Array.isArray(blogData.tags) ? blogData.tags : topic.keywords.slice(0, 5)
            };

            console.log('  ✅ Content generated');

            // Generate featured image
            const featuredImage = await generateBlogImage(
              blogContent.title,
              blogContent.excerpt,
              topic.category
            );

            if (featuredImage) {
              console.log('  🎨 Image generated');
            }

            // Create slug
            const slug = blogContent.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');

            // Get category ID
            const categoryId = categoryMap.get(topic.category.toLowerCase()) || 
                             categoryMap.get('ai/ml') ||
                             Array.from(categoryMap.values())[0];

            // Calculate reading time
            const wordCount = blogContent.content.split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200);

            // Insert blog post
            const { data: insertedPost, error: insertError } = await supabase
              .from('blog_posts')
              .insert({
                title: blogContent.title,
                slug,
                content: blogContent.content,
                excerpt: blogContent.excerpt,
                meta_description: blogContent.meta_description,
                keywords: blogContent.keywords,
                tags: blogContent.tags,
                category_id: categoryId,
                featured_image_url: featuredImage,
                reading_time: readingTime,
                status: 'published',
                published_at: new Date().toISOString()
              })
              .select()
              .single();

            if (insertError) {
              console.error('  ❌ Error inserting blog:', insertError);
              blogsFailed++;
              continue;
            }

            // Log AI generation
            await supabase.from('ai_generation_logs').insert({
              blog_post_id: insertedPost.id,
              model_used: 'gpt-5-mini-2025-08-07 + gpt-image-1',
              prompt: blogPrompt,
              status: 'success',
              generation_time_ms: Date.now() - requestStartTime
            });

            blogsCreated++;
            blogsCreatedCount = blogsCreated; // Update global for shutdown handler
            console.log(`  ✨ Blog created successfully (${blogsCreated}/${count})`);
            
            await logStep(runId, blogStepNumber, `Generating blog: ${topic.title}`, 'completed', { 
              topic: topic.title,
              blogId: insertedPost.id,
              slug,
              readingTime,
              hasImage: !!featuredImage
            });

            // Update progress in real-time after each blog
            await supabase
              .from('daily_blog_runs')
              .update({
                blogs_created: blogsCreated,
                blogs_failed: blogsFailed
              })
              .eq('id', runId);
            console.log(`  📊 Progress updated: ${blogsCreated} created, ${blogsFailed} failed`);

          } catch (topicError: any) {
            console.error(`❌ Error processing topic "${topic.title}":`, topicError);
            await logStep(runId, blogStepNumber, `Generating blog: ${topic.title}`, 'failed', 
              { topic: topic.title }, topicError.message);
            blogsFailed++;
            blogsFailedCount = blogsFailed; // Update global for shutdown handler
            
            // Update failed count in real-time
            await supabase
              .from('daily_blog_runs')
              .update({
                blogs_created: blogsCreated,
                blogs_failed: blogsFailed
              })
              .eq('id', runId);
            console.log(`  📊 Progress updated: ${blogsCreated} created, ${blogsFailed} failed`);
          }
        }

        await logStep(runId, 3, 'Starting blog generation', 'completed', { 
          totalCreated: blogsCreated,
          totalFailed: blogsFailed 
        });

        // Final update of run record
        const finalStatus = blogsCreated > 0 && blogsFailed === 0 ? 'completed' : 
                           blogsCreated > 0 && blogsFailed > 0 ? 'partial' : 
                           'failed';
        
        await supabase
          .from('daily_blog_runs')
          .update({
            status: finalStatus,
            blogs_created: blogsCreated,
            blogs_failed: blogsFailed,
            error_message: blogsFailed > 0 ? `${blogsFailed} blog(s) failed to generate` : null
          })
          .eq('id', runId);

        console.log(`\n✅ Daily blog generation completed:`);
        console.log(`   Created: ${blogsCreated}`);
        console.log(`   Failed: ${blogsFailed}`);
        console.log(`   Duration: ${(Date.now() - requestStartTime) / 1000}s`);
        
        // Clear global state
        currentRunId = null;
        blogsCreatedCount = 0;
        blogsFailedCount = 0;

      } catch (bgError: any) {
        console.error('Background processing error:', bgError);
        
        // Update global counts before saving
        blogsFailedCount = blogsFailed;
        blogsCreatedCount = blogsCreated;
        
        await supabase
          .from('daily_blog_runs')
          .update({
            status: 'failed',
            blogs_created: blogsCreated,
            blogs_failed: blogsFailed,
            error_message: bgError.message
          })
          .eq('id', runId);
        
        // Clear global state
        currentRunId = null;
        blogsCreatedCount = 0;
        blogsFailedCount = 0;
      }
    })();

    // Return immediate response
    return new Response(
      JSON.stringify({ 
        message: 'Daily blog generation started',
        runId,
        requestedCount: count
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in generate-daily-news-blogs:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
