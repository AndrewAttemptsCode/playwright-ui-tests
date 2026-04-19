import { test } from "../test-options";
import { faker } from "@faker-js/faker";

const formEmail = process.env.FORM_EMAIL;
const formPassword = process.env.FORM_PASSWORD;

if (!formEmail || !formPassword) {
  throw new Error("Form email/password env var is missing");
}

test.describe("Fixture tests", () => {
  
  test("'Using the grid' login", async ({ formLayoutsPage }) => {
    await formLayoutsPage.signinGrid(formEmail, formPassword, "Option 1");
  });
  
  test("'Inline form' login", async ({ formLayoutsPage }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const userEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${faker.number.int(1000)}@test.com`;
  
    await formLayoutsPage.signinInline(fullName, userEmail, true);
  });

  test("'Using the grid' login using page manager fixture", async ({ pageManager, isMobile }) => {
    await pageManager.navigateTo().formLayoutsPage(isMobile);
    await pageManager.onFormLayoutsPage().signinGrid(formEmail, formPassword, "Option 2");
  });
});

