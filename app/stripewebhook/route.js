import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { Converter } from "easy-currencies";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const converter = new Converter();

export async function POST(req) {
  const rawBody = await req.text();
  const headersList = await headers();
  const stripeSignature = headersList.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSignature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or secret" },
      { status: 400 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature,
      webhookSecret
    );
  } catch (error) {
    console.error("⚠️ Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const order = await createOrderInSanity(session);
      console.log("✅ Order saved:", order);
      return NextResponse.json({ received: true });
    } catch (error) {
      console.error("⚠️ Sanity Error: Failed making an order ", error);
      return NextResponse.json(
        { error: `Sanity Error: ${error.message}` },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

async function createOrderInSanity(session) {
  const { id, amount_total, currency, metadata, payment_intent, customer } =
    session;

  const { orderNumber, customerName, customerEmail, clerkUserId } = metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => {
    const productId = item.price.product?.metadata.id;

    return {
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId, // This is the Stripe product id
      },
      quantity: item.quantity || 0,
    };
  });

  const value = await converter.convert(1, "USD", "ZAR");
  console.log("value", value);

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId,
    email: customerEmail,
    currency,
    products: sanityProducts,
    totalPrice: amount_total ? ((amount_total / 100) * value).toFixed(2) : 0,
    status: "Paid",
    orderDate: new Date().toDateString(),
  });
  return order;
}
