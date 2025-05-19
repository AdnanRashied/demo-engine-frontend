import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

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

      // Verify the JWT token using jose with the specified algorithm
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ["HS256"],
      });

      const userId = payload.sub as string;
      const role =
        typeof payload?.role === "string" ? payload.role.toLowerCase() : "";

      if (!userId || !role) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Attach userId to the request for downstream routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", userId);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      return response;
    } catch (err) {
      // Invalidate the token by removing it from the cookies
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token");
      return response;
    }
  }

  // Handle unauthenticated access to protected routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api/user-details")
  ) {
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
    "/api/user-details",
  ],
};
