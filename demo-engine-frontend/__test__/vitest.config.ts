import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["__tests__/api/**/*.test.ts"], // Looks for .test.ts files inside __tests__/api
  },
});
