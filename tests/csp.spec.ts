import { expect, test } from '@playwright/test'
import { LANGUAGES } from './helpers'

// Sans contournement : la CSP de la page (balise meta générée par Astro) doit tout autoriser
test.use({ bypassCSP: false })

for (const { lang, path } of LANGUAGES) {
  test(`${lang} : aucune violation de la CSP, interactions branchées`, async ({ page }) => {
    const violations: string[] = []
    await page.addInitScript(() => {
      document.addEventListener('securitypolicyviolation', (event) => {
        ;(window as unknown as { __csp: string[] }).__csp ??= []
        ;(window as unknown as { __csp: string[] }).__csp.push(`${event.violatedDirective} ${event.blockedURI}`)
      })
    })
    page.on('console', (message) => {
      if (/Content Security Policy/i.test(message.text())) violations.push(message.text())
    })
    await page.goto(path)
    await expect(page.locator('html')).toHaveAttribute('data-ready', '')
    await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveCount(1)
    const reported = await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? [])
    expect([...reported, ...violations]).toEqual([])
  })
}
