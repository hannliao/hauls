import { test, expect } from '@playwright/test';

const CREDENTIALS = {
  valid: {
    firstName: 'test',
    lastName: 'account',
    username: `tester_${Date.now()}`,
    password: 'hello123',
  },
  invalid: {
    username: 'tester',
    password: 'a',
  },
} as const;

test.describe('Sign Up Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('should display sign up form', async ({ page }) => {
    const header = page.getByRole('heading', { name: 'Sign Up' });
  
    await expect(header).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeEnabled();
  });

  test('should navigate to log in page', async ({ page }) => {
    await page.getByRole('link', { name: 'Log In' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  });

  test('should sign up with valid credentials', async ({ page }) => {
    await page.locator('input[name="firstName"]').fill(CREDENTIALS.valid.firstName);
    await page.locator('input[name="lastName"]').fill(CREDENTIALS.valid.lastName);
    await page.locator('input[name="username"]').fill(CREDENTIALS.valid.username);
    await page.locator('input[name="password"]').fill(CREDENTIALS.valid.password);
    await page.locator('input[name="confirmPwd"]').fill(CREDENTIALS.valid.password);
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  });

  test('should not sign up with invalid credentials', async ({ page }) => {
    await page.locator('input[name="firstName"]').fill(CREDENTIALS.valid.firstName);
    await page.locator('input[name="lastName"]').fill(CREDENTIALS.valid.lastName);
    await page.locator('input[name="username"]').fill(CREDENTIALS.invalid.username);
    await page.locator('input[name="password"]').fill(CREDENTIALS.invalid.password);
    await page.locator('input[name="confirmPwd"]').fill(CREDENTIALS.valid.password);
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await test.step('verify error messages', async () => {
      const errorMessages = page.getByTestId('error-message');
      await expect(errorMessages.nth(0)).toContainText('Username already taken');
      await expect(errorMessages.nth(1)).toContainText('Password must have at least 8');
      await expect(errorMessages.nth(2)).toContainText('Passwords do not match');
    })
    
    await expect(page).toHaveURL('/signup');
  });
});