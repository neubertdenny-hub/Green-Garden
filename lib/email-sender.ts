import nodemailer from 'nodemailer';

let transporter: any = null;

export async function getEmailTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify connection
    try {
      await transporter.verify();
      console.log('✅ Email service connected');
    } catch (error) {
      console.error('❌ Email service error:', error);
      transporter = null;
      throw error;
    }
  }

  return transporter;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}): Promise<boolean> {
  try {
    const mailer = await getEmailTransporter();

    const info = await mailer.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM}>`,
      to,
      subject,
      text: text || html?.replace(/<[^>]*>/g, ''),
      html,
    });

    console.log(`✅ Email sent to ${to}:`, info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
}

export async function sendAutoResponseEmail(inquiry: any): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px;">
      <h2 style="color: #10b981;">Hallo ${inquiry.customerName},</h2>

      <p>vielen Dank für Ihre Anfrage zu GreenGarden!</p>

      <p>Wir haben Ihre Nachricht zum Thema <strong>"${inquiry.subject}"</strong> erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>

      <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
        <strong style="color: #10b981;">Ihre Anfrage-Nummer:</strong>
        <p style="margin: 5px 0 0 0; color: #4b5563; font-family: monospace;">${inquiry.id}</p>
      </div>

      <p>Sie können diese Nummer verwenden, um den Status Ihrer Anfrage zu verfolgen.</p>

      <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
        Mit freundlichen Grüßen,<br/>
        <strong>GreenGarden Team</strong><br/>
        📧 info@greengarden.de | 📞 +49 123 456789
      </p>
    </div>
  `;

  return sendEmail({
    to: inquiry.customerEmail,
    subject: `Wir haben Ihre Anfrage erhalten - ${inquiry.id}`,
    html
  });
}
