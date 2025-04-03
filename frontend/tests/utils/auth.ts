import { Page } from '@playwright/test';

const CREDENTIALS = {
  username: 'tester',
  password: 'hello123',
} as const;

export async function login(page: Page) {
  await page.goto('/login');
  await page.fill('input[name="username"]', CREDENTIALS.username);
  await page.fill('input[name="password"]', CREDENTIALS.password);
  await page.getByRole('button', { name: 'Log In' }).click();

  await page.waitForURL('/');
}