import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    // Testing
    if (email === "user@example.com" && password === "password123") {
      console.log("Email and Password match");
      const token = "secure_random_token";

      // Create an HttpOnly, Secure cookie ToDo
      const cookie = serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      // Attach the Set-Cookie header to the response ToDo
      const response = NextResponse.json({ success: true }, { status: 200 });
      response.headers.append("Set-Cookie", cookie);

      return response;
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
