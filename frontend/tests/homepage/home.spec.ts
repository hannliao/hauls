import { test, expect } from '@playwright/test';
import { login } from '../utils/auth';

test.beforeEach(async ({ page }) => {
  await login(page);
});

const USER = {
  username: 'tester',
  name: 'test account',
} as const;

test.describe('Header', () => {
  test('should have heading', async ({ page }) => {
    const header = page.getByRole('heading', { name: 'hauls'});

    await expect(header).toBeVisible();
  });

  test('profile icon should open menu with username and Log out', async ({ page }) => {
    await page.getByRole('img', { name: 'profile' }).click();
    const profileLink = page.getByRole('banner').getByRole('link', { name: `@${USER.username}` });
    const logoutButton = page.getByRole('button', { name: 'Log out' });

    await expect(profileLink).toBeVisible();
    await expect(logoutButton).toBeVisible();
  });

  test('username should navigate to user profile page', async ({ page }) => {
    await page.getByRole('img', { name: 'profile' }).click();

    const profileLink = page.getByRole('banner').getByRole('link', { name: `@${USER.username}` });
    await profileLink.click();

    await expect(page).toHaveURL(`/${USER.username}`);
    await expect(page.getByRole('heading', { name: 'test account' })).toBeVisible();
  });

  test('log out button should log user out', async ({ page }) => {
    await page.getByRole('img', { name: 'profile' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();

    await expect(page).toHaveURL('/login');
  });
})

