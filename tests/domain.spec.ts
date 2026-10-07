import { expect, test } from '@playwright/test'

/**
 * Domaine unique sans fonction serveur : le script inline de layouts/Base.astro renvoie les autres
 * adresses vers pannecoucke.me. Les pages du build sont servies sous chaque nom d'hôte (requêtes
 * interceptées), pannecoucke.me répond par une page vide : aucun accès réseau.
 */
async function serveBuildAs(page: import('@playwright/test').Page, origin: string) {
  await page.route(`${origin}/**`, async (route) => {
    const path = new URL(route.request().url()).pathname
    const response = await page.request.get(`http://localhost:4173${path}`)
    await route.fulfill({ response })
  })
  await page.route('https://pannecoucke.me/**', (route) => route.fulfill({ body: '<!doctype html><title>ok</title>', contentType: 'text/html' }))
}

for (const host of ['www.pannecoucke.me', 'pannecoucke-me.pages.dev']) {
  test(`${host} renvoie vers pannecoucke.me, chemin et section conservés`, async ({ page }) => {
    await serveBuildAs(page, `https://${host}`)
    await page.goto(`https://${host}/en/#parcours`)
    await expect(page).toHaveURL('https://pannecoucke.me/en/#parcours')
  })
}

test('un aperçu de PR reste consultable', async ({ page }) => {
  const origin = 'https://ma-branche.pannecoucke-me.pages.dev'
  await serveBuildAs(page, origin)
  await page.goto(`${origin}/`)
  await expect(page.locator('html')).toHaveAttribute('data-ready', '')
  await expect(page).toHaveURL(`${origin}/`)
})

test('ancien lien ?lang=en : page anglaise', async ({ page }) => {
  await page.goto('/?lang=en')
  await expect(page).toHaveURL(/\/en\/$/)
})
