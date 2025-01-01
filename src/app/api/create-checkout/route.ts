import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { subscription } = await req.json();

  const price = subscription
    ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID
    : process.env.STRIPE_PRICE_ID;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      mode: subscription ? "subscription" : "payment",
      payment_method_types: subscription ? ["card"] : ["card", "boleto"],
      success_url: `${req.headers.get("origin")}/`,
      cancel_url: `${req.headers.get("origin")}/`
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}