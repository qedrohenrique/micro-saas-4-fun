import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PictureFormItem = ({ field, setSelectedPictures }: any) => {
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
            setSelectedPictures(e?.target?.files);
            onChange(e);
          }}
          multiple
        />
      </FormControl>
      <FormDescription>
        Fotos que você quer no seu retrato.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
}