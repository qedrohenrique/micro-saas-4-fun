import { z } from "zod";

const PICTURES_EXTENSIONS = ["png", "jpg", "jpeg"];

const homeFormSchema = z.object({
  email: z.string().min(2).max(50),
  pictures: z.string().refine((filepath) => PICTURES_EXTENSIONS.includes(filepath.split(".").pop() ?? "")),
});

export default homeFormSchema;