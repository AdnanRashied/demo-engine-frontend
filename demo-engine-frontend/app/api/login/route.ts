import { NextRequest, NextResponse } from "next/server";

const GATEWAY_URL = process.env.GATEWAY_URL_AUTHENTICATION_LOGIN;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }
    console.log("Login request starting...");
    const response = await fetch(`${GATEWAY_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();
    console.log("📥 Received response from gateway:", {
      status: response.status,
      body: data,
    });

    const token = data.token || data.access_token;
    const name = data.name || "unknown";
    const role =
      typeof data.role === "string" ? data.role.toLowerCase() : "user";

    if (!token) {
      return NextResponse.json(
        { error: data.message || "Invalid email or password." },
        { status: 401 }
      );
    }

    const res = NextResponse.json(
      { success: true, name, role },
      { status: 200 }
    );
    res.headers.append(
      "Set-Cookie",
      `auth_token=${token}; HttpOnly; Secure=${
        process.env.NODE_ENV === "production"
      }; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`
    );

    return res;
  } catch (error) {
    console.error("❌ Error in login route:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
