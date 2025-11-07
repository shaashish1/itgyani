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
    const { runId } = await req.json();
    
    console.log('🚀 Queue runner started', runId ? `for run: ${runId}` : 'for all pending items');

    // Return immediately to avoid timeout
    const response = new Response(
      JSON.stringify({ started: true, runId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

    // Process in background
    const processQueue = async () => {
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

      if (!supabaseUrl || !supabaseServiceKey) {
        console.error('❌ Missing Supabase configuration');
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      let processedCount = 0;
      let successCount = 0;
      let failedCount = 0;
      let backoffSeconds = 0;

      // Process loop
      while (true) {
        try {
          // Build query
          let query = supabase
            .from('blog_generation_queue')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: true })
            .limit(1);

          if (runId) {
            query = query.eq('run_id', runId);
          }

          const { data: items, error } = await query;

          if (error) {
            console.error('❌ Queue fetch error:', error);
            break;
          }

          if (!items || items.length === 0) {
            console.log('✅ Queue empty, runner finished');
            
            // Update run status if all items processed
            if (runId) {
              await updateRunStatus(supabase, runId);
            }
            break;
          }

          const item = items[0];
          console.log(`📝 Processing: ${item.topic.title || 'untitled'} (${item.id})`);

          // Invoke process-single-blog
          const { data: result, error: invokeError } = await supabase.functions.invoke('process-single-blog', {
            body: { queueItemId: item.id }
          });

          if (invokeError) {
            const errorMsg = invokeError.message || String(invokeError);
            console.error(`❌ Failed ${item.id}:`, errorMsg);
            
            // Check for rate limit or payment errors
            if (errorMsg.includes('429') || errorMsg.includes('Rate limit')) {
              console.log('⏳ Rate limit hit, backing off 60s');
              backoffSeconds = 60;
              await sleep(backoffSeconds * 1000);
              continue; // Retry same item
            } else if (errorMsg.includes('402') || errorMsg.includes('Payment')) {
              console.log('💳 Payment required, backing off 90s');
              backoffSeconds = 90;
              await sleep(backoffSeconds * 1000);
              continue; // Retry same item
            }
            
            failedCount++;
          } else {
            console.log(`✅ Success: ${item.topic.title || item.id}`);
            successCount++;
            backoffSeconds = 0; // Reset backoff on success
          }

          processedCount++;
          
          // Small delay between items
          await sleep(12000); // 12 seconds

        } catch (error: any) {
          console.error('❌ Loop error:', error);
          failedCount++;
          await sleep(15000); // Wait before retry
        }
      }

      console.log(`📊 Runner complete: ${processedCount} processed, ${successCount} successful, ${failedCount} failed`);
    };

    // Start background processing
    // @ts-ignore - EdgeRuntime is available at runtime
    if (typeof EdgeRuntime !== 'undefined' && EdgeRuntime.waitUntil) {
      // @ts-ignore
      EdgeRuntime.waitUntil(processQueue());
    } else {
      // Fallback for local testing
      processQueue().catch(console.error);
    }

    return response;

  } catch (error: any) {
    console.error('❌ Queue runner error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function updateRunStatus(supabase: any, runId: string) {
  try {
    const { data: run } = await supabase
      .from('daily_blog_runs')
      .select('blogs_total, blogs_created, blogs_failed')
      .eq('id', runId)
      .single();

    if (!run) return;

    const total = run.blogs_total || 0;
    const created = run.blogs_created || 0;
    const failed = run.blogs_failed || 0;
    const completed = created + failed;

    if (completed >= total && total > 0) {
      const status = created > 0 ? (failed > 0 ? 'partial' : 'completed') : 'failed';
      
      await supabase
        .from('daily_blog_runs')
        .update({ status })
        .eq('id', runId);
      
      console.log(`✅ Run ${runId} marked as ${status}`);
    }
  } catch (error) {
    console.error('Error updating run status:', error);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
