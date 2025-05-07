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

    const response = await fetch(`${GATEWAY_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": req.headers.get("X-CSRF-Token") || "",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { error: data.message || "Invalid email or password." },
        { status: response.status || 401 }
      );
    }

    const setCookieHeaders =
      response.headers.get("set-cookie")?.split(", ") || [];
    let authToken = "";
    let refreshToken = "";
    for (const cookie of setCookieHeaders) {
      if (cookie.startsWith("auth_token=")) {
        authToken = cookie.split(";")[0].split("auth_token=")[1];
      } else if (cookie.startsWith("refresh_token=")) {
        refreshToken = cookie.split(";")[0].split("refresh_token=")[1];
      }
    }

    if (!authToken || !refreshToken) {
      return NextResponse.json(
        { error: "Authentication tokens not received." },
        { status: 500 }
      );
    }

    const res = NextResponse.json(
      {
        success: true,
        name: data.name || "unknown",
        role: data.role || "user",
      },
      { status: 200 }
    );
    res.cookies.set("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
      path: "/",
    });
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
