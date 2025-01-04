"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFormItem } from "@/components/atoms/EmailFormItem/EmailFormItem";
import homeFormSchema from "@/lib/homeFormSchema";
import { PictureFormItem } from "@/components/atoms/PictureFormItem/PictureFormItem";
import { v4 as uuid } from "uuid";
import { uploadToStorage } from "@/lib/firebase/firebase";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import QRCode from 'qrcode';

export const HomeForm = () => {
  const [selectedPictures, setSelectedPictures] = useState<FileList | null>(null);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  const form = useForm<z.infer<typeof homeFormSchema>>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: {
      email: "",
      pictures: [],
    },
  });

  async function generateQrCode(uuid: string) {
    const currentUrl = `${window.location.origin}`;
    const urlWithUuid = `${currentUrl}/portrait/${uuid}`;
  
    const base64Image = await QRCode.toDataURL(urlWithUuid, {
      width: 256,
    });

    return base64Image;
  }

  async function createCheckout(portraitId: string) {
    try {
      setIsCreatingCheckout(true);
      const checkoutResponse = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ portraitId }),
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

  async function onSubmit(values: z.infer<typeof homeFormSchema>) {
    if(!selectedPictures) {
      console.log(selectedPictures);
      return;
    }

    const portraitId = uuid();
    const qrCode = await generateQrCode(portraitId);

    const infoJson = {
      email: values.email,
      qrCode: qrCode,
    };

    const jsonFile = new File(
      [JSON.stringify(infoJson)],
      "info.json",           
      { type: "application/json" }
    );

    [...selectedPictures].forEach((picture, idx) => uploadToStorage(`portraits/${portraitId}/images/image-${idx}.png`, picture));
    uploadToStorage(`portraits/${portraitId}/info.json`, jsonFile);
    createCheckout(portraitId);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <EmailFormItem field={field} />}
        />
        <FormField
          control={form.control}
          name="pictures"
          render={({ field }) => (
            <PictureFormItem
              field={field}
              setSelectedPictures={setSelectedPictures}
            />
          )}
        />
        <Button type="submit" disabled={isCreatingCheckout}>Submit</Button>
      </form>
    </FormProvider>
  );
};
