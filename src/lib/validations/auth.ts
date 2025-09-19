import { z } from "zod"

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (value) => {
        // Check if it's a valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
      },
      {
        message: "Please enter a valid email address",
      },
    ),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
})

export const signUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required").min(3, "Full name must be at least 3 characters"),
  username: z.string().min(1, "Username is required").min(3, "Username must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  type: z.enum(["sender", "receiver"], {
    required_error: "Please select account type",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
