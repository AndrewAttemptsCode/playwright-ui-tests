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

test.describe("Modal & Overlays page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole("link", { name: /modal & overlays/i }).click();
    await page.getByRole("link", { name: /toastr/i }).click();
  });

  test("Checkboxes", async ({ page }) => {
    // Uncheck first checkbox
    const firstCheckbox = page.getByRole("checkbox", { name: /hide on click/i });
    await firstCheckbox.uncheck({ force: true });
    await expect(firstCheckbox).not.toBeChecked();

    // Check second checkbox
    const secondCheckbox = page.getByRole("checkbox", { name: /prevent arising/i });
    await secondCheckbox.check({ force: true });
    await expect(secondCheckbox).toBeChecked();

    // Check ALL checkboxes
    const allCheckboxes = page.getByRole("checkbox");
    for (const checkbox of await allCheckboxes.all()) {
      await checkbox.check({ force: true });
      await expect(checkbox).toBeChecked();
    };

    // Uncheck ALL checkboxes
    for (const checkbox of await allCheckboxes.all()) {
      await checkbox.uncheck({ force: true });
      await expect(checkbox).not.toBeChecked();
    };
  });  
});

test.describe("Lists and Dropdowns", () => {
  test("Theme selection", async ({ page }) => {
    // Narrow to button in header
    const themeSelect = page.locator("ngx-header nb-select");
    // Click theme select button
    await themeSelect.click();
    // Narrow list role by tag selector
    const optionList = page.getByRole("list").locator("nb-option");
    // Expect list to contain correct options
    await expect(optionList).toHaveText([/light/i, /dark/i, /cosmic/i, /corporate/i]);
    // Narrow theme to dark mode option
    const darkMode = optionList.filter({ hasText: /dark/i });
    // Click dark mode theme
    await darkMode.click();
    // Expect theme button to display dark
    await expect(themeSelect).toHaveText(/dark/i);
    // Target header element
    const header = page.locator("nb-layout-header");
    // Expect updated header background theme color 
    await expect(header).toHaveCSS("background-color", "rgb(34, 43, 69)");

    // Header bg color themes
    const colors = {
      "Light": "rgb(255, 255, 255)",
      "Dark": "rgb(34, 43, 69)",
      "Cosmic": "rgb(50, 50, 89)",
      "Corporate": "rgb(255, 255, 255)"
    }

    // Loop through each theme in the theme list
    // Expect header bg to match colors object entries
    for (const [themeName, bgColor] of Object.entries(colors)) {
      await themeSelect.click();
      const option = optionList.filter({ hasText: themeName });
      await option.click();
      await expect(header).toHaveCSS("background-color", bgColor);
    }
  });
  
});