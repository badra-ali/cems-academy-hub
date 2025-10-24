import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID')?.trim();
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')?.trim();
const TWILIO_WHATSAPP_NUMBER_RAW = Deno.env.get('TWILIO_WHATSAPP_NUMBER')?.trim();
const TWILIO_WHATSAPP_NUMBER = TWILIO_WHATSAPP_NUMBER_RAW
  ? (TWILIO_WHATSAPP_NUMBER_RAW.startsWith('whatsapp:')
      ? TWILIO_WHATSAPP_NUMBER_RAW
      : `whatsapp:${TWILIO_WHATSAPP_NUMBER_RAW}`)
  : undefined;
const RECIPIENT_WHATSAPP_RAW = Deno.env.get('RECIPIENT_WHATSAPP')?.trim() || '+2250566621095';
const RECIPIENT_WHATSAPP = RECIPIENT_WHATSAPP_RAW.startsWith('whatsapp:') ? RECIPIENT_WHATSAPP_RAW : `whatsapp:${RECIPIENT_WHATSAPP_RAW}`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting WhatsApp send function');

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
      throw new Error('Missing Twilio credentials');
    }

    const { message, enrollment, to } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    console.log('Sending WhatsApp message via Twilio');

    // Construct Twilio API URL
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

    // Create Basic Auth header
    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

    // Determine recipient (prefer body.to, fallback to secret/default)
    const toClean = (typeof to === 'string' ? to.trim() : undefined) || RECIPIENT_WHATSAPP;
    const TO_WHATSAPP = toClean?.startsWith('whatsapp:') ? toClean : `whatsapp:${toClean}`;

    // Masked logs for debugging (last 4 digits only)
    console.log('Prepared WhatsApp send', {
      from: TWILIO_WHATSAPP_NUMBER?.replace(/\d(?=\d{4})/g, '*'),
      to: TO_WHATSAPP?.replace(/\d(?=\d{4})/g, '*'),
    });

    // Send message via Twilio
    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: TWILIO_WHATSAPP_NUMBER,
        To: TO_WHATSAPP,
        Body: message,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Twilio API error:', responseData);
      throw new Error(responseData.message || 'Failed to send WhatsApp message');
    }

    console.log('WhatsApp message sent successfully:', responseData.sid);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageSid: responseData.sid,
        enrollmentId: enrollment?.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in send-whatsapp function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
