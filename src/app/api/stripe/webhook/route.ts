import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.user_id;
    if (userId) {
      await supabase
        .from('profiles')
        .update({
          subscription_plan: 'pro',
          stripe_customer_id: session.customer ?? null,
        })
        .eq('id', userId);
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    await supabase
      .from('profiles')
      .update({ subscription_plan: 'free' })
      .eq('stripe_customer_id', subscription.customer ?? '');
  }

  return NextResponse.json({ received: true });
}
