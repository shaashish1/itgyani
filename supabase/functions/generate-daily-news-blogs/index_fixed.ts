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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestStartTime = Date.now();
  console.log('🚀 Daily blog generation FIXED VERSION started at:', new Date().toISOString());

  try {
    const { count = 10, config, topicsOnly = false, priority = 2 } = await req.json();
    
    console.log(`📊 Request: Generate ${count} blogs, topicsOnly: ${topicsOnly}, priority: ${priority}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create daily blog run entry
    const { data: dailyRun, error: runError } = await supabase
      .from('daily_blog_runs')
      .insert({
        status: 'running',
        target_count: count,
        blogs_created: 0,
        blogs_failed: 0,
        started_at: new Date().toISOString(),
        config: config || {}
      })
      .select()
      .single();

    if (runError || !dailyRun) {
      console.error('❌ Failed to create daily run:', runError);
      throw new Error(`Failed to create daily run: ${runError?.message}`);
    }

    console.log(`✅ Created daily run: ${dailyRun.id}`);

    // Generate trending topics quickly
    console.log('📊 Generating trending topics...');
    const trendingTopics = await generateTrendingTopics();
    
    console.log(`✅ Generated ${trendingTopics.length} trending topics`);

    // If only topics requested, return them
    if (topicsOnly) {
      await supabase
        .from('daily_blog_runs')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          topics: trendingTopics
        })
        .eq('id', dailyRun.id);

      return new Response(
        JSON.stringify({
          success: true,
          runId: dailyRun.id,
          topics: trendingTopics,
          message: 'Topics generated successfully'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // **CRITICAL FIX: Instead of processing all blogs here, queue them**
    console.log('📝 Queuing blog generation jobs...');
    
    const queueItems = [];
    for (let i = 0; i < Math.min(count, trendingTopics.length); i++) {
      const topic = trendingTopics[i];
      
      const { data: queueItem, error: queueError } = await supabase
        .from('blog_generation_queue')
        .insert({
          run_id: dailyRun.id,
          topic: topic,
          status: 'pending',
          priority: priority,
          attempts: 0,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (queueError) {
        console.error(`❌ Failed to queue topic ${i + 1}:`, queueError);
      } else {
        queueItems.push(queueItem);
        console.log(`✅ Queued topic ${i + 1}: ${topic.title}`);
      }
    }

    // Update daily run with queued count
    await supabase
      .from('daily_blog_runs')
      .update({
        status: 'queued',
        topics: trendingTopics,
        queued_count: queueItems.length,
        updated_at: new Date().toISOString()
      })
      .eq('id', dailyRun.id);

    // **CRITICAL FIX: Trigger queue processor asynchronously**
    console.log('🚀 Triggering queue processor...');
    
    // Use fetch to trigger queue processor without waiting
    try {
      const processResponse = await fetch(`${supabaseUrl}/functions/v1/queue-runner`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ runId: dailyRun.id })
      });

      if (processResponse.ok) {
        console.log('✅ Queue processor triggered successfully');
      } else {
        console.warn('⚠️ Queue processor trigger failed, but jobs are queued');
      }
    } catch (triggerError) {
      console.warn('⚠️ Failed to trigger queue processor:', triggerError);
      console.log('💡 Jobs are queued - manual queue processing may be needed');
    }

    const elapsedTime = Date.now() - requestStartTime;
    console.log(`⚡ Daily blog generation setup completed in ${elapsedTime}ms`);

    // **RETURN IMMEDIATELY - Don't wait for blog generation**
    return new Response(
      JSON.stringify({
        success: true,
        runId: dailyRun.id,
        message: `Successfully queued ${queueItems.length} blog generation jobs`,
        queuedCount: queueItems.length,
        targetCount: count,
        status: 'queued',
        processingMessage: 'Blogs are being generated in the background via queue processor'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('💥 Fatal error in daily blog generation:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error occurred',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function generateTrendingTopics(): Promise<NewsSource[]> {
  // AI and Technology trending topics (fallback data for reliability)
  const trendingTopics: NewsSource[] = [
    {
      title: "Latest AI Breakthrough in Language Models",
      description: "Exploring recent advancements in large language models and their impact on various industries",
      category: "AI",
      keywords: ["artificial intelligence", "language models", "technology", "innovation"]
    },
    {
      title: "Quantum Computing Milestone Achievement",
      description: "Recent breakthroughs in quantum computing hardware and their implications for the future",
      category: "Technology",
      keywords: ["quantum computing", "hardware", "breakthrough", "future tech"]
    },
    {
      title: "Machine Learning in Healthcare Revolution",
      description: "How ML algorithms are transforming medical diagnosis and treatment protocols",
      category: "AI",
      keywords: ["machine learning", "healthcare", "medical AI", "diagnosis"]
    },
    {
      title: "Cybersecurity Trends for Modern Enterprises",
      description: "Latest cybersecurity threats and protective measures for businesses",
      category: "Security",
      keywords: ["cybersecurity", "enterprise security", "threats", "protection"]
    },
    {
      title: "Blockchain Technology Beyond Cryptocurrency",
      description: "Innovative blockchain applications in supply chain, voting, and identity verification",
      category: "Blockchain",
      keywords: ["blockchain", "supply chain", "innovation", "applications"]
    },
    {
      title: "Edge Computing Infrastructure Evolution",
      description: "How edge computing is reshaping data processing and IoT implementations",
      category: "Technology",
      keywords: ["edge computing", "IoT", "infrastructure", "data processing"]
    },
    {
      title: "Sustainable Technology Solutions",
      description: "Green technology innovations addressing climate change and environmental challenges",
      category: "Green Tech",
      keywords: ["sustainable technology", "green tech", "climate", "environment"]
    },
    {
      title: "5G Network Implementation Progress",
      description: "Global 5G rollout status and its impact on telecommunications and IoT",
      category: "Telecom",
      keywords: ["5G", "telecommunications", "network", "connectivity"]
    },
    {
      title: "Autonomous Vehicle Technology Updates",
      description: "Recent developments in self-driving car technology and regulatory changes",
      category: "Automotive",
      keywords: ["autonomous vehicles", "self-driving", "automotive tech", "regulation"]
    },
    {
      title: "Cloud Computing Security Best Practices",
      description: "Essential security measures for cloud infrastructure and data protection",
      category: "Cloud",
      keywords: ["cloud computing", "security", "data protection", "best practices"]
    }
  ];

  // Add timestamp and shuffle for variety
  const shuffled = trendingTopics
    .sort(() => 0.5 - Math.random())
    .slice(0, 10)
    .map(topic => ({
      ...topic,
      title: `${topic.title} - ${new Date().toLocaleDateString()}`,
      description: `${topic.description} (Generated on ${new Date().toLocaleDateString()})`
    }));

  return shuffled;
}