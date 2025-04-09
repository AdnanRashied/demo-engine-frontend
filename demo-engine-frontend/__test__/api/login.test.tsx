import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../../app/login/page";
import { vi } from "vitest";

global.fetch = vi.fn() as unknown as jest.Mock; // Mock the fetch API

describe("LoginPage", () => {
  beforeEach(() => {
    // Reset the fetch mock before each test
    (fetch as vi.Mock).mockClear();
  });

  it("renders the login form correctly", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("displays an error message when login fails", async () => {
    render(<LoginPage />);

    // Simulate form input
    userEvent.type(screen.getByLabelText(/email/i), "wrong@example.com");
    userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");

    // Mock the fetch response to simulate a failed login
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: "Invalid credentials" }),
    });

    // Simulate form submission
    userEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for the error message to appear
    await waitFor(() => screen.getByText(/Invalid credentials/i));

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  it("displays a success message when login is successful", async () => {
    render(<LoginPage />);

    // Simulate form input
    userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    userEvent.type(screen.getByLabelText(/password/i), "correctpassword");

    // Mock the fetch response to simulate a successful login
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, token: "mock-token" }),
    });

    // Mock window.location.pathname
    delete window.location;
    window.location = { ...window.location, pathname: "" } as Location;

    // Simulate form submission
    userEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for success action (navigation or message)
    await waitFor(() => expect(window.location.pathname).toBe("/dashboard"));
  });

  it("shows loading state while logging in", async () => {
    render(<LoginPage />);

    // Mock the fetch request to delay the response
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, token: "mock-token" }),
    });

    // Simulate form input
    userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    userEvent.type(screen.getByLabelText(/password/i), "correctpassword");

    // Simulate form submission and check loading state
    userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();

    // Wait for success or error
    await waitFor(() => expect(window.location.pathname).toBe("/dashboard"));
  });
});
