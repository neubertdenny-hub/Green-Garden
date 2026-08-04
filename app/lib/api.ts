const N8N_WEBHOOK = 'https://n8n.greengarden.de/webhook/anfrage';

export interface ContactData {
  type: 'contact';
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

export interface OfferData {
  type: 'offer';
  product: string;
  quantity: number;
  deliveryDate: string;
  email?: string;
  phone?: string;
  timestamp: string;
}

export async function sendToN8N(data: ContactData | OfferData) {
  try {
    const response = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    console.error('n8n webhook error:', error);
    return {
      success: false,
      error: 'Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut.',
    };
  }
}

// Local storage fallback for when webhook is down
export function saveToLocalStorage(
  key: string,
  data: ContactData | OfferData
) {
  try {
    const stored = localStorage.getItem(key) || '[]';
    const arr = JSON.parse(stored);
    arr.push(data);
    localStorage.setItem(key, JSON.stringify(arr));
    return true;
  } catch (error) {
    console.error('localStorage error:', error);
    return false;
  }
}
