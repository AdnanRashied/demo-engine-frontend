import { test, expect } from "vitest";
import { POST } from "../../app/api/login/route"; // Adjust if needed
import { NextRequest } from "next/server";

test("returns success with valid credentials", async () => {
  const mockRequest = new NextRequest("http://localhost", {
    method: "POST",
    body: JSON.stringify({
      email: "user@example.com",
      password: "password123",
    }),
  });

  const response = await POST(mockRequest);
  const json = await response.json();

  expect(response.status).toBe(200);
  expect(json).toEqual({ success: true, token: "abcd1234" });
});

test("returns 400 if email or password is missing", async () => {
  const mockRequest = new NextRequest("http://localhost", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const response = await POST(mockRequest);
  const json = await response.json();

  expect(response.status).toBe(400);
  expect(json.error).toBe("Email and password are required");
});

test("returns 401 for invalid credentials", async () => {
  const mockRequest = new NextRequest("http://localhost", {
    method: "POST",
    body: JSON.stringify({ email: "wrong@example.com", password: "wrongpass" }),
  });

  const response = await POST(mockRequest);
  const json = await response.json();

  expect(response.status).toBe(401);
  expect(json.error).toBe("Invalid email or password");
});
