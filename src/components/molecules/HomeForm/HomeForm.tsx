"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
} from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { EmailFormItem } from "@/components/atoms/EmailFormItem/EmailFormItem";
import homeFormSchema from "@/lib/homeFormSchema";
import { PictureFormItem } from "@/components/atoms/PictureFormItem/PictureFormItem";

export const HomeForm = () => {
  const form = useForm<z.infer<typeof homeFormSchema>>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof homeFormSchema>) {
    console.log(values);
  };

  return (
    <FormProvider  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <EmailFormItem field={field} />
          )}
        />
        <FormField
          control={form.control}
          name="pictures"
          render={({ field }) => (
            <PictureFormItem field={field} />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider >
  );
}