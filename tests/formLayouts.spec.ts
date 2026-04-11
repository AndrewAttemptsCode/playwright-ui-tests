import { test } from "@playwright/test";
import PageManager from "../pageObjects/PageManager";
import { faker } from "@faker-js/faker";


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("'Using the grid' login", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();

  await pm.onFormLayoutsPage().signinGrid("email@email.com", "password123", "Option 1");
});

test("'Inline form' login", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();

  for (let i = 0; i <= 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const userEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${faker.number.int(1000)}@test.com`;
    await pm.onFormLayoutsPage().signinInline(fullName, userEmail, true);
  }
});
