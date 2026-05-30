import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^\+?[0-9\s\-()]{7,15}$/, "Please enter a valid phone number.").optional().or(z.literal('')),
  message: z.string().min(10, "Your message must be at least 10 characters."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
