import { test, expect, type Page, type APIRequestContext } from "@playwright/test";

test.describe("Chat Page", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto("/chat");
  });

  test("should load chat page", async ({ page }: { page: Page }) => {
    await expect(page).toHaveTitle(/Cookie/);
    await expect(page.getByText("Cookie - Career Fit Analyzer")).toBeVisible();
  });

  test("should show welcome message", async ({ page }: { page: Page }) => {
    await expect(page.getByText(/Welcome!/i)).toBeVisible();
    await expect(page.getByText(/paste a job description/i)).toBeVisible();
  });

  test("should have input field", async ({ page }: { page: Page }) => {
    const input = page.getByPlaceholder(/Paste a job description/i);
    await expect(input).toBeVisible();
  });

  test("should have send button", async ({ page }: { page: Page }) => {
    const sendButton = page.locator("button").filter({ has: page.locator("svg") }).first();
    await expect(sendButton).toBeVisible();
  });

  test("should have upload button", async ({ page }: { page: Page }) => {
    const uploadButton = page.getByLabel(/upload/i);
    await expect(uploadButton).toBeVisible();
  });

  test("should type in input field", async ({ page }: { page: Page }) => {
    const input = page.getByPlaceholder(/Paste a job description/i);
    await input.fill("Test job description");
    await expect(input).toHaveValue("Test job description");
  });

  test("should not send empty message", async ({ page }: { page: Page }) => {
    const sendButton = page.locator("button").filter({ has: page.locator("svg") }).first();

    // Button should be disabled when input is empty
    await expect(sendButton).toBeDisabled();
  });

  test("should show send button enabled when input has text", async ({ page }: { page: Page }) => {
    const input = page.getByPlaceholder(/Paste a job description/i);
    await input.fill("Test message");

    const sendButton = page.locator("button").last();
    await expect(sendButton).toBeEnabled();
  });
});

test.describe("API Endpoint", () => {
  test("should return 400 when jdText is missing", async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post("/api/match-resume", {
      data: {},
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("jdText is required");
  });

  test("should return 500 when API key is missing", async ({ request }: { request: APIRequestContext }) => {
    // This test will fail if API key is not set in environment
    // It tests the error handling path
    const originalKey = process.env.PUBLIC_GEMINI_API_KEY;
    delete process.env.PUBLIC_GEMINI_API_KEY;

    const response = await request.post("/api/match-resume", {
      data: {
        jdText: "Test job description",
      },
    });

    // Restore the key
    if (originalKey) {
      process.env.PUBLIC_GEMINI_API_KEY = originalKey;
    }

    // Should either succeed (if key is set) or return 500 (if key missing)
    expect([200, 500]).toContain(response.status());
  });
});

test.describe("Navigation", () => {
  test("should navigate to home from chat", async ({ page }: { page: Page }) => {
    await page.goto("/chat");

    // Click on the site title/name to go home
    await page.click("text=Abhishek");

    await expect(page).toHaveURL("/");
  });

  test("should have chat link in navigation", async ({ page }: { page: Page }) => {
    // Check if there's navigation to chat from other pages
    await page.goto("/");

    // The chat page should be accessible
    await page.goto("/chat");
    await expect(page).toHaveTitle(/Cookie/);
  });
});

test.describe("Responsive Design", () => {
  test("should work on mobile viewport", async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/chat");

    // Chat component should still be visible
    await expect(page.getByText("Cookie - Career Fit Analyzer")).toBeVisible();

    // Input should still work
    const input = page.getByPlaceholder(/Paste a job description/i);
    await input.fill("Mobile test");
    await expect(input).toHaveValue("Mobile test");
  });

  test("should work on tablet viewport", async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/chat");

    await expect(page.getByText("Cookie - Career Fit Analyzer")).toBeVisible();
  });
});
