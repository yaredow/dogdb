import { z } from "zod";

export const ContactUsFromSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message cannot exceed 500 characters"),
});

export type ContactUsFromData = z.infer<typeof ContactUsFromSchema>;
