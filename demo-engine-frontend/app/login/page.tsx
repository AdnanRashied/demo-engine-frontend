"use client";
import { useState, useEffect } from "react";
import RoundButton from "../components/RoundButton";
import Card from "../components/Card";
import TextField from "../components/TextField";
import Form from "../components/Form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");
      } else {
        setError(data.error || "Login failed. Try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  p-4 bg-[#013e28]">
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
              placeholder="you@example.com"
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
              <RoundButton text="Login" color="bg-yellow-500" width="w-100" />
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
