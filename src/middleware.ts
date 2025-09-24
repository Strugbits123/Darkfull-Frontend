// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// /**
//  * Check if token is expired
//  */
// const isTokenExpired = (expiresAt: string): boolean => {
//   if (!expiresAt) return true
//   return new Date(expiresAt) <= new Date()
// }

// /**
//  * Next.js 15 Middleware for Route Protection
//  * Protects authenticated and public routes based on user authentication status
//  */
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // // Get authentication token and expiry from cookies
//   // const accessToken = request.cookies.get('accessToken')?.value
//   // const accessTokenExpiresAt = request.cookies.get('accessTokenExpiresAt')?.value

//   // // Check if token exists and is not expired
//   // const isAuthenticated = !!(accessToken && accessTokenExpiresAt && !isTokenExpired(accessTokenExpiresAt));

//   // // const publicRoutes = [
//   // //   '/',
//   // //   '/how-it-works',
//   // //   '/about-us',
//   // //   '/pricing',
//   // //   '/contact-us'
//   // // ]

//   // // Define protected routes (require authentication)
//   // const protectedRoutes = [
//   //   '/dashboard',
//   //   '/dashboard/sender',
//   //   '/dashboard/receiver',
//   //   '/admin',
//   //   '/director',
//   //   '/manager',
//   //   '/worker',
//   // ]

//   // // Define auth routes (accessible only when not authenticated)
//   // const authRoutes = [
//   //   '/login',
//   //   '/admin',
//   //   '/signup/sender',
//   //   '/signup/receiver',
//   //   '/forgot-password',
//   //   '/reset-password',
//   //   '/verify-user',
//   //   '/verify-forgot-password'
//   // ]

//   // // Check if current path is a protected route
//   // const isProtectedRoute = protectedRoutes.some(route => {
//   //   return pathname === route || (route !== '/' && pathname.startsWith(route + '/'))
//   // })

//   // // Check if current path is an auth route
//   // const isAuthRoute = authRoutes.some(route => {
//   //   return pathname === route || pathname.startsWith(route + '/')
//   // })

//   // // Route protection logic
//   // if (isProtectedRoute && !isAuthenticated) {
//   //   // Redirect unauthenticated users to login page
//   //   const loginUrl = new URL('/login', request.url)
//   //   loginUrl.searchParams.set('redirect', pathname) // Store intended destination
//   //   return NextResponse.redirect(loginUrl)
//   // }

//   // if (isAuthRoute && isAuthenticated) {
//   //   // Check if there's a redirect parameter in the URL
//   //   const redirectTo = request.nextUrl.searchParams.get('redirect') || '/'
//   //   const dashboardUrl = new URL(redirectTo, request.url)
//   //   return NextResponse.redirect(dashboardUrl)
//   // }

//   // // Add auth headers for API requests
//   const response = NextResponse.next()

//   // // Add authentication header if token exists
//   // if (accessToken) {
//   //   response.headers.set('Authorization', `Bearer ${accessToken}`)
//   // }

//   // Set CORS headers for API routes
//   if (pathname.startsWith('/api/')) {
//     response.headers.set('Access-Control-Allow-Origin', '*')
//     response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//     response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//   }

//   return response
// }

// /**
//  * Middleware Configuration
//  * Specify which routes should trigger the middleware
//  */
// export const config = {
//   matcher: [
//     "/",
//     "/dashboard/:path*",
//     "/admin/:path*",
//     "/director/:path*",
//     "/manager/:path*",
//     "/worker/:path*",
//     "/login",
//     "/signup/:path*",
//     "/forgot-password",
//     "/reset-password",
//     "/verify-user",
//     "/verify-forgot-password",
//   ],
// }

// middleware.ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value; // e.g. "ADMIN", "WORKER"
  const { pathname } = request.nextUrl;

  const publicPaths = ["/", "/login", "/forgot-password", "/reset-password"];
  const isPublicRoute = publicPaths.includes(pathname);

  // ✅ If no token and trying to access private route → redirect to login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ If token exists but role missing → force logout
  if (token && !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ If "/" route → redirect based on role
  if (pathname === "/") {
    if (token && role) {
      return NextResponse.redirect(
        new URL(`/${role.toLowerCase()}`, request.url)
      );
    }
    return NextResponse.next();
  }

  // ✅ Role → Route Mapping
  const roleRoutes: Record<string, string> = {
    ADMIN: "/admin/fulfillments",
    DIRECTOR: "/director",
    MANAGER: "/manager",
    WORKER: "/worker",
    CLIENT: "/client",
  };

  // ✅ Agar user logged in hai aur public route par gaya (login, reset, etc.)
  if (token && isPublicRoute) {
    const redirectPath = roleRoutes[role as keyof typeof roleRoutes] || "/";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // ✅ Private route protection based on role
  if (role) {
    const allowedPrefix = roleRoutes[role as keyof typeof roleRoutes];
    if (
      allowedPrefix &&
      pathname.startsWith("/") &&
      !pathname.startsWith(allowedPrefix)
    ) {
      // ❌ Wrong role route → redirect to their own dashboard
      return NextResponse.redirect(new URL(allowedPrefix, request.url));
    }
  }

  // ✅ Otherwise continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/admin/:path*",
    "/client/:path*",
    "/director/:path*",
    "/manager/:path*",
    "/worker/:path*",
  ],
};
