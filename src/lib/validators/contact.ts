import { z } from "zod";

export const contactTypeEnum = z.enum([
  "partnership",
  "founder",
  "bureau",
  "media",
  "product",
  "general",
]);

export const contactSchema = z.object({
  type: contactTypeEnum,
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
