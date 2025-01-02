import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { portraitId } = await req.json();
  const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: `${req.headers.get("origin")}/success/${portraitId}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        portraitId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}