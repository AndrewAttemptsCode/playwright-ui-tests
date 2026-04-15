import { test as base } from "@playwright/test";
import FormLayoutsPage from "./pageObjects/FormLayoutsPage";
import SideNav from "./pageObjects/SideNav";

type TestOptions = {
  formLayoutsPage: FormLayoutsPage;
};

export const test = base.extend<TestOptions>({
  formLayoutsPage: async ({ page }, use) => {
    await page.goto("/");
    const navigateTo = new SideNav(page);
    await navigateTo.formLayoutsPage();
    await use(new FormLayoutsPage(page));
  },
});
