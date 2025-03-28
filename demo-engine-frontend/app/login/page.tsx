"use client";
import { useState } from "react";
import Form from "@/components/Form";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import TextField from "@/components/TextField";
import RoundButton from "@/components/RoundButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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

      if (!response.ok) {
        // Try to parse the error response, but catch JSON parse errors
        let errorMessage = "Login failed. Try again.";
        try {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } catch (jsonError) {
          console.error("Error parsing JSON response", jsonError);
        }
        throw new Error(errorMessage);
      }

      setSuccess("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", err);
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
