import { test } from "@playwright/test";
import PageManager from "../pageObjects/PageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Navigate to form layouts page", async ({ page, isMobile }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage(isMobile);
});

test("Navigate to multiple group links with sublinks", async ({ page, isMobile }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage(isMobile);
  await pm.navigateTo().datepickerPage(isMobile);
  await pm.navigateTo().smartTablePage(isMobile);
  await pm.navigateTo().toastrPage(isMobile);
  await pm.navigateTo().tooltipPage(isMobile);
});