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
