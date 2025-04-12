import { test } from '@playwright/test';

test.use({ trace: 'on' });

test('Debug auth flow', async ({ page }) => {
  console.log('Starting auth debug test');
  
  // Navigate to login page
  await page.goto('/login');
  console.log('On login page');
  
  // Fill credentials SLOWLY with explicit waiting
  await page.locator('input[name="email"]').waitFor();
  await page.locator('input[name="email"]').fill('your-test-email@example.com');
  console.log('Email filled');
  
  await page.locator('input[name="password"]').waitFor();
  await page.locator('input[name="password"]').fill('your-test-password');
  console.log('Password filled');
  
  // Click with waiting
  const loginButton = page.getByRole('button', { name: 'Log In' });
  await loginButton.waitFor();
  console.log('Login button found');
  
  // Take screenshot before clicking
  await page.screenshot({ path: 'before-login.png' });
  
  await loginButton.click();
  console.log('Login button clicked');
  
  // Try different waiting strategies
  try {
    console.log('Waiting for navigation events...');
    await Promise.race([
      page.waitForURL('/', { timeout: 60000 }).then(() => console.log('URL navigation succeeded')),
      page.waitForLoadState('networkidle', { timeout: 60000 }).then(() => console.log('Network idle')),
      page.waitForSelector('body', { timeout: 60000 }).then(() => console.log('Body loaded'))
    ]);
  } catch (e) {
    console.log('All waiting strategies failed:', e);
    await page.screenshot({ path: 'after-login-failure.png' });
  }
  
  // Current URL and page content for debugging
  console.log('Current URL:', page.url());
  console.log('Page content snippet:', await page.content().then(c => c.substring(0, 500)));
});