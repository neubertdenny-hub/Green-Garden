import { NextRequest, NextResponse } from 'next/server';
import { classifyEmail } from '@/lib/email-classifier';
import { Inquiry, InquiryResponse } from '@/lib/types/inquiry';
import { supabaseAdmin, isSupabaseReady } from '@/lib/supabase';
import { sendAutoResponseViaResend } from '@/lib/email-resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, subject, message, source = 'contact_form' } = body;

    // Validation
    if (!customerName || !customerEmail || !subject || !message) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: customerName, customerEmail, subject, message'
      }, { status: 400 });
    }

    // 1. Classify inquiry type
    const classifiedType = classifyEmail(subject, message);

    // 2. Extract product info if present
    const productMatch = message.match(/(?:SKU|Artikel|Product):\s*([A-Z0-9\-]+)/i) ||
                        message.match(/(?:für|für das|zu dem|zum)\s+"([^"]+)"/i);
    const quantityMatch = message.match(/(?:Menge|Stück|qty|quantity):\s*(\d+)/i);

    // 3. Create inquiry object
    const inquiry: Inquiry = {
      id: `INQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerName,
      customerEmail,
      customerPhone,
      type: classifiedType as any,
      status: 'new',
      subject,
      message,
      source: source as any,
      productSku: productMatch?.[1],
      quantity: quantityMatch ? parseInt(quantityMatch[1]) : undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      classificationScore: 0.85, // Default confidence
    };

    // 4. Save to Supabase
    if (isSupabaseReady && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('inquiries')
        .insert([{
          id: inquiry.id,
          customer_name: inquiry.customerName,
          customer_email: inquiry.customerEmail,
          customer_phone: inquiry.customerPhone,
          type: inquiry.type,
          status: inquiry.status,
          subject: inquiry.subject,
          message: inquiry.message,
          source: inquiry.source,
          product_sku: inquiry.productSku,
          product_name: inquiry.productName,
          quantity: inquiry.quantity,
          user_agent: inquiry.userAgent,
          ip_address: inquiry.ipAddress,
          classification_score: inquiry.classificationScore,
        }]);

      if (error) {
        console.error('❌ Supabase insert error:', error);
      } else {
        console.log('✅ Inquiry saved to Supabase:', inquiry.id);
      }
    } else {
      console.warn('⚠️ Supabase not configured, inquiry not persisted');
    }

    // 5. Send auto-response email via Resend
    try {
      await sendAutoResponseViaResend(inquiry);
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
    }

    // 6. Log action
    if (isSupabaseReady && supabaseAdmin) {
      try {
        await supabaseAdmin
          .from('audit_log')
          .insert([{
            inquiry_id: inquiry.id,
            action: 'inquiry_created',
            actor: 'system',
            details: { source, type: classifiedType }
          }]);
      } catch (err) {
        console.error('❌ Audit log error:', err);
      }
    }

    console.log('✅ Inquiry received:', {
      id: inquiry.id,
      type: inquiry.type,
      from: inquiry.customerEmail,
      source: inquiry.source
    });

    const response: InquiryResponse = {
      success: true,
      inquiryId: inquiry.id,
      message: 'Danke für Ihre Anfrage! Wir werden uns in Kürze bei Ihnen melden.',
      classification: {
        type: classifiedType as any,
        confidence: 0.85
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to process inquiry'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Contact form API',
    method: 'Use POST to submit an inquiry'
  });
}
