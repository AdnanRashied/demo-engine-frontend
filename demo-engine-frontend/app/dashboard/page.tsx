"use client";
import { useRouter } from "next/navigation";
import DashboardCards from "@/components/molecule/DashboardCards";

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
    <div className="min-h-screen bg-[#013e28] text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-emerald-900 py-4 px-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Dashboard</div>
        <div className="flex items-center gap-4">
          <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center">
            {/* <Cog className="mr-2 w-5 h-5" /> */}
          </button>
          <button
            className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

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
