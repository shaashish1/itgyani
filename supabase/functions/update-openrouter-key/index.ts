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

    // Validate API key format (OpenRouter keys typically start with 'sk-or-')
    if (!apiKey.startsWith('sk-or-')) {
      return new Response(
        JSON.stringify({ error: 'Invalid OpenRouter API key format. Keys should start with "sk-or-"' }),
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

    // Test the API key with a simple request using a paid model
    console.log('Testing OpenRouter API key...');
    const testResponse = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://itgyani.com',
          'X-Title': 'IT Gyani Blog Generator'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-5-haiku-20241022',
          messages: [
            { role: 'user', content: 'Respond with OK' }
          ],
          max_tokens: 10
        }),
      }
    );

    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error('API key validation failed:', errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API key. Please check your OpenRouter API key and try again.',
          details: testResponse.status === 401 ? 'Authentication failed' : 'Invalid request'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('API key validated successfully');

    // Update the secret in Supabase
    const { error: secretError } = await supabaseClient
      .from('vault.secrets')
      .upsert({
        name: 'OPENROUTER_API_KEY',
        secret: apiKey
      });

    if (secretError) {
      console.error('Error updating secret:', secretError);
      // Try alternative method using vault.update_secret if available
      console.log('Attempting to update secret using RPC...');
      
      const { error: rpcError } = await supabaseClient.rpc('update_secret', {
        secret_name: 'OPENROUTER_API_KEY',
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
        message: 'OpenRouter API key updated successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in update-openrouter-key function:', error);
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
