import { test, expect } from '../fixtures';
import { haulForm } from '../data/haulForm';

test.beforeEach(async ({ page }) => {
  await page.goto('/new');
});

test.describe('@smoke Valid inputs', () => {
  test('should create a new haul', async ({ page }) => {
    await page.locator('input[name="dateOfPurchase"]').fill(haulForm.dateOfPurchase);
    await page.locator('input[name="storeName"]').fill(haulForm.storeName);
    await page.getByRole('textbox', { name: 'new item...' }).fill(haulForm.item);
    await page.getByRole('textbox', { name: 'new item...' }).press('Enter');
    await page.locator('input[name="price"]').first().fill(haulForm.price);
    await page.getByRole('button', { name: 'recommended' }).first().click();
    await page.getByRole('button', { name: 'Upload' }).click();
    
    await expect(page).toHaveURL(new RegExp(haulForm.slug));
    await expect(page.getByRole('heading', { name: haulForm.storeName })).toBeVisible();
    await expect(page.getByText(haulForm.formattedDate)).toBeVisible();
    await expect(page.getByText(haulForm.item)).toBeVisible();
    await expect(page.getByRole('img', { name: 'recommended' })).toBeVisible();
    await expect(page.getByText('$')).toContainText(haulForm.price);
  });
});

// test.describe('Item inputs', () => {
//   test('should delete item when delete button is clicked', async ({ page }) => {

//   })

//   test('should toggle recommended tag when clicked', ({ page }) => {

//   })

//   test('should not decrease quantity below 1', ({ page }) => {

//   })
// })

// test.describe('Invalid inputs', () => {
//   test('should require required fields to be filled', ({ page }) => {

//   })

//   test('should handle no items', ({ page }) => {

//   })
// })