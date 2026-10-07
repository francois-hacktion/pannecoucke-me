import { defineConfig, devices } from '@playwright/test'

/**
 * Tests de bout en bout sur le build de production (HTML pré-rendu puis hydraté),
 * servi par astro preview. Lancer `npm run build` avant `npm test`.
 * Chromium complet (channel chromium) et non chrome-headless-shell : ce dernier élargit le texte
 * d'environ 7 % (pas de positionnement sous-pixel), loin du rendu des téléphones.
 * PLAYWRIGHT_CHROMIUM : chemin d'un Chromium déjà installé, si sa version diffère de celle attendue.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM || undefined

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    // Les tests injectent du CSS (transitions coupées) : la CSP est vérifiée à part (tests/csp.spec.ts)
    bypassCSP: true,
  },
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' },
  },
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium', launchOptions: { executablePath } },
    },
  ],
  webServer: {
    command: 'npx astro preview --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
})
