import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
}

const supabase = createClient(supabaseUrl!, serviceRoleKey!);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json().catch(() => ({}))) as { timeoutMinutes?: number };
    const timeoutMinutes = body.timeoutMinutes ?? 10;

    const tenMinutesAgoIso = new Date(Date.now() - timeoutMinutes * 60 * 1000).toISOString();

    console.log(`Running stuck-runs cleanup for runs older than ${timeoutMinutes} minutes`);

    // 1) Mark old running runs with no progress as failed
    const { data: timedOutRuns, error: timeoutErr } = await supabase
      .from("daily_blog_runs")
      .update({
        status: "failed",
        error_message: "Generation process timed out or did not complete",
      })
      .eq("status", "running")
      .lt("created_at", tenMinutesAgoIso)
      .eq("blogs_created", 0)
      .eq("blogs_failed", 0)
      .select("id");

    if (timeoutErr) throw timeoutErr;

    // 2) Mark completed runs with 0 results as failed
    const { data: zeroCompletedRuns, error: zeroErr } = await supabase
      .from("daily_blog_runs")
      .update({
        status: "failed",
        error_message: "No blogs were created during this run",
      })
      .eq("status", "completed")
      .eq("blogs_created", 0)
      .eq("blogs_failed", 0)
      .select("id");

    if (zeroErr) throw zeroErr;

    const result = {
      timedOutUpdated: timedOutRuns?.length ?? 0,
      zeroCompletedUpdated: zeroCompletedRuns?.length ?? 0,
    };

    console.log("Cleanup result:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in fix-stuck-daily-blog-runs:", error?.message || error);
    return new Response(JSON.stringify({ error: error?.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});