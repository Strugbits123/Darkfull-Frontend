import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import Container from "@/components/Container"
import Image from "next/image"

export default function ForgotPasswordPage() {
  return (
   <Container>
     <div className="min-h-screen bg-gray-50 flex my-10">
      {/* Left side - Dashboard preview */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-50 to-teal-100 p-12 items-center justify-center">
        <div className="max-w-md text-center">
          {/* Dashboard mockup */}
          <div className="relative mb-8">
            <Image
              src="/images/auth/img-1.png"
              alt="Dashboard Mockup"
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reset Your Password</h2>
          <p className="text-gray-600 mb-8">
            Forgot your password? No problem! Just enter your email address and we&apos;ll send you a link to reset it.
            Your account security is our top priority.
          </p>

          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Secure Reset</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Email Protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Forgot Password form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <ForgotPasswordForm />
      </div>
    </div>
   </Container>
  )
}
