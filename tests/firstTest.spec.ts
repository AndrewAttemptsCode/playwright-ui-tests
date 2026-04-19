import { test, expect } from "@playwright/test";
import PageManager from "../pageObjects/PageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Form suite", () => {
  test("Navigate to forms page", async ({ page, isMobile }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage(isMobile);
  });

  test("Navigage to datepicker page", async ({ page, isMobile }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().datepickerPage(isMobile);
  });
});

test.describe("Charts suite", () => {
  test("Navigate to charts page", async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
    await page.getByRole("link", { name: /^charts$/i }).click();
    await page.getByRole("link", { name: /^echarts$/i }).click();
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
    await expect(page.getByText(/pie/i)).toBeVisible();
  });
});
