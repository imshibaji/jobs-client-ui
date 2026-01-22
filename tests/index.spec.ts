import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto("http://localhost:8080/");

  await expect(page).toHaveTitle('JobsForWomen.com – Empowering Women, One Job at a Time');
});