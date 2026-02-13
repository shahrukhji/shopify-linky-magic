import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SHOPIFY_STORE_DOMAIN = '11nz1t-ex.myshopify.com';
const SHOPIFY_API_VERSION = '2025-01';

interface OrderItem {
  variantId: string;
  quantity: number;
  title: string;
  price: string;
}

interface CODOrderRequest {
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    zip: string;
    country?: string;
  };
  items: OrderItem[];
  note?: string;
  discountCode?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SHOPIFY_ACCESS_TOKEN = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
    if (!SHOPIFY_ACCESS_TOKEN) {
      throw new Error('SHOPIFY_ACCESS_TOKEN is not configured');
    }

    const body: CODOrderRequest = await req.json();
    const { customer, items, note, discountCode } = body;

    // Validate required fields
    if (!customer?.firstName || !customer?.phone || !customer?.address1 || !customer?.city || !customer?.province || !customer?.zip) {
      return new Response(JSON.stringify({ error: 'Missing required customer fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!items?.length) {
      return new Response(JSON.stringify({ error: 'No items in order' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build line items for Shopify Admin API
    const lineItems = items.map(item => ({
      variant_id: parseInt(item.variantId.replace('gid://shopify/ProductVariant/', '')),
      quantity: item.quantity,
    }));

    // Create order via Shopify Admin REST API
    const orderPayload: Record<string, unknown> = {
      order: {
        line_items: lineItems,
        customer: {
          first_name: customer.firstName,
          last_name: customer.lastName || '',
          phone: customer.phone,
          email: customer.email || undefined,
        },
        shipping_address: {
          first_name: customer.firstName,
          last_name: customer.lastName || '',
          address1: customer.address1,
          address2: customer.address2 || '',
          city: customer.city,
          province: customer.province,
          zip: customer.zip,
          country: customer.country || 'India',
          phone: customer.phone,
        },
        billing_address: {
          first_name: customer.firstName,
          last_name: customer.lastName || '',
          address1: customer.address1,
          address2: customer.address2 || '',
          city: customer.city,
          province: customer.province,
          zip: customer.zip,
          country: customer.country || 'India',
          phone: customer.phone,
        },
        financial_status: 'pending',
        note: note || 'COD Order via Reelcraft.store',
        tags: 'COD, Website-Direct',
        send_receipt: !!customer.email,
        send_fulfillment_receipt: !!customer.email,
        discount_codes: discountCode ? [{ code: discountCode, amount: '0', type: 'percentage' }] : [],
      },
    };

    const shopifyUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/orders.json`;

    const response = await fetch(shopifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Shopify order creation failed:', JSON.stringify(data));
      return new Response(JSON.stringify({ 
        error: 'Failed to create order', 
        details: data.errors || data 
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const order = data.order;

    return new Response(JSON.stringify({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
      orderName: order.name,
      totalPrice: order.total_price,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('COD order error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
