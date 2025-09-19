"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authService } from "@/lib/services/auth.service"
import ApiErrorHandler from '@/lib/utils/error-handler'

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      const response = await authService.forgotPassword({ email: data.email })
      if (response.success) {
        toast.success("OTP sent to your email. Please check your inbox.")
        localStorage.setItem("resetEmail", data.email)
        router.push("/verify-email")
      } else {
        toast.error(response.message || "Failed to send OTP.")
      }
    } catch (error: unknown) {
      const msg = ApiErrorHandler.getErrorMessage(error) || "Failed to send OTP."
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
      <CardHeader className="text-center pb-6">
        {/* Darkful Logo */}
        <div className="mx-auto mb-4 w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        <p className="text-gray-600 mt-2">Enter your email to reset your password</p>

        {/* Secure Login Badge */}
        <div className="inline-flex items-center space-x-2 mt-4 px-3 bg-blue-50 text-blue-700 rounded-lg text-sm justify-center py-2">
          <Shield className="w-4 h-4" />
          <span>Secure Reset</span>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Reset Button */}
          <Button type="submit" className="w-full bg-primary hover:bg-slate-900" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 12.027 5.555 8.835z"
                    clipRule="evenodd"
                  />
                </svg>
                Send Reset Link
              </>
            )}
          </Button>

          {/* Back to Login */}
          <div className="text-center">
            <Link href="/login" className="inline-flex items-center text-sm text-primary hover:text-blue-800">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <button className="hover:text-gray-700">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-gray-700">Terms of Service</button>
            <span>•</span>
            <button className="hover:text-gray-700">Help Center</button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
