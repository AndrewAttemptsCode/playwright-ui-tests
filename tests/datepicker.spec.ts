import { test } from "@playwright/test";
import PageManager from "../pageObjects/PageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Date picker tests @regression @ui", () => {
  test("select 10 days from today", async ({ page, isMobile }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().datepickerPage(isMobile);
    await pm.onDatePickerPage().daysFromToday(10);
  });

  test("select 30 days from today", async ({ page, isMobile }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().datepickerPage(isMobile);
    await pm.onDatePickerPage().daysFromToday(30);
  });

  test("select range 2 days to 5 days from today", async ({ page, isMobile })=> {
    const pm = new PageManager(page);
    await pm.navigateTo().datepickerPage(isMobile);
    await pm.onDatePickerPage().rangeFromToday(2, 5);
  });

  test("select range 5 days to 62 days from today", async ({ page, isMobile })=> {
    const pm = new PageManager(page);
    await pm.navigateTo().datepickerPage(isMobile);
    await pm.onDatePickerPage().rangeFromToday(5, 62);
  });

});