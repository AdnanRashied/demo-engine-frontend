"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import RoundButton from "@/components/RoundButton";

export default function Navbar() {
  const router = useRouter();
  const {
    userDetails,
    loading: contextLoading,
    error: contextError,
    setUserDetails,
  } = useUser();

  const [csrfToken, setCsrfToken] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const fetchCsrfToken = async () => {
    const fetchToken = process.env.NEXT_PUBLIC_GATEWAY_URL_AUTHENTICATION_CSRF;
    if (!fetchToken) {
      throw new Error("URL for fetching token is not defined");
    }
    try {
      const res = await fetch(`${fetchToken}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setCsrfToken(data.csrfToken);
      return data.csrfToken;
    } catch (err) {
      setLogoutError("Failed to initialize logout. Please try again.");
      return "";
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    setLogoutError("");

    try {
      const token = await fetchCsrfToken();
      if (!token) throw new Error("CSRF token not available.");

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
        setUserDetails({ name: "", email: "", img: "" });
        router.push("/login");
      } else {
        throw new Error(data.message || "Logout failed.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setLogoutError(errorMessage);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <nav className="bg-emerald-900 text-white p-4">
      <div className="flex justify-end items-center gap-4">
        {userDetails.img ? (
          <img
            src={userDetails.img}
            alt="User profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-500" />
        )}
        <span className="mr-4">
          {contextLoading ? "Loading..." : userDetails.name || "User"}
        </span>
        <RoundButton
          text="Settings"
          color="bg-blue-500"
          width="w-24"
          onClick={handleSettings}
        />
        <RoundButton
          text={logoutLoading ? "Logging out..." : "Logout"}
          color="bg-yellow-500"
          width="w-24"
          onClick={handleLogout}
          disabled={logoutLoading}
        />
        {(contextError || logoutError) && (
          <p className="text-red-500 mt-2">{contextError || logoutError}</p>
        )}
      </div>
    </nav>
  );
}
