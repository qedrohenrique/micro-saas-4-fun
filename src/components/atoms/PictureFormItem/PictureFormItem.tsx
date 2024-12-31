import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PictureFormItem = ({ field }: any) => {
  return (
    <FormItem>
      <FormLabel>Fotos</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" {...field} type="file" />
      </FormControl>
      <FormDescription>
        Fotos que você quer no seu retrato.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
}