import { expect, test } from '@playwright/test'
import { LANGUAGES, freezeMotion, useDarkTheme } from './helpers'

/**
 * Captures de référence : elles figent le rendu actuel pour la migration vers Astro (étape 3).
 * Le rendu des polices varie selon l'OS : références générées sous Linux, rejouées en CI.
 * Mettre à jour : `npm run test:update` sous Linux, puis vérifier les images avant de committer.
 */
const WIDTHS = [360, 412, 768, 1280]

for (const { lang, path } of LANGUAGES) {
  for (const theme of ['clair', 'sombre'] as const) {
    for (const width of WIDTHS) {
      test(`${lang} ${theme} ${width}px`, { tag: '@visual' }, async ({ page }) => {
        test.skip(process.platform !== 'linux', 'Références générées sous Linux')
        if (theme === 'sombre') await useDarkTheme(page)
        await page.setViewportSize({ width, height: 900 })
        await page.goto(path)
        await freezeMotion(page)
        await page.evaluate(() => document.fonts.ready)
        await page.locator('section[data-anchor="profil"] img').evaluate(
          (img: HTMLImageElement) => img.complete || new Promise((resolve) => (img.onload = resolve)),
        )
        await expect(page).toHaveScreenshot(`${lang}-${theme}-${width}.png`)
      })
    }
  }
}
