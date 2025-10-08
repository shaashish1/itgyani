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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { apiKey } = await req.json();

    if (!apiKey || !apiKey.startsWith('sk-')) {
      return new Response(
        JSON.stringify({ error: "Invalid API key format. OpenAI keys start with 'sk-'" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update the secret using Supabase Vault
    const { error } = await supabaseClient.rpc('update_secret', {
      secret_name: 'OPENAI_API_KEY',
      secret_value: apiKey
    });

    if (error) {
      console.error('Error updating secret:', error);
      throw error;
    }

    console.log('OpenAI API key updated successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OpenAI API key updated successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in update-openai-key function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
