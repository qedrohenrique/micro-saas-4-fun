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

export const HomeForm = () => {
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);

  const form = useForm<z.infer<typeof homeFormSchema>>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: {
      email: "",
      pictures: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof homeFormSchema>) {
    const portraitId = uuid();

    const infoJson = {
      email: values.email,
    };

    const jsonFile = new File(
      [JSON.stringify(infoJson)],
      "info.json",           
      { type: "application/json" }
    );

    if(selectedPicture) {
      uploadToStorage(`portraits/${portraitId}/image.png`, selectedPicture);
      uploadToStorage(`portraits/${portraitId}/info.json`, jsonFile);
    }
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
              setSelectedPicture={setSelectedPicture}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};
