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
    const formData = await req.formData();
    const description = formData.get('description');
    const image = formData.get('image');

    if (!description || !image) {
      return new Response(
        JSON.stringify({ error: 'Description and image are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Submitting UGC video request to n8n webhook');

    // Forward the request to n8n webhook
    const webhookFormData = new FormData();
    webhookFormData.append('description', description);
    webhookFormData.append('image', image);

    const response = await fetch(
      'https://n8n.itgyani.com/webhook/31abdab0-4859-46e6-8a16-867b79604ff1',
      {
        method: 'POST',
        body: webhookFormData,
      }
    );

    if (!response.ok) {
      console.error('n8n webhook error:', response.status, await response.text());
      return new Response(
        JSON.stringify({ error: 'Failed to submit video request to n8n' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully submitted UGC video request');

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in submit-ugc-video:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
