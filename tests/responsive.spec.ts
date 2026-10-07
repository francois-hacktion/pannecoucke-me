import { expect, test } from '@playwright/test'
import { LANGUAGES, sectionNav } from './helpers'

// Téléphones (320 à 430), point de rupture sm (640), tablettes, nav (880), wide (1080), bureau
const WIDTHS = [320, 360, 375, 390, 412, 430, 480, 640, 768, 879, 880, 1024, 1080, 1280, 1440]

for (const { lang, path, sections } of LANGUAGES) {
  for (const width of WIDTHS) {
    test(`${lang} ${width}px : ni débordement ni bouton de nav hors écran`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto(path)

      const overflow = await page.evaluate(() => {
        const main = document.querySelector('main')!
        return {
          page: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          main: main.scrollWidth - main.clientWidth,
        }
      })
      expect(overflow.page, 'défilement horizontal de la page').toBeLessThanOrEqual(0)
      expect(overflow.main, 'défilement horizontal de <main>').toBeLessThanOrEqual(0)

      // Nav visible : barre sticky sous 880px, headerbar au-dessus
      const nav = sectionNav(page, sections)
      await expect(nav).toHaveCount(1)
      const links = nav.getByRole('link')
      await expect(links).toHaveCount(5)

      if (width < 880) {
        const sticky = await nav.evaluate((el) => {
          const bar = el.parentElement!
          return bar.scrollWidth - bar.clientWidth
        })
        expect(sticky, 'débordement de la barre de nav sticky').toBeLessThanOrEqual(0)
      }

      // Les boutons restent dans la nav : sinon ils mangent la marge intérieure de la barre
      // sans que scrollWidth ne le signale
      const spill = await nav.evaluate((el) => {
        const last = el.lastElementChild!.getBoundingClientRect().right
        return Math.round(last - el.getBoundingClientRect().right)
      })
      expect(spill, 'boutons qui dépassent de la nav').toBeLessThanOrEqual(0)

      for (const link of await links.all()) {
        const box = (await link.boundingBox())!
        expect(box.x, `${await link.textContent()} : bord gauche`).toBeGreaterThanOrEqual(0)
        expect(box.x + box.width, `${await link.textContent()} : bord droit`).toBeLessThanOrEqual(width)
      }
    })
  }
}
