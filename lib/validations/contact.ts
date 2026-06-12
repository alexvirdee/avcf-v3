import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name")
    .max(120, "That name looks a little long"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(40, "That phone number looks a little long")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(2, "Please choose a subject")
    .max(200, "Please keep the subject under 200 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(5000, "Please keep your message under 5,000 characters"),
  // Honeypot — humans never see or fill this field.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
