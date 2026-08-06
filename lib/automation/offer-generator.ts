import BilbeeClient from '@/lib/billbee';
import { Inquiry, OfferData } from '@/lib/types/inquiry';

const billbee = new BilbeeClient();

/**
 * Generate offer from inquiry using Billbee prices
 */
export async function generateOfferFromInquiry(inquiry: Inquiry): Promise<OfferData | null> {
  try {
    // Only generate offers for offer inquiries
    if (inquiry.type !== 'offer') {
      console.log(`Inquiry ${inquiry.id} is not an offer request`);
      return null;
    }

    // Need product SKU
    if (!inquiry.productSku) {
      console.log(`No product SKU found in inquiry ${inquiry.id}`);
      return null;
    }

    // Get product from Billbee
    const product = await billbee.getProductBySku(inquiry.productSku);
    if (!product) {
      console.log(`Product ${inquiry.productSku} not found in Billbee`);
      return null;
    }

    // Use inquiry quantity or default to 1
    const quantity = inquiry.quantity || 1;

    // Calculate prices (simulate Billbee pricing)
    const unitPrice = product.Price || 10;
    const discount = quantity >= 15 ? (unitPrice * 0.1) : 0;
    const finalUnitPrice = unitPrice - (discount / quantity);
    const totalPrice = finalUnitPrice * quantity;

    const offerData: OfferData = {
      inquiryId: inquiry.id,
      productSku: product.SKU,
      productName: product.Title?.[0]?.Text || product.SKU,
      quantity,
      unitPrice,
      totalPrice,
      discount,
      expiresIn: 14 // 2 weeks
    };

    console.log(`✅ Offer generated for ${inquiry.customerEmail}:`, offerData);
    return offerData;

  } catch (error) {
    console.error(`❌ Error generating offer for inquiry ${inquiry.id}:`, error);
    return null;
  }
}

/**
 * Generate HTML email for offer
 */
export function generateOfferEmailHtml(inquiry: Inquiry, offer: OfferData): string {
  const expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + offer.expiresIn);

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px;">
      <h2 style="color: #10b981;">Hallo ${inquiry.customerName},</h2>

      <p>vielen Dank für Ihre Anfrage zu <strong>${offer.productName}</strong>.</p>

      <h3 style="margin-top: 30px; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Ihr Angebot</h3>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f9fafb;">
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Artikel</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${offer.productName}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>SKU</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${offer.productSku}</td>
        </tr>
        <tr style="background: #f9fafb;">
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Menge</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${offer.quantity} Stück</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Einzelpreis</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>€${offer.unitPrice.toFixed(2)}</strong></td>
        </tr>
        ${offer.discount > 0 ? `
        <tr style="background: #ecfdf5;">
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Rabatt (${Math.round((offer.discount / offer.quantity / offer.unitPrice) * 100)}%)</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong style="color: #10b981;">-€${offer.discount.toFixed(2)}</strong></td>
        </tr>
        ` : ''}
        <tr style="background: #fef3c7;">
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Gesamtpreis</strong></td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong style="font-size: 18px; color: #10b981;">€${offer.totalPrice.toFixed(2)}</strong></td>
        </tr>
      </table>

      <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
        <strong style="color: #10b981;">✅ Gültig bis:</strong>
        <p style="margin: 5px 0 0 0; color: #4b5563;">${expiresDate.toLocaleDateString('de-DE')}</p>
      </div>

      <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
        <strong style="color: #1e40af;">Nächster Schritt:</strong>
        <p style="margin: 5px 0 0 0; color: #4b5563;">
          Wenn Ihnen dieses Angebot gefällt, antworten Sie einfach auf diese Email oder kontaktieren Sie uns unter <strong>info@greengarden.de</strong>.
        </p>
      </div>

      <div style="color: #6b7280; font-size: 12px; margin-top: 30px;">
        <p>Mit freundlichen Grüßen,</p>
        <p><strong>GreenGarden Team</strong></p>
        <p>📧 info@greengarden.de | 📞 +49 123 456789</p>
      </div>
    </div>
  `;
}
