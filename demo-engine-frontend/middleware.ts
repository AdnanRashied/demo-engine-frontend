import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// ✅ Ensure JWT_SECRET exists at runtime
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(
    "❌ JWT_SECRET is not defined in your environment variables."
  );
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  const { pathname } = request.nextUrl;

  if (token) {
    try {
      // Convert JWT_SECRET to a Uint8Array (required by jose)
      const secret = new TextEncoder().encode(JWT_SECRET);

      // Verify the JWT token using jose with the specified algorithm (e.g., 'HS256')
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ["HS256"], // Specify the algorithm used during signing
      });

      const role =
        typeof payload?.role === "string" ? payload.role.toLowerCase() : "";

      if (!role) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      return NextResponse.next();
    } catch (err) {
      // Invalidate the token by removing it from the cookies
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token"); // Remove invalid token
      return response;
    }
  }

  // Handle unauthenticated access to protected routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/login",
  ],
};
