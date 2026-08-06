import { NextRequest, NextResponse } from 'next/server';
import { classifyEmail } from '@/lib/email-classifier';
import { sendEmail } from '@/lib/email-sender';
import BilbeeClient, { calculatePrice } from '@/lib/billbee';

const billbee = new BilbeeClient();

export async function POST(request: NextRequest) {
  try {
    // Verify webhook key
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.EMAIL_WEBHOOK_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { from, subject, text, to } = body;

    // 1. Classify email
    const classification = classifyEmail(subject, text);

    if (classification !== 'offer') {
      return NextResponse.json({
        status: 'skipped',
        reason: `Email classified as ${classification}, not an offer request`
      });
    }

    // 2. Extract product info from email
    const productMatch = text?.match(/SKU:\s*([A-Z0-9\-]+)/i) ||
                         text?.match(/Artikel[nr]?[.:]\s*([A-Z0-9\-]+)/i);

    if (!productMatch) {
      return NextResponse.json({
        status: 'error',
        reason: 'No product SKU found in email'
      });
    }

    const productSku = productMatch[1];

    // 3. Query Billbee API
    const product = await billbee.getProductBySku(productSku);

    if (!product) {
      return NextResponse.json({
        status: 'error',
        reason: `Product with SKU ${productSku} not found in Billbee`
      });
    }

    // 4. Extract quantity from email
    const quantityMatch = text?.match(/(?:Menge|Stück|pcs?)[:\s]+(\d+)/i);
    const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

    // 5. Calculate price
    const { unitPrice, totalPrice, discount } = calculatePrice(product, quantity);

    // 6. Extract product name (Billbee stores it as array)
    const productName = product.Title?.[0]?.Text || product.SKU;

    // 7. Generate offer response
    const offerHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2>Hallo ${from.split('@')[0]},</h2>

      <p>vielen Dank für Ihre Anfrage zu <strong>${productName}</strong>.</p>

      <h3>Angebot-Details:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Artikel</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${productName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>SKU</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${product.SKU}</td>
        </tr>
        <tr style="background: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Menge</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${quantity} Stück</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Einzelpreis</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${unitPrice.toFixed(2)} EUR</td>
        </tr>
        ${discount > 0 ? `
        <tr style="background: #e8f5e9;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Rabatt</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">-${discount.toFixed(2)} EUR</td>
        </tr>
        ` : ''}
        <tr style="background: #fff3cd; font-weight: bold;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Gesamtpreis</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${totalPrice.toFixed(2)} EUR</td>
        </tr>
      </table>

      <p style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-left: 4px solid #4caf50;">
        <strong>Nächster Schritt:</strong> Wenn Sie dieses Angebot annehmen möchten, antworten Sie bitte auf diese Email oder kontaktieren Sie uns unter <strong>info@greengarden.de</strong>.
      </p>

      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        Mit freundlichen Grüßen,<br>
        <strong>GreenGarden Team</strong><br>
        info@greengarden.de
      </p>
    </div>
    `;

    // 8. Send offer email
    const emailSent = await sendEmail({
      to: from,
      subject: `Angebot: ${productName} - ${quantity} Stück`,
      html: offerHtml,
      text: `Angebot für ${productName}: ${quantity}x zu ${totalPrice.toFixed(2)} EUR`,
    });

    if (!emailSent) {
      return NextResponse.json({
        status: 'error',
        reason: 'Failed to send offer email'
      });
    }

    // 9. Log success
    console.log(`✅ Offer sent to ${from} for ${productName} (${quantity}x)`);

    return NextResponse.json({
      status: 'success',
      message: 'Offer created and sent',
      data: {
        productSku,
        productName,
        quantity,
        unitPrice: unitPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        discount: discount > 0 ? discount.toFixed(2) : '0.00',
        inStock: product.StockCurrent > 0,
        sentTo: from,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Offer automation error:', error);
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
