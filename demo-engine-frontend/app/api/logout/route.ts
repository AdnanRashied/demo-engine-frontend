import { NextRequest, NextResponse } from "next/server";

const GATEWAY_URL = process.env.GATEWAY_URL_AUTHENTICATION_LOGOUT;

if (!GATEWAY_URL) {
  throw new Error("Gateway URL for logout is not defined");
}

export async function POST(req: NextRequest) {
  try {
    const response = await fetch(`${GATEWAY_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": req.headers.get("X-CSRF-Token") || "",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify({}),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { error: data.message || "Logout failed." },
        { status: response.status || 401 }
      );
    }

    const res = NextResponse.json(data, { status: 200 });
    res.cookies.delete("auth_token");
    res.cookies.delete("refresh_token");

    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
