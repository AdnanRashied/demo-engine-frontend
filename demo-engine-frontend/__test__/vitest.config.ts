import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true, // Enable globals like `vi` and `expect`
    environment: "jsdom", // Use jsdom for simulating a browser environment
  },
});
