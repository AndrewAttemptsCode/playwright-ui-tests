import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Form layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole("link", { name: /forms/i }).click();
    await page.getByRole("link", { name: /form layouts/i }).click();
  });

  test("Input fields", async({ page }) => {
    const loginForm = page.locator("nb-card").filter({ hasText: /using the grid/i });
    const emailField = loginForm.getByRole("textbox", { name: "Email" });
    // Fill email input field with value
    await emailField.fill("test@test.com");
    // Clear email input field of value
    await emailField.clear();
    // Typing email input field with value and delay
    await emailField.pressSequentially("test@test.com", { delay: 100 });

    // Expect email to have a value
    await expect(emailField).toHaveValue("test@test.com");
  });

});
