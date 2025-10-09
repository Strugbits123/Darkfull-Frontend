import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  let role = request.cookies.get("role")?.value; // e.g. "ADMIN", "WORKER"
  const { pathname } = request.nextUrl;

  // Normalize role
  role = role ? role.toUpperCase() : undefined;

  // 🔹 Debug Logs
  console.log("🟢 Middleware Debug:");
  console.log("Pathname:", pathname);
  console.log("Token:", token ? "✅ present" : "❌ missing");
  console.log("Role (raw):", request.cookies.get("role")?.value);
  console.log("Role (normalized):", role);

  const publicPaths = ["/", "/login", "/forgot-password", "/reset-password"];
  const isPublicRoute = publicPaths.includes(pathname);

  // ✅ If no token and trying to access private route → redirect to login
  if (!token && !isPublicRoute) {
    console.log("➡️ Redirecting: no token, private route");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ If token exists but role missing → allow only public routes (esp. /login)
  if (token && !role) {
    if (!isPublicRoute) {
      console.log(
        "➡️ Token present but role missing → restricting private access"
      );
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      console.log("➡️ Token present but role missing → staying on login/public");
      return NextResponse.next();
    }
  }

  // ✅ Role → Section Prefix (whole section allowed)
  const rolePrefixes: Record<string, string> = {
    ADMIN: "/admin",
    DIRECTOR: "/director",
    MANAGER: "/manager",
    WORKER: "/worker",
    CLIENT: "/client",
    SUPER_ADMIN: "/superAdmin",
  };

  // ✅ Default Dashboard Routes
  const dashboards: Record<string, string> = {
    ADMIN: "/admin/directors",
    DIRECTOR: "/director/fulfillments",
    MANAGER: "/manager/fulfillments",
    WORKER: "/worker/fulfillments",
    CLIENT: "/client/products",
    SUPER_ADMIN: "/superAdmin/store",
  };

  // ✅ If "/" route → redirect to dashboard if logged in
  if (pathname === "/") {
    if (token && role) {
      const redirectPath = dashboards[role] || "/login";
      console.log(`➡️ Redirecting "/" to dashboard: ${redirectPath}`);
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
    console.log("➡️ Public root route accessed, continuing...");
    return NextResponse.next();
  }

  // ✅ Logged-in user on public route → redirect to dashboard
  if (token && role && isPublicRoute) {
    const redirectPath = dashboards[role] || "/login";
    console.log(`➡️ Redirecting public route to dashboard: ${redirectPath}`);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // ✅ Private route protection
  if (role) {
    const allowedPrefix = rolePrefixes[role];
    if (allowedPrefix && !pathname.startsWith(allowedPrefix)) {
      const redirectPath = dashboards[role] || "/login";
      console.log(
        `❌ Unauthorized access: "${pathname}" not allowed for ${role}, redirecting to ${redirectPath}`
      );
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  console.log("✅ Access granted:", pathname);
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
    "/superAdmin/:path*",
  ],
};
