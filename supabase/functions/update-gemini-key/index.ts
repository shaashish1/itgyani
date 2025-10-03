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
    const { apiKey } = await req.json();

    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid API key provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate API key format (Gemini keys typically start with 'AI')
    if (!apiKey.startsWith('AI')) {
      return new Response(
        JSON.stringify({ error: 'Invalid Gemini API key format. Keys should start with "AI"' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Test the API key with a simple request
    console.log('Testing Gemini API key...');
    const testResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Say "API key is valid" if you can read this.'
            }]
          }]
        }),
      }
    );

    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error('API key validation failed:', errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API key. Please check your Gemini API key and try again.',
          details: testResponse.status === 400 ? 'Invalid key format' : 'Authentication failed'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('API key validated successfully');

    // Update the secret in Supabase
    // Note: This requires the SUPABASE_SERVICE_ROLE_KEY to have appropriate permissions
    const { error: secretError } = await supabaseClient
      .from('vault.secrets')
      .upsert({
        name: 'GEMINI_API_KEY',
        secret: apiKey
      });

    if (secretError) {
      console.error('Error updating secret:', secretError);
      // Try alternative method using vault.update_secret if available
      console.log('Attempting to update secret using RPC...');
      
      const { error: rpcError } = await supabaseClient.rpc('update_secret', {
        secret_name: 'GEMINI_API_KEY',
        secret_value: apiKey
      });

      if (rpcError) {
        console.error('RPC error:', rpcError);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to store API key securely',
            message: 'Please contact administrator'
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    console.log('API key updated successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Gemini API key updated successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in update-gemini-key function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: 'Failed to update API key'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
