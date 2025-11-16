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
    console.log('Checking webhook status...');
    
    const webhookUrl = 'https://n8n.itgyani.com/webhook/31abdab0-4859-46e6-8a16-867b79604ff1';
    
    // Make a lightweight GET request to check if webhook is active
    const response = await fetch(webhookUrl, {
      method: 'GET',
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    console.log('Webhook test response:', {
      status: response.status,
      statusText: response.statusText,
    });

    // If we get a 200 response, the webhook is active
    const isLive = response.ok;
    
    return new Response(
      JSON.stringify({
        isLive,
        status: isLive ? 'live' : 'test_mode',
        message: isLive 
          ? 'Webhook is active and ready to receive requests' 
          : 'Webhook is not active. Running in test mode.',
        checkedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error checking webhook status:', error);
    
    // If there's any error (network, timeout, etc), assume test mode
    return new Response(
      JSON.stringify({
        isLive: false,
        status: 'test_mode',
        message: `Unable to reach webhook: ${error.message}. Running in test mode.`,
        checkedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
