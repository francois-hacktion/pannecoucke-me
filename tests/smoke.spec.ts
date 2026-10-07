import { expect, test } from '@playwright/test'
import { gotoHydrated, sectionNav } from './helpers'

test.describe('parcours principaux', () => {
  test('bascule FR/EN : page de la langue, section conservée, choix mémorisé', async ({ page }) => {
    await gotoHydrated(page, '/#parcours')
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')

    await page.getByRole('navigation', { name: 'Langue' }).getByRole('link', { name: 'EN' }).click()
    await expect(page).toHaveURL(/\/en\/#parcours$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('section[data-anchor="parcours"]')).toBeInViewport()

    // "/" suit ensuite la langue mémorisée
    await page.goto('/')
    await expect(page).toHaveURL(/\/en\/$/)

    await page.getByRole('navigation', { name: 'Language' }).getByRole('link', { name: 'FR' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  })

  test('/en/ est servi en anglais', async ({ page }) => {
    await page.goto('/en/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('bascule du thème', async ({ page }) => {
    await gotoHydrated(page, '/')
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)
    await page.getByRole('button', { name: 'Passer en mode sombre' }).click()
    await expect(html).toHaveClass(/dark/)
    await page.getByRole('button', { name: 'Passer en mode clair' }).click()
    await expect(html).not.toHaveClass(/dark/)
  })

  test('accordéon du parcours : une seule ligne ouverte', async ({ page }) => {
    await gotoHydrated(page, '/')
    const toggles = page.locator('section[data-anchor="parcours"] button[aria-expanded]')
    const expanded = page.locator('section[data-anchor="parcours"] button[aria-expanded="true"]')
    expect(await toggles.count()).toBeGreaterThan(2)
    expect(await expanded.count()).toBeLessThanOrEqual(1)

    for (const index of [1, 2]) {
      const toggle = toggles.nth(index)
      await toggle.click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')
      await expect(expanded).toHaveCount(1)
      await expect(page.locator(`#${await toggle.getAttribute('aria-controls')}`)).not.toHaveAttribute('inert')
    }

    const last = toggles.nth(2)
    await last.click()
    await expect(last).toHaveAttribute('aria-expanded', 'false')
    await expect(expanded).toHaveCount(0)
  })

  test('lien profond #parcours', async ({ page }) => {
    await gotoHydrated(page, '/#parcours')
    await expect(page.locator('section[data-anchor="parcours"]')).toBeInViewport()
    await expect(sectionNav(page).getByRole('link', { name: 'Parcours' })).toHaveAttribute(
      'aria-current',
      'true',
    )
  })

  test('navigation vers Contact', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoHydrated(page, '/')
    await sectionNav(page).getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(/#contact$/)
    await expect(page.locator('section[data-anchor="contact"]')).toBeInViewport()
  })

  test('le CV PDF est servi', async ({ page, request }) => {
    await page.goto('/')
    const href = await page.locator('header a[download]').getAttribute('href')
    expect(href).toMatch(/\.pdf$/)
    const response = await request.get(href!)
    expect(response.ok()).toBe(true)
    expect(response.headers()['content-type']).toContain('pdf')
  })

  test('la photo se retourne puis revient', async ({ page }) => {
    await gotoHydrated(page, '/')
    const photo = page.getByRole('button', { name: 'Retourner la photo' })
    await photo.click()
    await expect(photo).toHaveAttribute('data-spinning', '')
    // Retour à la fin de la transition (800 ms)
    await expect(photo).not.toHaveAttribute('data-spinning', { timeout: 3000 })
  })
})
