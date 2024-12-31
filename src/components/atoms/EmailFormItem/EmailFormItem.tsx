import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EmailFormItem = ({ field }: any) => {
  return (
    <FormItem>
      <FormLabel>E-mail</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" {...field} />
      </FormControl>
      <FormDescription>
        E-mail para contato.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
}