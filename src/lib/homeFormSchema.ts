import { z } from "zod";

const homeFormSchema = z.object({
  email: z.string().min(2).max(50),
  pictures: z.any(),
});

export default homeFormSchema;