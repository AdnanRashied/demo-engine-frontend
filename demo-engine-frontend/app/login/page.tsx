"use client";
import { useState, useEffect } from "react";
import RoundButton from "../components/RoundButton";
import Card from "../components/Card";
import TextField from "../components/TextField";
import Form from "../components/Form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setisClient] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setisClient(true);
  });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Logging in.");
    setError("");
    // ToDo: Error handler
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 bg-green-900">
      <Card
        backgroundColor="bg-green-800"
        borderColor="border-yellow-500"
        width="w-full max-w-md"
        height="h-120"
      >
        <div className="">Sinch Logo</div>
        <div className="flex flex-col justify-center h-full">
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
