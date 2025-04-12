import { Page, test as base } from '@playwright/test';
import { credentials } from './data/credentials';

type Fixtures = {
  page: Page;
}

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await page.goto('login');
    await page.locator('input[name="username"]').fill(credentials.valid.username);
    await page.locator('input[name="password"]').fill(credentials.valid.password);
    await page.getByRole('button', { name: 'Log In' }).click();
    // await page.waitForURL('/');
    await page.getByRole('heading', { name: /hauls/i }).waitFor();
    await use(page);
  },
});

export { expect } from '@playwright/test';