import { test, expect } from "@playwright/test";
import PageManager from "../pageObjects/PageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Form layouts page", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
    await page.getByRole("link", { name: /forms/i }).click();
    await page.getByRole("link", { name: /form layouts/i }).click();
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
  });

  test("Input fields", async ({ page }) => {
    const loginForm = page
      .locator("nb-card")
      .filter({ hasText: /using the grid/i });
    const emailField = loginForm.getByRole("textbox", { name: "Email" });
    // Fill email input field with value
    await emailField.fill("test@test.com");
    // Clear email input field of value
    await emailField.clear();
    // Typing email input field with value and delay
    await emailField.pressSequentially("test@test.com", { delay: 100 });

    // Expect email to have a value
    await expect(emailField).toHaveValue("test@test.com");
  });

  test("Radio buttons", async ({ page }) => {
    const loginForm = page
      .locator("nb-card")
      .filter({ hasText: /using the grid/i });
    
    // Check radio option 1
    const radioButton1 = loginForm.getByRole("radio", { name: /option 1/i });
    await radioButton1.check({ force: true });

    // Validate radio option 1 is checked
    await expect(radioButton1).toBeChecked();

    // Check radio option 2
    const radioButton2 = loginForm.getByRole("radio", { name: /option 2/i });
    await radioButton2.check({ force: true });

    // Validate radio option 2 is checked
    await expect(radioButton2).toBeChecked();

    // Validate radio option 1 is no longer checked
    await expect(radioButton1).not.toBeChecked();
  });
});

test.describe("Modal & Overlays page", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
    await page.getByRole("link", { name: /modal & overlays/i }).click();
    await page.getByRole("link", { name: /toastr/i }).click();
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
  });

  test("Checkboxes", async ({ page }) => {
    // Uncheck first checkbox
    const firstCheckbox = page.getByRole("checkbox", { name: /hide on click/i });
    await firstCheckbox.uncheck({ force: true });
    await expect(firstCheckbox).not.toBeChecked();

    // Check second checkbox
    const secondCheckbox = page.getByRole("checkbox", { name: /prevent arising/i });
    await secondCheckbox.check({ force: true });
    await expect(secondCheckbox).toBeChecked();

    // Check ALL checkboxes
    const allCheckboxes = page.getByRole("checkbox");
    for (const checkbox of await allCheckboxes.all()) {
      await checkbox.check({ force: true });
      await expect(checkbox).toBeChecked();
    };

    // Uncheck ALL checkboxes
    for (const checkbox of await allCheckboxes.all()) {
      await checkbox.uncheck({ force: true });
      await expect(checkbox).not.toBeChecked();
    };
  });  
});

test.describe("Lists and Dropdowns", () => {
  test("Theme selection", async ({ page, isMobile }) => {
    test.skip(isMobile, "Not supported on mobile");
    // Narrow to button in header
    const themeSelect = page.locator("ngx-header nb-select");
    // Click theme select button
    await themeSelect.click();
    // Narrow list role by tag selector
    const optionList = page.getByRole("list").locator("nb-option");
    // Expect list to contain correct options
    await expect(optionList).toHaveText([/light/i, /dark/i, /cosmic/i, /corporate/i]);
    // Narrow theme to dark mode option
    const darkMode = optionList.filter({ hasText: /dark/i });
    // Click dark mode theme
    await darkMode.click();
    // Expect theme button to display dark
    await expect(themeSelect).toHaveText(/dark/i);
    // Target header element
    const header = page.locator("nb-layout-header");
    // Expect updated header background theme color 
    await expect(header).toHaveCSS("background-color", "rgb(34, 43, 69)");

    // Header bg color themes
    const colors = {
      "Light": "rgb(255, 255, 255)",
      "Dark": "rgb(34, 43, 69)",
      "Cosmic": "rgb(50, 50, 89)",
      "Corporate": "rgb(255, 255, 255)"
    }

    // Loop through each theme in the theme list
    // Expect header bg to match colors object entries
    for (const [themeName, bgColor] of Object.entries(colors)) {
      await themeSelect.click();
      const option = optionList.filter({ hasText: themeName });
      await option.click();
      await expect(header).toHaveCSS("background-color", bgColor);
    }
  });
});

