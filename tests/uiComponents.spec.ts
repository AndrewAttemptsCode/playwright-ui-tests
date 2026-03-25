import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Form layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole("link", { name: /forms/i }).click();
    await page.getByRole("link", { name: /form layouts/i }).click();
  });

  test("Input fields", async ({ page }) => {
    const loginForm = page
      .locator("nb-card")
      .filter({ hasText: /using the grid/i });
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

  test("Radio buttons", async ({ page }) => {
    const loginForm = page
      .locator("nb-card")
      .filter({ hasText: /using the grid/i });
    
    // Check radio option 1
    const radioButton1 = loginForm.getByRole("radio", { name: /option 1/i });
    await radioButton1.check({ force: true });

    // Validate radio option 1 is checked
    await expect(radioButton1).toBeChecked();

    // Check radio option 2
    const radioButton2 = loginForm.getByRole("radio", { name: /option 2/i });
    await radioButton2.check({ force: true });

    // Validate radio option 2 is checked
    await expect(radioButton2).toBeChecked();

    // Validate radio option 1 is no longer checked
    await expect(radioButton1).not.toBeChecked();
  });
});
