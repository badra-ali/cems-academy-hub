import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const META_PHONE_NUMBER_ID = Deno.env.get('META_WHATSAPP_PHONE_NUMBER_ID')?.trim();
const META_ACCESS_TOKEN = Deno.env.get('META_WHATSAPP_ACCESS_TOKEN')?.trim();
const RECIPIENT_WHATSAPP_RAW = Deno.env.get('RECIPIENT_WHATSAPP')?.trim() || '+2250566621095';
const DEFAULT_RECIPIENT = RECIPIENT_WHATSAPP_RAW.replace(/^whatsapp:/, '');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting WhatsApp send function (Meta Business API)');

    if (!META_PHONE_NUMBER_ID || !META_ACCESS_TOKEN) {
      throw new Error('Missing Meta WhatsApp credentials');
    }

    const { message, enrollment, to, language } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    // Determine recipient and clean phone number
    const rawRecipient = (typeof to === 'string' ? to.trim() : undefined) || DEFAULT_RECIPIENT;
    const cleanRecipient = rawRecipient.replace(/^whatsapp:/, '').replace(/\s+/g, '');

    // Language fallback (Meta default hello_world is en_US)
    const langCode = (typeof language === 'string' && language.trim()) || 'en_US';

    // Masked logs for debugging (last 4 digits only)
    console.log('Prepared WhatsApp send', {
      to: cleanRecipient.replace(/\d(?=\d{4})/g, '*'),
      language: langCode,
    });

    console.log('Sending WhatsApp message via Meta Business API');

    // Construct Meta WhatsApp Business API URL
    const metaUrl = `https://graph.facebook.com/v21.0/${META_PHONE_NUMBER_ID}/messages`;

    // 1) Try to open 24h session with a template (hello_world)
    try {
      const templateResponse = await fetch(metaUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${META_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: cleanRecipient,
          type: 'template',
          template: {
            name: 'hello_world',
            language: { code: langCode },
          },
        }),
      });

      const templateData = await templateResponse.json();
      if (!templateResponse.ok) {
        console.warn('Template send failed or not approved:', templateData);
      } else {
        console.log('Template sent successfully:', templateData.messages?.[0]?.id);
      }
    } catch (e) {
      console.warn('Template send threw an exception (continuing to text):', e);
    }

    // 2) Send the actual text message
    const response = await fetch(metaUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: cleanRecipient,
        type: 'text',
        text: {
          body: message,
        },
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Meta API error:', responseData);
      throw new Error(responseData.error?.message || 'Failed to send WhatsApp message');
    }

    console.log('WhatsApp message sent successfully:', responseData.messages?.[0]?.id);

    return new Response(
      JSON.stringify({
        success: true,
        messageId: responseData.messages?.[0]?.id,
        enrollmentId: enrollment?.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in send-whatsapp function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
