import { test, expect } from '@playwright/test'

test.describe('Bio - (en-US)', () => {
  test.use({ locale: 'en-US' })

  test('should display English contents', async ({ page }) => {
    await page.goto('/')
    expect(await page.title()).toBe('Jiwon Choi')
    expect(await page.textContent('h2')).toBe('Biography')
  })

  test('should redirect to "/" if "/en"', async ({ page }) => {
    await page.goto('/en')
    const pathname = new URL(page.url()).pathname
    expect(pathname).toBe('/')
  })
})
