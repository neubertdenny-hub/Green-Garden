import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import BilbeeClient, { calculatePrice } from '@/lib/billbee';
import { sendOfferEmail } from '@/lib/email-resend';

const billbee = new BilbeeClient();

export async function GET(request: NextRequest) {
  try {
    // Verify Cron Secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    // 1. Fetch all pending offer inquiries
    const { data: inquiries, error } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .eq('type', 'offer')
      .eq('status', 'new')
      .order('created_at', { ascending: true })
      .limit(50);

    if (error) {
      console.error('❌ Failed to fetch inquiries:', error);
      return NextResponse.json(
        { error: 'Failed to fetch inquiries', details: error.message },
        { status: 500 }
      );
    }

    if (!inquiries || inquiries.length === 0) {
      return NextResponse.json({
        status: 'success',
        message: 'No pending offer inquiries',
        processed: 0
      });
    }

    console.log(`📋 Processing ${inquiries.length} pending offer inquiries...`);

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    // 2. Process each inquiry
    for (const inquiry of inquiries) {
      try {
        // Skip if product SKU is missing
        if (!inquiry.product_sku) {
          console.warn(`⚠️ Inquiry ${inquiry.id} has no product SKU`);
          await updateInquiryStatus(inquiry.id, 'error', 'No product SKU found');
          errorCount++;
          continue;
        }

        // Get product from Billbee
        const product = await billbee.getProductBySku(inquiry.product_sku);

        if (!product) {
          console.warn(`⚠️ Product ${inquiry.product_sku} not found in Billbee`);
          await updateInquiryStatus(inquiry.id, 'error', `Product ${inquiry.product_sku} not found`);
          errorCount++;
          continue;
        }

        // Calculate price
        const { unitPrice, totalPrice, discount, discountPercent } = calculatePrice(
          product,
          inquiry.quantity || 1
        );

        // Create offer record
        const offerId = `OFF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 14); // 14 days validity

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

        // Send offer email via Resend
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

        // Update inquiry status to offer_sent
        await updateInquiryStatus(inquiry.id, 'offer_sent', null);

        console.log(`✅ Offer sent to ${inquiry.customer_email} for ${inquiry.product_name} (${inquiry.quantity}x)`);

        results.push({
          inquiryId: inquiry.id,
          status: 'success',
          email: inquiry.customer_email,
          productSku: inquiry.product_sku,
          quantity: inquiry.quantity,
          totalPrice: totalPrice.toFixed(2)
        });

        successCount++;
      } catch (inquiryError) {
        console.error(`❌ Error processing inquiry ${inquiry.id}:`, inquiryError);
        await updateInquiryStatus(
          inquiry.id,
          'error',
          inquiryError instanceof Error ? inquiryError.message : 'Unknown error'
        );
        errorCount++;

        results.push({
          inquiryId: inquiry.id,
          status: 'error',
          error: inquiryError instanceof Error ? inquiryError.message : 'Unknown error'
        });
      }
    }

    console.log(`\n📊 Cron Job Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📈 Total Processed: ${inquiries.length}`);

    return NextResponse.json({
      status: 'success',
      message: `Processed ${inquiries.length} inquiries`,
      summary: {
        total: inquiries.length,
        success: successCount,
        errors: errorCount
      },
      results
    });

  } catch (error) {
    console.error('❌ Cron job error:', error);
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

export const dynamic = 'force-dynamic';
