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

  const startTime = Date.now();
  console.log('🔄 Enhanced queue processor started at:', new Date().toISOString());

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🔄 Processing blog queue (enhanced version)...');

    // Get pending items with priority ordering - LIMIT TO 3 FOR RELIABILITY
    const { data: queueItems, error: queueError } = await supabase
      .from('blog_generation_queue')
      .select('*')
      .eq('status', 'pending')
      .order('priority', { ascending: true })  // Higher priority first
      .order('created_at', { ascending: true }) // Older items first
      .limit(3); // **CRITICAL: Process only 3 at a time to avoid timeout**

    if (queueError) {
      console.error('❌ Failed to fetch queue items:', queueError);
      throw queueError;
    }

    if (!queueItems || queueItems.length === 0) {
      console.log('📭 No pending items in queue');
      return new Response(
        JSON.stringify({ 
          message: 'Queue is empty', 
          processed: 0,
          timestamp: new Date().toISOString()
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📊 Found ${queueItems.length} pending items to process`);

    const results = {
      processed: 0,
      successful: 0,
      failed: 0,
      errors: [] as string[],
      items: [] as any[]
    };

    // Process each queue item
    for (const item of queueItems) {
      try {
        console.log(`🔄 Processing item ${item.id}: ${item.topic?.title || 'Unknown topic'}`);
        
        // Mark as processing
        await supabase
          .from('blog_generation_queue')
          .update({
            status: 'processing',
            started_at: new Date().toISOString(),
            attempts: (item.attempts || 0) + 1
          })
          .eq('id', item.id);

        // **CALL THE SINGLE BLOG PROCESSOR**
        const blogResponse = await fetch(`${supabaseUrl}/functions/v1/process-single-blog`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            queueItemId: item.id,
            topic: item.topic,
            runId: item.run_id
          })
        });

        if (blogResponse.ok) {
          const blogResult = await blogResponse.json();
          
          if (blogResult.success) {
            // Mark as completed
            await supabase
              .from('blog_generation_queue')
              .update({
                status: 'completed',
                completed_at: new Date().toISOString(),
                error_message: null
              })
              .eq('id', item.id);

            results.successful++;
            results.items.push({
              id: item.id,
              status: 'completed',
              topic: item.topic?.title,
              blogId: blogResult.blogId
            });
            
            console.log(`✅ Successfully processed item ${item.id}`);
          } else {
            throw new Error(blogResult.error || 'Blog generation failed');
          }
        } else {
          const errorText = await blogResponse.text();
          throw new Error(`HTTP ${blogResponse.status}: ${errorText}`);
        }

      } catch (error) {
        console.error(`❌ Failed to process item ${item.id}:`, error);
        
        const errorMessage = error.message || 'Unknown error';
        const attempts = (item.attempts || 0) + 1;
        const maxAttempts = item.max_attempts || 3;
        
        // Mark as failed or retry
        const newStatus = attempts >= maxAttempts ? 'failed' : 'pending';
        
        await supabase
          .from('blog_generation_queue')
          .update({
            status: newStatus,
            error_message: errorMessage,
            completed_at: newStatus === 'failed' ? new Date().toISOString() : null,
            attempts: attempts
          })
          .eq('id', item.id);

        results.failed++;
        results.errors.push(`Item ${item.id}: ${errorMessage}`);
        results.items.push({
          id: item.id,
          status: newStatus,
          topic: item.topic?.title,
          error: errorMessage,
          attempts: attempts
        });

        console.log(`💥 Item ${item.id} ${newStatus === 'failed' ? 'permanently failed' : 'will retry'} (attempt ${attempts}/${maxAttempts})`);
      }

      results.processed++;
      
      // Add small delay between items to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Update daily blog run status if applicable
    const runIds = [...new Set(queueItems.map(item => item.run_id).filter(Boolean))];
    
    for (const runId of runIds) {
      if (runId) {
        await updateDailyRunProgress(supabase, runId);
      }
    }

    const elapsedTime = Date.now() - startTime;
    console.log(`⚡ Queue processing completed in ${elapsedTime}ms`);
    console.log(`📊 Results: ${results.successful} successful, ${results.failed} failed, ${results.processed} total`);

    return new Response(
      JSON.stringify({
        success: true,
        ...results,
        processingTimeMs: elapsedTime,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('💥 Fatal error in queue processor:', error);
    
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

async function updateDailyRunProgress(supabase: any, runId: string) {
  try {
    // Get queue statistics for this run
    const { data: queueStats, error: statsError } = await supabase
      .from('blog_generation_queue')
      .select('status')
      .eq('run_id', runId);

    if (statsError) {
      console.error('Failed to get queue stats:', statsError);
      return;
    }

    const totalQueued = queueStats.length;
    const completed = queueStats.filter((item: any) => item.status === 'completed').length;
    const failed = queueStats.filter((item: any) => item.status === 'failed').length;
    const pending = queueStats.filter((item: any) => item.status === 'pending').length;
    const processing = queueStats.filter((item: any) => item.status === 'processing').length;

    // Determine overall status
    let status = 'running';
    if (pending === 0 && processing === 0) {
      status = completed > 0 ? (failed === 0 ? 'completed' : 'partial') : 'failed';
    }

    // Update daily run
    const updateData: any = {
      blogs_created: completed,
      blogs_failed: failed,
      status: status,
      updated_at: new Date().toISOString()
    };

    if (status !== 'running') {
      updateData.completed_at = new Date().toISOString();
    }

    await supabase
      .from('daily_blog_runs')
      .update(updateData)
      .eq('id', runId);

    console.log(`📊 Updated daily run ${runId}: ${completed} completed, ${failed} failed, ${pending} pending`);

  } catch (error) {
    console.error('Failed to update daily run progress:', error);
  }
}