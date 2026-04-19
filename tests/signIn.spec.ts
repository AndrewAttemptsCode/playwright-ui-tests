import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
  await page.getByRole("link", { name: /forms/i }).click();
  await page.getByRole("link", { name: /form layouts/i }).click();
  if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
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

test("Narrowing with selectors", async ({ page }) => {
  const emailInput = page
    .locator("nb-card")
    .filter({ hasText: /using the grid/i })
    .getByLabel("email");

  await emailInput.fill("email@email.com");
  await expect(emailInput).toHaveValue("email@email.com");

  const passwordInput = page
    .locator("nb-card")
    .filter({ has: page.locator("#inputPassword2") })
    .getByLabel(/password/i);

  await passwordInput.fill("newpassword");
  await expect(passwordInput).toHaveValue("newpassword");
});

test("Chaining filters", async ({ page }) => {
  await page
    .locator("nb-card")
    .filter({ has: page.getByRole("checkbox") })
    .filter({ hasText: /sign in/i })
    .getByRole("button", { name: /sign in/i })
    .click();
});

test("Fill out basic form", async ({ page }) => {
  const basicForm = page
    .locator("nb-card")
    .filter({ hasText: /basic form/i });

  // Confirm correct form is selected
  await expect(basicForm).toHaveText(/basic form/i);

  // Fill email field and confirm value
  const emailField = basicForm.getByLabel(/email address/i);

  await emailField.fill("email@email.com");
  await expect(emailField).toHaveValue("email@email.com");

  // Fill password field and confirm value
  const passwordField = basicForm.getByLabel(/password/i);

  await passwordField.fill("newpassword");
  await expect(passwordField).toHaveValue("newpassword");

  // Check the checkbox
  const checkBox = basicForm.locator("label").filter({ hasText: /check me out/i });
  
  await checkBox.click();
  await expect(checkBox).toBeChecked();

  // Submit login
  const submitButton = basicForm.getByRole("button", { name: /submit/i });
  await submitButton.click();
});