export type ComplaintType = 'offer' | 'complaint' | 'invoice' | 'other';

export function classifyEmail(subject: string, body: string): ComplaintType {
  const combined = `${subject} ${body}`.toLowerCase();

  // Offer detection
  const offerKeywords = [
    'angebot', 'quote', 'preis', 'price', 'kosten', 'cost',
    'anfrage', 'request', 'anforderung', 'sku', 'artikel',
    'menge', 'quantity', 'stück', 'pieces', 'wie viel'
  ];

  if (offerKeywords.some(kw => combined.includes(kw))) {
    return 'offer';
  }

  // Complaint detection
  const complaintKeywords = [
    'beschwerde', 'complaint', 'problem', 'issue', 'reklamation',
    'kaputt', 'broken', 'beschädigt', 'damaged', 'nicht erhalten',
    'not received', 'fehlerhaft', 'defective', 'unzufrieden', 'unhappy'
  ];

  if (complaintKeywords.some(kw => combined.includes(kw))) {
    return 'complaint';
  }

  // Invoice detection
  const invoiceKeywords = [
    'rechnung', 'invoice', 'bezahlung', 'payment', 'überweisung',
    'transfer', 'kontostand', 'statement', 'beleg', 'receipt'
  ];

  if (invoiceKeywords.some(kw => combined.includes(kw))) {
    return 'invoice';
  }

  return 'other';
}

export function generateOfferResponse(
  customerEmail: string,
  productTitle: string,
  quantity: number,
  price: number
): string {
  return `
Hallo,

vielen Dank für Ihre Anfrage zu ${productTitle}.

Menge: ${quantity}
Preis: ${price.toFixed(2)} EUR

Viele Grüße,
GreenGarden Team
  `.trim();
}
