"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const UserContext = createContext({
  userDetails: { name: "", email: "", img: "" },
  setUserDetails: (details: { name: string; email: string; img: string }) => {},
  loading: true,
  error: "",
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    img: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/user-details", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setUserDetails({
          name: data.name || "",
          email: data.email || "",
          img: data.img || "https://placehold.co/600x400/png",
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load user details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [pathname]);

  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
