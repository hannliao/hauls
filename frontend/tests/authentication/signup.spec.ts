import { test, expect } from '@playwright/test';
import { credentials } from '../data/credentials'

test.describe('Sign Up Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('@smoke should display sign up form', async ({ page }) => {
    const header = page.getByRole('heading', { name: 'Sign Up' });
  
    await expect(header).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeEnabled();
  });

  test('@smoke should navigate to log in page', async ({ page }) => {
    await page.getByRole('link', { name: 'Log In' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  });

  test('@smoke should sign up with valid credentials', async ({ page }) => {
    await page.locator('input[name="firstName"]').fill(credentials.valid.firstName);
    await page.locator('input[name="lastName"]').fill(credentials.valid.lastName);
    await page.locator('input[name="username"]').fill(credentials.valid.username);
    await page.locator('input[name="password"]').fill(credentials.valid.password);
    await page.locator('input[name="confirmPwd"]').fill(credentials.valid.password);
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  });

  test('@smoke should not sign up with invalid credentials', async ({ page }) => {
    await page.locator('input[name="firstName"]').fill(credentials.valid.firstName);
    await page.locator('input[name="lastName"]').fill(credentials.valid.lastName);
    await page.locator('input[name="username"]').fill(credentials.invalid.existingUsername);
    await page.locator('input[name="password"]').fill(credentials.invalid.shortPwd);
    await page.locator('input[name="confirmPwd"]').fill(credentials.invalid.password);
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