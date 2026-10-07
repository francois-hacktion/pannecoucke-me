import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

/**
 * Site statique : une page HTML par langue (/ et /en/), sans JavaScript de framework.
 * Les interactions (thème, navigation, accordéon, photo) sont des scripts natifs (src/scripts).
 */
export default defineConfig({
  site: 'https://pannecoucke.me',
  trailingSlash: 'ignore',
  build: {
    // Nom du dossier des fichiers versionnés : /assets/ (cache d'un an, cf. public/_headers)
    assets: 'assets',
    // CSS inlinée (~8 Ko gzip) : aucune requête bloquante avant le premier affichage
    inlineStylesheets: 'always',
  },
  security: {
    // CSP en <meta> avec empreintes des scripts et styles d'Astro.
    // Cloudflare Web Analytics, injecté par l'hébergement, est autorisé explicitement.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com'],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
