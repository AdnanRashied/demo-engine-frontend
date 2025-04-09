"use client";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

const Dashboard = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const responseWithClearedCookie = NextResponse.json(
      { success: true },
      { status: 200 }
    );
    responseWithClearedCookie.headers.append(
      "Set-Cookie",
      `auth_token=; HttpOnly; Secure=${
        process.env.NODE_ENV === "production"
      }; SameSite=Strict; Path=/; Max-Age=0`
    );
    router.push("/login");
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
