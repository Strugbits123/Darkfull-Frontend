import { z } from "zod"

export const contractSchema = z.object({
  // Basic Contract Info (Sender Info)
  senderName: z.string().min(2, "Full name must be at least 2 characters"),
  senderEmail: z.string().email("Please enter a valid email address"),
  senderPhone: z.string().min(10, "Please enter a valid phone number"),
  senderAddress: z.string().min(5, "Please enter a valid address"),
  senderWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  senderIndustry: z.string().min(1, "Please select an industry"),
  contractType: z.enum(["negotiable", "non-negotiable"], {
    required_error: "Please select a contract type",
  }),
  senderLogo: z.string().optional(),

  // Job Details (Receiver Info)
  receiverName: z.string().min(2, "Receiver name must be at least 2 characters"),
  receiverEmail: z.string().email("Please enter a valid email address"),
  receiverPhone: z.string().min(10, "Please enter a valid phone number"),
  receiverAddress: z.string().min(5, "Please enter a valid address"),
  receiverWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  receiverIndustry: z.string().min(1, "Please select an industry"),
  receiverLogo: z.string().optional(),

  // Terms and Conditions
  serviceOffering: z.string().min(1, "Please select a service"),
  serviceDateTime: z.date({
    required_error: "Please select a service date and time",
  }),
  serviceLocation: z.enum(["address", "virtual"], {
    required_error: "Please select a service location type",
  }),
  requireDeposit: z.enum(["yes", "no"], {
    required_error: "Please specify if deposit is required",
  }),
  refundPolicy: z.string().min(10, "Please provide a refund/cancellation policy"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
})

export type ContractFormData = z.infer<typeof contractSchema>
