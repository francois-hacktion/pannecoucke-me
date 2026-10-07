import { expect, test } from '@playwright/test'
import { LANGUAGES } from './helpers'

/**
 * "Me contacter" et le CV visibles dès le premier écran, sans défiler.
 * Hauteurs utiles, barres du navigateur déduites : téléphones en portrait (iPhone SE avec Safari : 375×553),
 * tablettes, demi-écran et PC. Hors cible : téléphones à l'horizontale (~340px utiles, l'en-tête
 * et la nav en prennent déjà le tiers) et écrans de moins de 360px de large.
 */
const VIEWPORTS = [
  [360, 560],
  [375, 553],
  [390, 664],
  [412, 732],
  [430, 750],
  [640, 720],
  [768, 700],
  [840, 700],
  [1024, 640],
  [1280, 600],
  [1366, 640],
  [1920, 950],
] as const

for (const { lang, path } of LANGUAGES) {
  for (const [width, height] of VIEWPORTS) {
    test(`${lang} ${width}×${height} : boutons de contact et de CV dans le premier écran`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto(path)
      const hero = page.locator('section[data-anchor="profil"]')
      for (const link of [hero.locator('a[href^="mailto:"]'), hero.locator('a[download]')]) {
        await expect(link).toBeInViewport({ ratio: 1 })
      }
    })
  }
}
