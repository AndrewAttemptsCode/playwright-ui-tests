import { test } from "@playwright/test";
import PageManager from "../pageObjects/PageManager";
import { faker } from "@faker-js/faker";

const formEmail = process.env.FORM_EMAIL;
const formPassword = process.env.FORM_PASSWORD;

if (!formEmail || !formPassword) {
  throw new Error("Form email/password env var is missing");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("'Using the grid' login @smoke @regression", async ({ page, isMobile }, testInfo) => {
  const pm = new PageManager(page);
  // Use of isMobile built in fixture (boolean) based off project device type
  // to trigger navigation pom toggle of mobile nav burger menu button
  await pm.navigateTo().formLayoutsPage(isMobile);

  await pm.onFormLayoutsPage().signinGrid(formEmail, formPassword, "Option 1");
  // Take screenshot of whole app and save to path
  await page.screenshot({ path: testInfo.outputPath("formLogin.png") });
});

test("'Inline form' login @regression @ui", async ({ page, isMobile }, testInfo) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage(isMobile);

  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const userEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${faker.number.int(1000)}@test.com`;
    await pm.onFormLayoutsPage().signinInline(fullName, userEmail, true);
    // Take screenshot by narrowing with locator and save to path
    await page.locator("nb-card", { hasText: /inline form/i }).screenshot({ path: testInfo.outputPath(`inlineForm-${i}.png`) });
    // Take screenshot and save in memory
    const buffer = await page.locator("nb-card", { hasText: /inline form/i }).screenshot();
  }
});
