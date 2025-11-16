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
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;

    if (!description || !imageFile) {
      return new Response(
        JSON.stringify({ error: 'Description and image are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Submitting UGC video request to n8n webhook', {
      descriptionLength: description.length,
      imageFileName: imageFile.name,
      imageSize: imageFile.size,
      imageType: imageFile.type
    });

    // Check webhook status to determine which endpoint to use
    const statusCheck = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/check-webhook-status`,
      {
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        },
      }
    );
    
    const statusData = await statusCheck.json();
    const isLive = statusData.isLive;
    
    // Use test endpoint when not live, production endpoint when live
    const webhookUrl = isLive 
      ? 'https://n8n.itgyani.com/webhook/31abdab0-4859-46e6-8a16-867b79604ff1'
      : 'https://n8n.itgyani.com/webhook-test/31abdab0-4859-46e6-8a16-867b79604ff1';
    
    console.log(`Using ${isLive ? 'LIVE' : 'TEST'} webhook endpoint:`, webhookUrl);

    // Create FormData for the webhook
    const webhookFormData = new FormData();
    webhookFormData.append('description', description);
    
    // Create a Blob from the file data
    const imageBlob = new Blob([await imageFile.arrayBuffer()], { type: imageFile.type });
    webhookFormData.append('image', imageBlob, imageFile.name);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: webhookFormData,
    });

    const responseText = await response.text();
    console.log('n8n webhook response:', {
      status: response.status,
      statusText: response.statusText,
      body: responseText,
      mode: isLive ? 'LIVE' : 'TEST'
    });

    if (!response.ok) {
      console.error('n8n webhook error:', response.status, responseText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to submit video request to n8n',
          details: responseText,
          status: response.status,
          mode: isLive ? 'live' : 'test'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully submitted UGC video request in ${isLive ? 'LIVE' : 'TEST'} mode`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        response: responseText,
        mode: isLive ? 'live' : 'test'
      }),
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
