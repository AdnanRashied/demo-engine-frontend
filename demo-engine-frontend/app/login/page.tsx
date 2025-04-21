"use client";
import { useState, useEffect } from "react";
import { logger } from "@/lib/logger";
import Form from "@/components/Form";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import TextField from "@/components/TextField";
import RoundButton from "@/components/RoundButton";
import { getToken, isTokenExpired, clearToken } from "../lib/util/tokenUtil";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      router.push("/dashboard"); // ✅ Redirect only if the user is already logged in
    } else {
      clearToken(); // 🧼 Clear old/expired token
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      logger.log("Response from Gateway from page.tsx:", response);

      const responseClone = response.clone();
      const rawBody = await responseClone.text();

      if (!response.ok) {
        const message = rawBody || "Login failed. Try again.";
        setError(message);
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setSuccess("Login successful!");
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
        throw new Error(data.message || "Invalid credentials");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        logger.error("Login error:", err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      logger.error("Unexpected login error:", err);
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
                disabled={loading}
              />
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
