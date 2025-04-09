import { vi, expect, test } from "vitest";

test("should mock fetch call", async () => {
  const mockFetch = vi.fn().mockResolvedValue({ success: true });
  global.fetch = mockFetch;

  const response = await fetch("/api/test");
  expect(response.success).toBe(true);
  expect(mockFetch).toHaveBeenCalled();
});
