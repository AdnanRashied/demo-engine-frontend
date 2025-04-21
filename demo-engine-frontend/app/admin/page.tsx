"use client";
import { useState } from "react";
import Card from "@/components/Card";
import Form from "@/components/Form";
import { LoginEvent } from "@/lib/interface";
import TextField from "@/components/TextField";
import RoundButton from "@/components/RoundButton";
import DropdownMenu from "@/components/Dropdown";
import UserSearchModule from "@/components/molecule/UserSearchModule";

export default function AdminDashboard() {
  const [loginEvents, setLoginEvents] = useState<LoginEvent[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const availableRoles = [" ", "Admin", "User", "Moderator"];

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/user_management", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role, name, email, password }),
      });

      const rawBody = await response.clone().text();

      if (!response.ok) {
        throw new Error(rawBody || "Registration failed.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to register user.");
      }

      setName("");
      setRole("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Registration error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#013e28] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Register User Card */}
        <Card
          backgroundColor="bg-emerald-900"
          borderColor="border-yellow-500"
          width="w-full"
        >
          <div className="p-1">
            <h2 className="text-xl font-semibold mb-4">Register User</h2>

            <Form onSubmit={handleSubmit}>
              <DropdownMenu
                label="Role"
                options={availableRoles}
                value={role}
                onChange={handleRoleChange}
              />
              <TextField
                label="Name"
                placeholder="Place User Name Here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                placeholder="Place User Email Here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                placeholder="Place User Password Here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="p-2">
                <RoundButton text="Register" width="w-full" type="submit" />
              </div>
            </Form>
          </div>
        </Card>

        <Card
          backgroundColor="bg-emerald-900"
          borderColor="border-yellow-500"
          width="w-full"
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Edit User</h2>
            <UserSearchModule />
          </div>
        </Card>
      </div>
    </div>
  );
}
