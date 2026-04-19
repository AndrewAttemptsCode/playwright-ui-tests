import { expect, type Page, type Locator } from "@playwright/test";
import BaseHelper from "./BaseHelper";

class SideNav extends BaseHelper {
  readonly formLayoutsLink: Locator;
  readonly formLayoutsHeader: Locator;
  readonly datepickerLink: Locator;
  readonly datepickerHeader: Locator;
  readonly smartTableLink: Locator;
  readonly smartTableHeader: Locator;
  readonly toastrLink: Locator;
  readonly toastrHeader: Locator;
  readonly tooltipLink: Locator;
  readonly tooltipHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.formLayoutsLink = this.page.getByRole("link", { name: /form layouts/i });
    this.formLayoutsHeader = this.page.locator("nb-card-header", { hasText: /using the grid/i });
    this.datepickerLink = this.page.getByRole("link", { name: /datepicker/i });
    this.datepickerHeader = this.page.locator("nb-card-header", { hasText: /common datepicker/i });
    this.smartTableLink = this.page.getByRole("link", { name: /smart table/i });
    this.smartTableHeader = this.page.locator("nb-card-header", { hasText: /smart table/i });
    this.toastrLink = this.page.getByRole("link", { name: /toastr/i });
    this.toastrHeader = this.page.locator("nb-card-header", { hasText: /toaster configuration/i });
    this.tooltipLink = this.page.getByRole("link", { name: /tooltip/i });
    this.tooltipHeader = this.page.locator("nb-card-header", { hasText: /tooltip with icon/i });
  }

  async formLayoutsPage(isMobile: boolean) {
    if (isMobile) {
      await this.page.locator(".sidebar-toggle").click();
    }

    await this.selectNavGroupLink("Forms");
    await this.formLayoutsLink.click();

    if (isMobile) {
      await this.page.locator(".sidebar-toggle").click();
    }

    await this.waitForLoad();
    await expect(this.formLayoutsHeader).toBeVisible();
  }

  async datepickerPage() {
    await this.selectNavGroupLink("Forms");
    await this.datepickerLink.click();
    await expect(this.datepickerHeader).toBeVisible();
  }

  async smartTablePage() {
    await this.selectNavGroupLink("Tables & Data");
    await this.smartTableLink.click();
    await expect(this.smartTableHeader).toBeVisible();
  }

  async toastrPage() {
    await this.selectNavGroupLink("Modal & Overlays");
    await this.toastrLink.click();
    await expect(this.toastrHeader).toBeVisible();
  }

  async tooltipPage() {
    await this.selectNavGroupLink("Modal & Overlays");
    await this.tooltipLink.click();
    await expect(this.tooltipHeader).toBeVisible();
  }

  private async selectNavGroupLink(linkTitle: string) {
    const groupNavLink = this.page.getByRole("link", { name: linkTitle });
    const linkExpanded = await groupNavLink.getAttribute("aria-expanded");
    if (linkExpanded === "false") await groupNavLink.click();
  }

}

export default SideNav;
