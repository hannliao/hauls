import { test, expect } from '@playwright/test';

test('profile icon should route to login when not logged in', async ({ page }) => {
  await page.getByRole('img', { name: 'profile' }).click();

  await expect(page).toHaveURL('/login');
});