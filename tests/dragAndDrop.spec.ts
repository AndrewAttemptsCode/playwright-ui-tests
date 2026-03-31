import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
  const consentPopUp = page.getByRole("button", { name: /consent/i });
  await consentPopUp.click();
});

test.describe("Drag and Drop", () => {
  test("Drag drop with iframes", async ({ page }) => {
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
    const photo = frame.getByRole("listitem").filter({ hasText: /high tatras 2/i });
    await expect(photo).toBeVisible();
    const trash = frame.locator("#trash");
    
    // Drag method
    await photo.dragTo(trash);
    await expect(trash).toContainText(/high tatras 2/i);

    // Precise control method
    const photo2 = frame.getByRole("listitem").filter({ hasText: /high tatras 4/i });
    await photo2.hover();
    await page.mouse.down();
    await trash.hover();
    await page.mouse.up();
    await expect(trash).toContainText(/high tatras 4/i);
  });
});