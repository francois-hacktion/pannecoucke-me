import { expect, type Page } from '@playwright/test'

export const LANGUAGES = [
  { lang: 'fr', path: '/', sections: 'Sections du CV', language: 'Langue' },
  { lang: 'en', path: '/en/', sections: 'Resume sections', language: 'Language' },
] as const

/** Navigation des sections visible : headerbar dès 880px, barre sticky en dessous */
export const sectionNav = (page: Page, label: string = LANGUAGES[0].sections) =>
  page.locator(`nav[aria-label="${label}"]:visible`)

/** Attend que src/scripts/app.ts ait branché les interactions (html[data-ready]). */
export async function gotoHydrated(page: Page, path: string) {
  await page.goto(path)
  await expect(page.locator('html')).toHaveAttribute('data-ready', '')
}

/** Coupe transitions et animations : évite les faux positifs de contraste et les captures instables. */
export async function freezeMotion(page: Page) {
  await page.addStyleTag({
    content: '*,*::before,*::after{transition:none!important;animation:none!important}',
  })
}

/** Thème sombre mémorisé : appliqué par le script inline de layouts/Base.astro, avant le premier affichage. */
export async function useDarkTheme(page: Page) {
  await page.addInitScript(() => localStorage.setItem('resume-theme', 'dark'))
}
