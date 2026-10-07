import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { LANGUAGES, freezeMotion, useDarkTheme } from './helpers'

const WCAG_22_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

for (const { lang, path } of LANGUAGES) {
  for (const theme of ['clair', 'sombre'] as const) {
    for (const width of [390, 1280]) {
      test(`${lang} ${theme} ${width}px : 0 violation axe WCAG 2.2 AA`, async ({ page }) => {
        if (theme === 'sombre') await useDarkTheme(page)
        await page.setViewportSize({ width, height: 900 })
        await page.goto(path)
        // Sans cela, axe mesure des couleurs en pleine transition (faux positifs de contraste)
        await freezeMotion(page)
        await expect(page.locator('html')).toHaveClass(theme === 'sombre' ? /dark/ : /^(?!.*dark)/)

        const { violations } = await new AxeBuilder({ page }).withTags(WCAG_22_AA).analyze()
        const summary = violations.map((v) => `${v.id} (${v.nodes.length}) : ${v.help}`)
        expect(summary).toEqual([])
      })
    }
  }
}
