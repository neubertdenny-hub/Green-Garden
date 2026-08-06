import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import BilbeeClient, { calculatePrice } from '@/lib/billbee';
import { sendOfferEmail } from '@/lib/email-resend';

const billbee = new BilbeeClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryId } = body;

    if (!inquiryId) {
      return NextResponse.json(
        { error: 'inquiryId is required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    // 1. Fetch inquiry
    const { data: inquiry, error: fetchError } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .eq('id', inquiryId)
      .single();

    if (fetchError || !inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    if (inquiry.type !== 'offer') {
      return NextResponse.json(
        { error: 'This inquiry is not an offer request' },
        { status: 400 }
      );
    }

    // 2. Check if already sent
    if (inquiry.status === 'offer_sent') {
      return NextResponse.json(
        { error: 'Offer already sent for this inquiry' },
        { status: 400 }
      );
    }

    // 3. Get product from Billbee
    if (!inquiry.product_sku) {
      await updateInquiryStatus(inquiry.id, 'error', 'No product SKU found');
      return NextResponse.json(
        { error: 'No product SKU in inquiry' },
        { status: 400 }
      );
    }

    const product = await billbee.getProductBySku(inquiry.product_sku);

    if (!product) {
      await updateInquiryStatus(inquiry.id, 'error', `Product ${inquiry.product_sku} not found in Billbee`);
      return NextResponse.json(
        { error: 'Product not found in Billbee' },
        { status: 400 }
      );
    }

    // 4. Calculate price
    const { unitPrice, totalPrice, discount, discountPercent } = calculatePrice(
      product,
      inquiry.quantity || 1
    );

    // 5. Create offer record
    const offerId = `OFF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 14);

    const { error: offerError } = await supabaseAdmin
      .from('offers')
      .insert([{
        id: offerId,
        inquiry_id: inquiry.id,
        product_sku: inquiry.product_sku,
        product_name: inquiry.product_name || product.SKU,
        quantity: inquiry.quantity || 1,
        unit_price: unitPrice,
        total_price: totalPrice,
        discount: discount,
        discount_percent: discountPercent,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
        sent_at: new Date().toISOString()
      }]);

    if (offerError) {
      throw new Error(`Offer creation failed: ${offerError.message}`);
    }

    // 6. Send email
    const emailSent = await sendOfferEmail(
      inquiry.customer_email,
      inquiry.customer_name,
      {
        inquiryId: inquiry.id,
        productSku: inquiry.product_sku,
        productName: inquiry.product_name || product.SKU,
        quantity: inquiry.quantity || 1,
        unitPrice,
        totalPrice,
        discount,
        discountPercent,
        expiresAt: expiresAt.toISOString()
      }
    );

    if (!emailSent) {
      throw new Error('Email sending failed');
    }

    // 7. Update inquiry status
    await updateInquiryStatus(inquiry.id, 'offer_sent', null);

    console.log(`✅ Offer manually sent to ${inquiry.customer_email} for ${inquiry.product_name}`);

    return NextResponse.json({
      status: 'success',
      message: 'Offer sent successfully',
      data: {
        inquiryId: inquiry.id,
        email: inquiry.customer_email,
        productSku: inquiry.product_sku,
        quantity: inquiry.quantity,
        totalPrice: totalPrice.toFixed(2)
      }
    });

  } catch (error) {
    console.error('❌ Send offer error:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function updateInquiryStatus(inquiryId: string, status: string, errorMessage: string | null) {
  try {
    await supabaseAdmin
      .from('inquiries')
      .update({
        status,
        updated_at: new Date().toISOString(),
        internal_notes: errorMessage
      })
      .eq('id', inquiryId);
  } catch (error) {
    console.error(`Failed to update inquiry ${inquiryId}:`, error);
  }
}
