"use client";
import { useRouter } from "next/navigation";
import DashboardCards from "@/components/molecule/DashboardCards";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout");
    if (response.ok) {
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#013e28] text-white flex flex-col">
      {/* Title and Subtext */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-gray-300">Here's an overview of your system.</p>
      </div>

      {/* Main Content */}
      <main className="p-6 flex-grow">
        <DashboardCards></DashboardCards>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-900 py-4 px-6 text-center">
        <p>© 2025 My Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
