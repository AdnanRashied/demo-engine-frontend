import { NextRequest, NextResponse } from "next/server";

const GATEWAY_URL = "http://localhost:4000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Send request to Gateway
    const response = await fetch(`${GATEWAY_URL}/authentication/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    // If login failed, return error
    if (!data.success) {
      return NextResponse.json(
        { error: data.message || "Invalid email or password." },
        { status: response.status }
      );
    }

    // If login successful, set cookie and return success
    const token = data.token;
    if (!token) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    const responseWithCookie = NextResponse.json(
      { success: true },
      { status: 200 }
    );
    responseWithCookie.headers.append(
      "Set-Cookie",
      `auth_token=${token}; HttpOnly; Secure=${
        process.env.NODE_ENV === "production"
      }; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 7}`
    );

    return responseWithCookie;
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
