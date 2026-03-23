import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByRole("link", { name: /forms/i }).click();
  await page.getByRole("link", { name: /form layouts/i }).click();
  await expect(page.getByText(/using the grid/i)).toBeVisible();
});

test("Log in", async ({ page }) => {
  await page.locator("#inputEmail1").fill("test@test.com");
  await page.locator("#inputPassword2").fill("password");
  const radioButton = page.locator("label").filter({ hasText: /option 1/i });
  await radioButton.click();
  await expect(radioButton).toBeChecked();
  await page
    .locator('button[status="primary"]')
    .filter({ hasText: /sign in/i })
    .click();
});

test("Locate card email input via elements", async ({ page }) => {
  const emailInput = page
    .locator("nb-card")
    .filter({ hasText: /using the grid/i })
    .getByLabel("email");

  await emailInput.fill("email@email.com");
  await expect(emailInput).toHaveValue("email@email.com");
});
