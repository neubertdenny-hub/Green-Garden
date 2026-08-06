import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendEmailViaResend({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!resend) {
    console.error('❌ Resend API key not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resend.emails.send({
      from: 'GreenGarden <noreply@greengarden.de>',
      to,
      subject,
      html,
      reply_to: replyTo || 'info@greengarden.de',
    });

    if (result.error) {
      console.error('❌ Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log(`✅ Email sent via Resend to ${to}: ${result.data?.id}`);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('❌ Error sending email via Resend:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendOfferEmail(
  to: string,
  customerName: string,
  offerData: {
    inquiryId: string;
    productSku: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    discount: number;
    discountPercent: number;
    expiresAt: string;
  }
): Promise<boolean> {
  const expiresDate = new Date(offerData.expiresAt).toLocaleDateString('de-DE');

  const offerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 24px;">Ihr Angebot</h2>
      </div>

      <div style="background: white; padding: 40px 20px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="margin: 0 0 20px 0; font-size: 16px;">
          Hallo <strong>${customerName}</strong>,
        </p>

        <p style="margin: 0 0 20px 0; font-size: 15px; color: #4b5563;">
          vielen Dank für Ihre Anfrage! Anbei erhalten Sie unser aktuelles Angebot für Ihren gewünschten Artikel.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <tr style="background: #f3f4f6;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; font-size: 14px;">Artikel</td>
            <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">${offerData.productName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; font-size: 14px;">SKU</td>
            <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">${offerData.productSku}</td>
          </tr>
          <tr style="background: #f3f4f6;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; font-size: 14px;">Menge</td>
            <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">${offerData.quantity} Stück</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; font-size: 14px;">Einzelpreis</td>
            <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px;">${offerData.unitPrice.toFixed(2)} EUR</td>
          </tr>
          ${offerData.discount > 0 ? `
          <tr style="background: #e8f5e9;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; font-size: 14px; color: #2e7d32;">Rabatt (${offerData.discountPercent.toFixed(0)}%)</td>
            <td style="padding: 12px; border: 1px solid #ddd; font-size: 14px; color: #2e7d32;">-${offerData.discount.toFixed(2)} EUR</td>
          </tr>
          ` : ''}
          <tr style="background: #fff3cd; font-weight: bold;">
            <td style="padding: 12px; border: 1px solid #ffc107; font-size: 16px;">Gesamtpreis</td>
            <td style="padding: 12px; border: 1px solid #ffc107; font-size: 16px; color: #d32f2f;">${offerData.totalPrice.toFixed(2)} EUR</td>
          </tr>
        </table>

        <div style="background: #e3f2fd; border-left: 4px solid #1976d2; padding: 16px; margin: 24px 0; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #0d47a1;">Gültig bis:</p>
          <p style="margin: 0; font-size: 14px; color: #1565c0;">${expiresDate}</p>
        </div>

        <p style="margin: 0 0 20px 0; font-size: 15px; color: #4b5563;">
          Wenn Sie dieses Angebot annehmen möchten, antworten Sie bitte auf diese Email oder kontaktieren Sie uns direkt.
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="mailto:info@greengarden.de?subject=Angebotsannahme%20-%20${offerData.inquiryId}" style="background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
            Angebot annehmen
          </a>
        </div>

        <p style="margin: 0; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          Mit freundlichen Grüßen,<br/>
          <strong>GreenGarden Team</strong><br/>
          info@greengarden.de
        </p>
      </div>

      <div style="background: #f9fafb; padding: 16px 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px;">
        © 2026 GreenGarden GmbH. Alle Rechte vorbehalten.
      </div>
    </div>
  `;

  const result = await sendEmailViaResend({
    to,
    subject: `Angebot: ${offerData.productName} - ${offerData.quantity} Stück`,
    html: offerHtml,
    replyTo: 'info@greengarden.de',
  });

  return result.success;
}

export async function sendAutoResponseViaResend(inquiry: any): Promise<boolean> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 24px;">Anfrage erhalten ✓</h2>
      </div>

      <div style="background: white; padding: 40px 20px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="margin: 0 0 20px 0; font-size: 16px;">
          Hallo <strong>${inquiry.customerName}</strong>,
        </p>

        <p style="margin: 0 0 20px 0; font-size: 15px; color: #4b5563;">
          vielen Dank für Ihre Anfrage zu GreenGarden! Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich mit Ihnen in Verbindung setzen.
        </p>

        <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin: 24px 0; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">Ihre Anfrage-Nummer:</p>
          <p style="margin: 0; font-size: 16px; font-weight: bold; color: #10b981; font-family: 'Courier New', monospace;">
            ${inquiry.id}
          </p>
        </div>

        <p style="margin: 0 0 20px 0; font-size: 15px; color: #4b5563;">
          Nutzen Sie diese Nummer, um den Status Ihrer Anfrage zu verfolgen.
        </p>

        <div style="background: #f3f4f6; padding: 16px; margin: 24px 0; border-radius: 4px; border-left: 4px solid #3b82f6;">
          <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #1f2937;">Kontaktieren Sie uns:</p>
          <p style="margin: 0; font-size: 14px; color: #4b5563;">
            📧 info@greengarden.de<br/>
            📞 +49 123 456789<br/>
            🕒 Mo-Fr 09:00 - 17:00 Uhr
          </p>
        </div>

        <p style="margin: 0; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          Mit freundlichen Grüßen,<br/>
          <strong>GreenGarden Team</strong>
        </p>
      </div>

      <div style="background: #f9fafb; padding: 16px 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px;">
        © 2026 GreenGarden GmbH. Alle Rechte vorbehalten.
      </div>
    </div>
  `;

  const result = await sendEmailViaResend({
    to: inquiry.customerEmail,
    subject: `Wir haben Ihre Anfrage erhalten - ${inquiry.id}`,
    html,
  });

  return result.success;
}
