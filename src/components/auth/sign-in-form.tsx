"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, EyeOff, Shield } from "lucide-react"
import Link from "next/link"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean()
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const rememberMe = watch("rememberMe")

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Login data:", data)
    setIsLoading(false)
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

        <h1 className="text-2xl font-bold text-gray-900">Darkful</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>

        {/* Secure Login Badge */}
        <div className="inline-flex items-center space-x-2 mt-4 px-3  bg-blue-50 text-blue-700 rounded-lg text-sm justify-center py-2">
          <Shield className="w-4 h-4" />
          <span>Secure Login</span>
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

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={errors.password ? "border-red-500 pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me for 30 days
              </Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-primary hover:text-blue-800">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full bg-primary hover:bg-slate-900" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Login to Dashboard
              </>
            )}
          </Button>

          {/* Learn More Link */}
          <div className="text-center">
            <button type="button" className="text-sm text-primary hover:text-blue-800">
              Learn what <strong>Darkful</strong> Do For you
            </button>
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