test.describe("Tooltips", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
    await page.getByRole("link", { name: /modal & overlays/i }).click();
    await page.getByRole("link", { name: /tooltip/i }).click();
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
  });

  test("Tooltip on button hover", async ({ page }) => {
    // Locate card with tooltip buttons
    const card = page.locator("nb-card").filter({ hasText: /tooltip placements/i });
    // Identify top button
    const button = card.getByRole("button", { name: /top/i });
    // Apply hover state to the button
    await button.hover();
    // Locate the tooltip element
    const tooltip = page.locator("nb-tooltip");
    // Expect tooltip to be active on element hover
    await expect(tooltip).toHaveText(/this is a tooltip/i);
    // Move mouse away from button element to remove hover state
    await page.mouse.move(0, 0);
    // Expect tooltip to be inactive
    await expect(tooltip).toBeHidden();
  });
});

test.describe("Dialog boxes", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
    await page.getByRole("link", { name: /tables & data/i }).click();
    await page.getByRole("link", { name: /smart table/i }).click();
    if (isMobile) {
      await page.locator(".sidebar-toggle").click();
    }
  });
  
  test("Interact with browser dialog box", async ({ page }) => {
    // Browser API event listener for dialog pop up
    page.on("dialog", dialog => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
    });
    
    // Identify smart table
    const table = page.getByRole("table");
    // Identify first table row via username
    const tableRow = table.locator("tr").filter({ hasText: /@mdo/i });
    // Identify remove table row button via class name
    const removeButton = tableRow.locator(".nb-trash");
    // Click remove table row button
    await removeButton.click();
    // Expect table row to no longer be in the table
    await expect(tableRow).not.toBeVisible();
  });
});

test.describe("Web tables", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().smartTablePage(isMobile);
  });

  test("Edit table row data", async ({ page }) => {
    // Identify smart table
    const table = page.getByRole("table");
    // Identify first table row via username
    const tableRow = table.getByRole("row").filter({ hasText: /@twitter/i });
    // Identify edit item button
    const editButton = tableRow.locator(".nb-edit");
    // Enable edit mode for table row data
    await editButton.click();
    // Locate Age input field
    const ageInputField = page.locator("input-editor").getByPlaceholder("Age");
    // Update Age cell with age 20
    await ageInputField.fill("20");
    // Locate confirm edit button
    const confirmButton = page.locator(".nb-checkmark");
    // Click confirm changes button
    await confirmButton.click();
    // Locate age data of updated row
    const ageData = tableRow.locator("td:nth-child(7)");
    // Expect updated changes in Age field
    await expect(ageData).toHaveText("20");
  });

  test("Edit mode via ID column", async ({ page }) => {
    // Navigate to second table page
    const paginator = page.locator(".ng2-smart-pagination").getByRole("link", { name: "2" })
    await paginator.click();
    // Identify smart table
    const table = page.getByRole("table");
    // Identify all table rows
    const tableRows = table.getByRole("row");
    // Identify ID column with specified ID
    const rowById = tableRows.filter({ has: page.locator("td:nth-child(2)", { hasText: "11" }) });
    // Enable edit mode via ID
    const editButton = rowById.locator(".nb-edit");
    await editButton.click();
    // Locate Email input field
    const emailInputField = page.locator("input-editor").getByPlaceholder("E-mail");
    // Update email cell with new email
    await emailInputField.fill("test@test.com");
    // Locate confirm edit button
    const confirmButton = page.locator(".nb-checkmark");
    // Click confirm changes button
    await confirmButton.click();
    // Locate email data of updated row
    const emailData = rowById.locator("td:nth-child(6)");
    // Expect email to be updated to latest value
    await expect(emailData).toHaveText("test@test.com");
  });

  test("Filtering by age input", async ({ page }) => {
    const ages = ["20", "30", "40", "200"];
    const ageFilter = page.locator("input-filter").getByPlaceholder("Age");
    
    for (const age of ages) {
      await ageFilter.clear();
      await ageFilter.fill(age);
      await page.waitForTimeout(500);
      const tableRows = page.locator("tbody").getByRole("row");
      
      for (const row of await tableRows.all()) {
        const ageValue = row.locator("td:nth-child(7)");
        if (age === "200") {
          await expect(tableRows).toHaveText("No data found");
        } else {
          await expect(ageValue).toHaveText(age); 
        }
      };
    };

  });
});

