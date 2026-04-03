import { type Page, expect } from "@playwright/test";

class DatePickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async daysFromToday(days: number) {
    const card = this.page.locator("nb-card").filter({ hasText: /common datepicker/i });
    const dateInput = card.getByPlaceholder(/form picker/i);
    await dateInput.click();
    
    const formattedDate = await this.dateSelector(days);
    await expect(dateInput).toHaveValue(formattedDate);
  };

  async rangeFromToday(dayStart: number, dayEnd: number) {
    const card = this.page.locator("nb-card").filter({ hasText: /datepicker with range/i });
    const dateInput = card.getByPlaceholder(/range picker/i);
    await dateInput.click();
    
    const startDate = await this.dateSelector(dayStart);
    const endDate = await this.dateSelector(dayEnd);
    const formattedDate = `${startDate} - ${endDate}`;
    await expect(dateInput).toHaveValue(formattedDate);
  };

  private async dateSelector(days: number) {
    const calendar = this.page.locator("nb-base-calendar");
    await expect(calendar).toBeVisible();
    const currentMonth = calendar.locator(".day-cell:not(.bounding-month)");

    let date = new Date();
    date.setDate(date.getDate() + days);
    // Convert calculated current date to string
    const expectedDate = date.getDate().toString();

    // Create date string to match expected calendar output value
    const monthShort = date.toLocaleString("en-GB", { month: "short" });
    const monthLong = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    const formattedDate = `${monthShort} ${expectedDate}, ${year}`;

    // Locate current month and year display
    const viewMode = calendar.locator("nb-calendar-view-mode");
    let currentMonthYear = await viewMode.textContent();

    // Located current month and year to match output
    const expectedMonthYear = ` ${monthLong} ${year} `;

    // Loop through each month and year until match
    // update currentMonthYear with latest text content if no match
    while (currentMonthYear !== expectedMonthYear) {
      const nextMonth = calendar.locator(".next-month");
      await nextMonth.click();
      currentMonthYear = await viewMode.textContent();
    };

    // Locate and select date from todays date
    const datePicker = currentMonth.getByText(expectedDate, { exact: true });
    await datePicker.click();

    // Return new formatted calculated date
    return formattedDate;
  };

}

export default DatePickerPage;
