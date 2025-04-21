// app/api/user_management/route.ts
import { NextRequest, NextResponse } from "next/server";

const GATEWAY_BASE_URL = "http://localhost:4000/users";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("➡️ POST /user_management - Body:", body);

    const response = await fetch(`${GATEWAY_BASE_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("❌ Gateway POST error:", response.status, responseData);
      return NextResponse.json(
        { error: responseData },
        { status: response.status }
      );
    }

    console.log("✅ Gateway POST response:", responseData);
    return NextResponse.json(responseData, { status: response.status });
  } catch (error) {
    console.error("❌ POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    console.log("➡️ GET /user_management - Email:", email);

    if (!email) {
      return NextResponse.json(
        { error: "Email query param is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${GATEWAY_BASE_URL}/read?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("❌ Gateway GET error:", response.status, responseData);
      return NextResponse.json(
        { error: responseData },
        { status: response.status }
      );
    }

    console.log("✅ Gateway GET response:", responseData);
    return NextResponse.json(responseData, { status: response.status });
  } catch (error) {
    console.error("❌ GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
