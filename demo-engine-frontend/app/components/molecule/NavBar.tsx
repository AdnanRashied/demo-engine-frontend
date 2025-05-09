"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RoundButton from "@/components/RoundButton";

export default function Navbar() {
  const router = useRouter();
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    img: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const readUser = process.env.NEXT_PUBLIC_GATEWAY_URL_AUTHENTICATION_READ;
      if (!readUser) {
        throw new Error("URL for reading user data is undefined.");
      }
      try {
        const res = await fetch(`${readUser}`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setUserDetails({
          name: data.name || "User",
          email: data.email || "user@email.com",
          img: data.img || "user",
        });
      } catch (err) {
        setError("Failed to load user details.");
      }
    };
    fetchUserDetails();
  }, []);

  const fetchCsrfToken = async () => {
    const fetchToken = process.env.NEXT_PUBLIC_GATEWAY_URL_AUTHENTICATION_CSRF;
    if (!fetchToken) {
      throw new Error("URL is for fetching token is not defined");
    }
    try {
      const res = await fetch(`${fetchToken}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setCsrfToken(data.csrfToken);
      return data.csrfToken;
    } catch (err) {
      setError("Failed to initialize logout. Please try again.");
      return "";
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      const token = await fetchCsrfToken();
      if (!token) {
        throw new Error("CSRF token not available.");
      }

      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        body: JSON.stringify({}),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Logout failed.");
      }

      const data = await response.json();
      if (data.success) {
        router.push("/login");
      } else {
        throw new Error(data.message || "Logout failed.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSettings = () => {
    // Placeholder for settings navigation after Redis
  };

  return (
    <nav className="bg-emerald-900 text-white p-4">
      <div className="flex justify-end items-center gap-4">
        <img
          src={userDetails.img}
          alt="User profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="mr-4">{userDetails.name || "User"}</span>
        <RoundButton
          text="Settings"
          color="bg-blue-500"
          width="w-24"
          onClick={handleSettings}
        />
        <RoundButton
          text={loading ? "Logging out..." : "Logout"}
          color="bg-yellow-500"
          width="w-24"
          onClick={handleLogout}
          disabled={loading}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </nav>
  );
}
