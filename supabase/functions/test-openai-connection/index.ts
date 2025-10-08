import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "API key is required" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Test the OpenAI API with a simple completion
    const testResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'user', content: 'Say "Connection successful" in one word.' }
        ],
        max_completion_tokens: 10,
      }),
    });

    if (!testResponse.ok) {
      const errorData = await testResponse.json();
      console.error('OpenAI API Error:', errorData);
      
      let message = 'Failed to connect to OpenAI API';
      if (testResponse.status === 401) {
        message = 'Invalid API key';
      } else if (testResponse.status === 429) {
        message = 'Rate limit exceeded';
      } else if (errorData.error?.message) {
        message = errorData.error.message;
      }

      return new Response(
        JSON.stringify({ 
          success: false, 
          message,
          status: testResponse.status
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await testResponse.json();
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Connection successful! OpenAI API is working.",
        model: data.model,
        response: data.choices[0]?.message?.content
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error testing OpenAI connection:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
