import { test as base } from "@playwright/test";
import FormLayoutsPage from "./pageObjects/FormLayoutsPage";
import SideNav from "./pageObjects/SideNav";
import PageManager from "./pageObjects/PageManager";

type TestOptions = {
  formLayoutsPage: FormLayoutsPage;
  pageManager: PageManager;
};

export const test = base.extend<TestOptions>({
  page: async ({ page }, use) => {
    await page.goto("/");
    await use(page);
  },

  formLayoutsPage: async ({ page, isMobile }, use) => {
    const navigateTo = new SideNav(page);
    await navigateTo.formLayoutsPage(isMobile);
    await use(new FormLayoutsPage(page));
  },

  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});
