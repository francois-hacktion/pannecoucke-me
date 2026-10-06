/**
 * Pré-rendu statique : génère une page HTML complète par langue
 * (dist/index.html en français, dist/en/index.html en anglais) à partir du build client
 * et du bundle serveur (dist-ssr). Le client hydrate ensuite ce HTML.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { renderPages } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
let template = await readFile(path.join(distDir, 'index.html'), 'utf8')

// CSS inlinée (~8 Ko gzip) : supprime la seule requête bloquante avant le premier affichage
const stylesheet = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
if (stylesheet) {
  const css = await readFile(path.join(distDir, stylesheet[1]), 'utf8')
  template = template.replace(stylesheet[0], () => `<style>${css}</style>`)
}

// Hydratation après le premier affichage : le HTML pré-rendu s'affiche sans attendre le JavaScript,
// React s'y attache à la frame suivante
const entryScript = template.match(/<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/)
if (!entryScript) throw new Error('[prerender] Script principal introuvable dans index.html')
template = template.replace(
  entryScript[0],
  `<script type="module">requestAnimationFrame(() => setTimeout(() => import('${entryScript[1]}')))</script>`,
)

const ROOT_PLACEHOLDER = '<div id="root"><!--app-html--></div>'
for (const marker of ['<!--app-head-->', ROOT_PLACEHOLDER, '<html lang="fr">']) {
  if (!template.includes(marker)) throw new Error(`[prerender] Marqueur absent de index.html : ${marker}`)
}

for (const page of renderPages()) {
  const html = template
    .replace('<html lang="fr">', `<html lang="${page.language}">`)
    .replace('<!--app-head-->', page.head)
    // email_off : empêche l'obfuscation d'e-mails de Cloudflare de modifier le HTML hydraté
    .replace(ROOT_PLACEHOLDER, `<!--email_off--><div id="root">${page.html}</div><!--/email_off-->`)

  const file = path.join(distDir, page.path, 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`[prerender] ${page.path} → ${path.relative(root, file)} (${(Buffer.byteLength(html) / 1024).toFixed(1)} Ko)`)
}

await rm(ssrDir, { recursive: true, force: true })
