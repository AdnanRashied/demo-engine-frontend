import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  // Clear the auth token cookie
  response.headers.append(
    "Set-Cookie",
    `auth_token=; HttpOnly; Secure=${
      process.env.NODE_ENV === "production"
    }; SameSite=Strict; Path=/; Max-Age=0`
  );

  return response;
}
