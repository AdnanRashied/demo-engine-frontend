import { decodeJwt } from "jose";

// Function to get the token from localStorage or cookies
export function getToken(): string | null {
  return (
    localStorage.getItem("auth_token") ||
    document.cookie.split("auth_token=")[1] ||
    null
  );
}

// Function to check if the token is expired
export function isTokenExpired(token: string): boolean {
  try {
    const decodedToken = decodeJwt(token);
    return decodedToken.exp ? decodedToken.exp * 1000 < Date.now() : true; // exp is in seconds, convert to milliseconds
  } catch (error) {
    return true; // If decoding fails, assume the token is expired
  }
}

// Function to clear the token
export function clearToken(): void {
  localStorage.removeItem("auth_token");
  document.cookie = "auth_token=; Max-Age=0"; // Clear token from cookies
}
