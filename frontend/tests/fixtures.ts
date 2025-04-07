import { Page, test as base } from '@playwright/test';
import { CREDENTIALS } from './utils/constants';

type Fixtures = {
  page: Page;
}

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await page.goto('login');
    await page.locator('input[name="username"]').fill(CREDENTIALS.valid.username);
    await page.locator('input[name="password"]').fill(CREDENTIALS.valid.password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForURL('/');
    await use(page);
  },
});

export { expect } from '@playwright/test';