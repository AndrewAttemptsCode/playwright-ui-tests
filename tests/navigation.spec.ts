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
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});