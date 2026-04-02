import { test } from "@playwright/test";
import FormLayoutsPage from "../pageObjects/FormLayoutsPage";
import SideNav from "../pageObjects/SideNav";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("'Using the grid' login", async ({ page }) => {
  const navigate = new SideNav(page);
  await navigate.navFormLayouts();

  const form = new FormLayoutsPage(page);
  await form.signinGrid("email@email.com", "password123", "Option 1");
});

test("'Inline form' login", async ({ page }) => {
  const navigate = new SideNav(page);
  await navigate.navFormLayouts();

  const form = new FormLayoutsPage(page);
  await form.signinInline("Andrew", "test@test.com", true);
  await form.signinInline("Bob", "email@email.com", false);
});
