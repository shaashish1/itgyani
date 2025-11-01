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
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🔄 Processing blog queue...');

    // Get pending items (limit 2 per run to avoid timeouts)
    const { data: queueItems, error: queueError } = await supabase
      .from('blog_generation_queue')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(2);

    if (queueError) throw queueError;

    if (!queueItems || queueItems.length === 0) {
      console.log('📭 Queue is empty');
      return new Response(
        JSON.stringify({ message: 'Queue is empty', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📝 Found ${queueItems.length} items to process`);

    const results = {
      processed: 0,
      successful: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Process each item
    for (const item of queueItems) {
      try {
        console.log(`Processing: ${item.topic.title}`);
        
        // Call process-single-blog function
        const { data, error } = await supabase.functions.invoke('process-single-blog', {
          body: { queueItemId: item.id }
        });

        if (error) {
          console.error(`Failed to process ${item.id}:`, error);
          results.failed++;
          results.errors.push(`${item.topic.title}: ${error.message}`);
          
          // Update run stats - increment failed count
          const { data: run } = await supabase
            .from('daily_blog_runs')
            .select('blogs_failed')
            .eq('id', item.run_id)
            .single();
          
          if (run) {
            await supabase
              .from('daily_blog_runs')
              .update({ blogs_failed: (run.blogs_failed || 0) + 1 })
              .eq('id', item.run_id);
          }
        } else {
          console.log(`✅ Successfully processed: ${item.topic.title}`);
          results.successful++;
          
          // Update run stats - increment created count
          const { data: run } = await supabase
            .from('daily_blog_runs')
            .select('blogs_created')
            .eq('id', item.run_id)
            .single();
          
          if (run) {
            await supabase
              .from('daily_blog_runs')
              .update({ blogs_created: (run.blogs_created || 0) + 1 })
              .eq('id', item.run_id);
          }
        }

        results.processed++;

        // Add delay between items to respect rate limits (60 seconds)
        if (queueItems.indexOf(item) < queueItems.length - 1) {
          console.log('⏱️ Waiting 60 seconds before next blog...');
          await new Promise(resolve => setTimeout(resolve, 60000));
        }

      } catch (error: any) {
        console.error(`Error processing item ${item.id}:`, error);
        results.failed++;
        results.errors.push(error.message);
      }
    }

    // Check if any runs are complete
    const { data: runs } = await supabase
      .from('daily_blog_runs')
      .select('id, blogs_total, blogs_created, blogs_failed')
      .eq('status', 'running');

    if (runs) {
      for (const run of runs) {
        const total = run.blogs_total || 0;
        const completed = (run.blogs_created || 0) + (run.blogs_failed || 0);
        
        if (completed >= total && total > 0) {
          const status = run.blogs_created > 0 ? 
            (run.blogs_failed > 0 ? 'partial' : 'completed') : 
            'failed';
          
          await supabase
            .from('daily_blog_runs')
            .update({ status })
            .eq('id', run.id);
          
          console.log(`✅ Run ${run.id} marked as ${status}`);
        }
      }
    }

    console.log('📊 Queue processing complete:', results);

    return new Response(
      JSON.stringify(results),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in process-blog-queue:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
