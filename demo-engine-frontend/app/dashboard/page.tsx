"use client";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Call the logout API to clear the cookie
    const response = await fetch("/api/logout");

    if (response.ok) {
      // Redirect to login page after logout
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
