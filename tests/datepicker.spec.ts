import { test, expect } from "@playwright/test";
import SideNav from "../pageObjects/SideNav";
import DatePickerPage from "../pageObjects/DatePickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Date picker tests", () => {
  test("Single date, n days from today", async ({ page }) => {
    const navigate = new SideNav(page);
    await navigate.navDatepicker();

    const datePicker = new DatePickerPage(page);
    await datePicker.daysFromToday(10);
    await datePicker.daysFromToday(30);
  });

  test("Range dates, n days from today", async ({ page })=> {
    const navigate = new SideNav(page);
    await navigate.navDatepicker();

    const datePicker = new DatePickerPage(page);
    await datePicker.rangeFromToday(2, 5);
    await datePicker.rangeFromToday(5, 62);
  });

});