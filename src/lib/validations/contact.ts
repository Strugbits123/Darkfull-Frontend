import { z } from "zod"

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[1-9][\d\s\-\(\)]{7,15}$/, "Please enter a valid phone number"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .min(1, "Please select a message subject"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactSchema>
