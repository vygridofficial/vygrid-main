import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^\+?[0-9\s\-()]{7,15}$/, "Please enter a valid phone number.").optional().or(z.literal('')),
  service: z.string().min(1, "Please select a strategic service."),
  brief: z.string().min(10, "Your project brief must be at least 10 characters."),
  budget: z.number().min(1000, "Budget must be at least $1,000."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
