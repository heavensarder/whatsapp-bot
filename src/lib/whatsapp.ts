import prisma from './prisma';

interface WhatsAppConfig {
  phoneNumberId: string;
  accessToken: string;
}

async function getWhatsAppConfig(): Promise<WhatsAppConfig> {
  const settings = await prisma.settings.findFirst();
  
  const phoneNumberId = settings?.whatsappPhoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || '';
  const accessToken = settings?.permanentAccessToken || process.env.WHATSAPP_ACCESS_TOKEN || '';

  if (!phoneNumberId || !accessToken) {
    throw new Error('WhatsApp API is not configured. Please update settings.');
  }

  return { phoneNumberId, accessToken };
}

export interface SendMessageResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendWhatsAppMessage(
  to: string,
  body: string
): Promise<SendMessageResult> {
  try {
    const config = await getWhatsAppConfig();
    
    const url = `https://graph.facebook.com/v19.0/${config.phoneNumberId}/messages`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: {
          body: body,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('WhatsApp API error:', {
        status: response.status,
        statusText: response.statusText,
        error: data.error,
        to: to,
      });
      return {
        success: false,
        error: data.error?.message || `API error ${response.status}: ${response.statusText}`,
      };
    }

    return {
      success: true,
      messageId: data.messages?.[0]?.id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function sendBulkMessages(
  contacts: { id: number; phoneNumber: string }[],
  message: string,
  delayMs: number = 1000
): Promise<{ contactId: number; result: SendMessageResult }[]> {
  const results: { contactId: number; result: SendMessageResult }[] = [];

  for (const contact of contacts) {
    const result = await sendWhatsAppMessage(contact.phoneNumber, message);
    results.push({ contactId: contact.id, result });
    
    // Delay between messages to respect rate limits
    if (contacts.indexOf(contact) < contacts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return results;
}
