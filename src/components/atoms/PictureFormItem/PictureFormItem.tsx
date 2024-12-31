import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PictureFormItem = ({ field, setSelectedPicture }: any) => {
  const { onChange } = field;

  return (
    <FormItem>
      <FormLabel>Fotos</FormLabel>
      <FormControl>
        <Input 
          {...field} 
          placeholder="Pictures" 
          type="file"  
          accept="image/*" 
          onChange={(e) => {
            setSelectedPicture(e?.target?.files?.[0]);
            onChange(e);
          }}
        />
      </FormControl>
      <FormDescription>
        Fotos que você quer no seu retrato.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
}