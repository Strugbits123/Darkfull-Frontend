import { LoginForm } from "@/components/auth/sign-in-form"
import Container from "@/components/Container"
import Image from "next/image"

export default function LoginPage() {
  
  
  return (
   <Container>
     <div className="min-h-screen bg-gray-50 flex my-10">
      {/* Left side - Dashboard preview */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-50 to-teal-100 p-12 items-center justify-center">
        <div className="max-w-md text-center">
          {/* Dashboard mockup */}
          <div className="relative mb-8">
            {/* <div className="bg-white rounded-lg shadow-lg p-6 transform rotate-3">
              <div className="h-4 bg-teal-500 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 transform -rotate-6">
              <div className="w-16 h-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded"></div>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-white rounded-lg shadow-lg p-3 transform rotate-12">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div> */}
            <Image
              src="/images/auth/img-1.png"
              alt="Dashboard Mockup"
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Darkful Dashboard</h2>
          <p className="text-gray-600 mb-8">
            Sign in to Darkful by connecting your Saka store. Once connected, your products and orders will sync
            automatically so you can manage inventory, fulfillment, and returns in one place.
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
              <span>Secure login</span>
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
              <span>Secure Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
   </Container>
  )
}
