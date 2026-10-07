import { expect, type Page } from '@playwright/test'

export const LANGUAGES = [
  { lang: 'fr', path: '/', sections: 'Sections du CV', language: 'Langue' },
  { lang: 'en', path: '/en/', sections: 'Resume sections', language: 'Language' },
] as const

/** Navigation des sections visible : headerbar dès 880px, barre sticky en dessous */
export const sectionNav = (page: Page, label: string = LANGUAGES[0].sections) =>
  page.locator(`nav[aria-label="${label}"]:visible`)

/**
 * Le client s'hydrate après la première frame (scripts/prerender.mjs) :
 * on attend que React se soit attaché aux boutons avant d'interagir.
 */
export async function gotoHydrated(page: Page, path: string) {
  await page.goto(path)
  await expect
    .poll(() =>
      page.evaluate(() => {
        const button = document.querySelector('header button')
        return !!button && Object.keys(button).some((key) => key.startsWith('__reactProps'))
      }),
    )
    .toBe(true)
}

/** Coupe transitions et animations : évite les faux positifs de contraste et les captures instables. */
export async function freezeMotion(page: Page) {
  await page.addStyleTag({
    content: '*,*::before,*::after{transition:none!important;animation:none!important}',
  })
}

/** Thème sombre posé comme le fait le script inline de index.html, avant le premier rendu. */
export async function useDarkTheme(page: Page) {
  await page.addInitScript(() => localStorage.setItem('resume-theme', 'dark'))
}
