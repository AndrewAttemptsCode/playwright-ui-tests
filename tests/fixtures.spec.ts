import { test } from "@playwright/test";
import PageManager from "../pageObjects/PageManager";
import { faker } from "@faker-js/faker";

const formEmail = process.env.FORM_EMAIL;
const formPassword = process.env.FORM_PASSWORD;

if (!formEmail || !formPassword) {
  throw new Error("Form email/password env var is missing");
}

test.describe("Fixture tests", () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await page.goto("/");
  });
  
  test("'Using the grid' login", async () => {
    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().signinGrid(formEmail, formPassword, "Option 1");
  });
  
  test("'Inline form' login", async () => {
    await pm.navigateTo().formLayoutsPage();
  
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const userEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${faker.number.int(1000)}@test.com`;
  
    await pm.onFormLayoutsPage().signinInline(fullName, userEmail, true);
  });
});

