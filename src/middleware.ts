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
    ADMIN: "/admin/directors",
    DIRECTOR: "/director/fulfillments",
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
