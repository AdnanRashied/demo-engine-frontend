"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import Card from "@/components/Card";
import TextField from "@/components/TextField";
import RoundButton from "@/components/RoundButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCsrfToken = async () => {
    const csrfUrl = process.env.NEXT_PUBLIC_GATEWAY_URL_AUTHENTICATION_CSRF;
    if (!csrfUrl) {
      setError("CSRF URL environment variable is not defined.");
      return;
    }

    try {
      const res = await fetch(csrfUrl, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error fetching CSRF: ${res.status}`);
      }
      const data = await res.json();
      setCsrfToken(data.csrfToken);
    } catch (err) {
      setError("Failed to initialize login. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!csrfToken) {
      setError("CSRF token not available. Please refresh the page.");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        const message = data.message || "Login failed. Try again.";
        setError(message);
        throw new Error(message);
      }

      const data = await response.json();
      if (data.success) {
        setSuccess("Login successful!");
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
        throw new Error(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#013e28]">
      <Card
        backgroundColor="bg-emerald-900"
        borderColor="border-yellow-500"
        width="w-full max-w-md"
        height="h-120"
      >
        <div className="flex flex-col justify-center h-full">
          <div className="text-center text-white font-bold text-lg">
            Sinch Logo
          </div>
          <Form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Place your email"
              errorMessage={error}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <div className="flex justify-center mt-4">
              <RoundButton
                text="Login"
                color="bg-yellow-500"
                width="w-100"
                type="submit"
                disabled={loading || !csrfToken}
              />
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
