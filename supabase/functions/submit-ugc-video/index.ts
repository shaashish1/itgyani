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

    // For testing: Log the data instead of calling the external webhook
    // Uncomment the lines below to use the actual n8n webhook when it's active
    
    console.log('UGC Video Request Data:', {
      description: description,
      imageFileName: imageFile.name,
      imageSize: imageFile.size,
      imageType: imageFile.type
    });

    // Mock successful response for testing
    const mockResponse = {
      success: true,
      message: "Video request received successfully",
      data: {
        description: description,
        image: imageFile.name
      }
    };

    /* 
    // Uncomment this block when n8n webhook is active:
    
    const response = await fetch(
      'https://n8n.itgyani.com/webhook/31abdab0-4859-46e6-8a16-867b79604ff1',
      {
        method: 'POST',
        body: webhookFormData,
      }
    );

    const responseText = await response.text();
    console.log('n8n webhook response:', {
      status: response.status,
      statusText: response.statusText,
      body: responseText
    });

    if (!response.ok) {
      console.error('n8n webhook error:', response.status, responseText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to submit video request to n8n',
          details: responseText,
          status: response.status
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    */

    console.log('Successfully processed UGC video request');

    return new Response(
      JSON.stringify(mockResponse),
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
