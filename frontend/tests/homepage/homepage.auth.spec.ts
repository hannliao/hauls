import { test, expect } from '../fixtures';
import { CREDENTIALS } from '../utils/constants';

test.describe('Header', () => {
  test('should have heading', async ({ page }) => {
    const header = page.getByRole('heading', { name: 'hauls'});

    await expect(header).toBeVisible();
  });

  test('profile icon should open menu when logged in', async ({ page }) => {
    await page.getByRole('img', { name: 'profile' }).click();
    const profileLink = page.getByRole('banner').getByRole('link', { name: `@${CREDENTIALS.valid.username}` });
    const logoutButton = page.getByRole('button', { name: 'Log out' });

    await expect(profileLink).toBeVisible();
    await expect(logoutButton).toBeVisible();
  });

  test('username should navigate to user profile page', async ({ page }) => {
    await page.getByRole('img', { name: 'profile' }).click();

    const profileLink = page.getByRole('banner').getByRole('link', { name: `@${CREDENTIALS.valid.username}` });
    await profileLink.click();

    await expect(page).toHaveURL(`/${CREDENTIALS.valid.username}`);
    await expect(page.getByRole('heading', { name: 'test account' })).toBeVisible();
  });

  test('log out button should log user out', async ({ page }) => {
    await page.getByRole('img', { name: 'profile' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();

    await expect(page).toHaveURL('/login');
  });
})
