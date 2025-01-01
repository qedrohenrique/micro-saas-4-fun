"use client";

import { HomeForm } from "@/components/molecules/HomeForm/HomeForm";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

export default function Home() {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  async function handleClick() {
    try {
      setIsCreatingCheckout(true);
      const checkoutResponse = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const stripeClient = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );

      if (!stripeClient) throw new Error("Stripe failed to initialize.");

      const { sessionId } = await checkoutResponse.json();
      await stripeClient.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingCheckout(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <HomeForm />
        <Button onClick={() => handleClick()} disabled={isCreatingCheckout}>Comprar</Button>
      </div>
    </>
  );
}
