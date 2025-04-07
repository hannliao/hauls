import { test, expect, Page } from '@playwright/test';
import { CREDENTIALS } from '../utils/constants'

interface LoginCredentials {
  username: string;
  password: string;
}

test.describe('Log In Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display log in form', async ({ page }) => {
    const header = page.getByRole('heading', { name: 'Log In' });
  
    await expect(header).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeEnabled();
  });

  test('should navigate to sign up page', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign Up' }).click();

    await expect(page).toHaveURL('/signup');
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
  })
  
  test('should log in with valid credentials', async ({ page }) => {
    await fillLoginForm(page, CREDENTIALS.valid);
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page).toHaveURL('/')
  });

  test('should not log in with invalid username', async ({ page }) => {
    await fillLoginForm(page, {
      username: CREDENTIALS.invalid.username,
      password: CREDENTIALS.valid.password,
    });
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByText('Username does not exist')).toBeVisible();
  })

  test('should not log in with invalid password', async ({ page }) => {
    await fillLoginForm(page, {
      username: CREDENTIALS.valid.username,
      password: CREDENTIALS.invalid.password,
    });
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByText('Incorrect password')).toBeVisible();
  })
})

async function fillLoginForm(page: Page, credentials: LoginCredentials): Promise<void> {
  await page.locator('input[name="username"]').fill(credentials.username);
  await page.locator('input[name="password"]').fill(credentials.password);
}