test.describe("Date picker", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().datepickerPage(isMobile);
  });

  test("Pick a date from calendar", async ({ page }) => {
    const card = page.locator("nb-card").filter({ hasText: /common datepicker/i });
    const dateInput = card.getByPlaceholder("Form Picker");
    await dateInput.click();
    const calendar = page.locator("nb-calendar");
    await expect(calendar).toBeVisible();
    const currentMonth = calendar.locator(".day-cell.ng-star-inserted:not(.bounding-month)");
    const firstDayOfMonth = currentMonth.getByText("1", { exact: true });
    await firstDayOfMonth.click();
    expect(dateInput).not.toBe("");
  });

  test("Pick exact date from calendar", async ({ page }) => {
    const card = page.locator("nb-card").filter({ hasText: /common datepicker/i });
    const dateInput = card.getByPlaceholder("Form Picker");
    await dateInput.click();
    const calendar = page.locator("nb-calendar");
    await expect(calendar).toBeVisible();
    const overviewSelector = calendar.locator("nb-calendar-view-mode").getByRole("button");
    await overviewSelector.click();
    const yearSelector = calendar.locator("nb-calendar-year-picker").getByText("2026");
    await yearSelector.click();
    const monthSelector = calendar.locator("nb-calendar-month-picker").getByText("Jun");
    await monthSelector.click();
    const currentMonth = calendar.locator(".day-cell:not(.bounding-month)");
    const secondDayOfMonth = currentMonth.getByText("2", { exact: true });
    await secondDayOfMonth.click();
    await expect(dateInput).toHaveValue("Jun 2, 2026");
  });

  test("Pick 64 days from today", async ({ page }) => {
    const card = page.locator("nb-card").filter({ hasText: /common datepicker/i });
    const dateInput = card.getByPlaceholder("Form Picker");
    await dateInput.click();
    const calendar = page.locator("nb-calendar");
    await expect(calendar).toBeVisible();
    const currentMonth = calendar.locator(".day-cell:not(.bounding-month)");

    // Get current date plus 64 days
    let date = new Date();
    date.setDate(date.getDate() + 64);
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

    // Locate and select 64th date from todays date
    const datePicker = currentMonth.getByText(expectedDate, { exact: true });
    await datePicker.click();
    await expect(dateInput).toHaveValue(formattedDate);
  });
});

test.describe("Sliders", () => {
  test("Set to maximum temperature", async ({ page }) => {
    // Hacky, direct DOM manipulation using evaluate.
    const tempSlider = page.locator('nb-tab[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await tempSlider.evaluate(element => {
      element.setAttribute("cx", "232.630");
      element.setAttribute("cy", "232.630");
    });
    await tempSlider.click();
  });

  test("Set temperature to min and max", async ({ page }) => {
    // Using element bounding box and mouse movements
    const tempContainer = page.locator('nb-tab[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempContainer.scrollIntoViewIfNeeded();
    
    const tempBox = await tempContainer.boundingBox();
    if (!tempBox) throw new Error("Temperature slider not visible");

    const x = tempBox.x + tempBox.width / 2;
    const y = tempBox.y + tempBox.height / 2;

    // Move slider with mouse to 30C
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 150, y + 150, { steps: 15 });
    await page.mouse.up();

    await expect(tempContainer).toContainText("30");

    // Move slider with mouse to 12C
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x - 150, y + 150, { steps: 15 });
    await page.mouse.up();

    await expect(tempContainer).toContainText("12");
  });

});
