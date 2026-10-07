/**
 * Génère les images de partage (Open Graph, 1200×630) à partir de la config :
 * public/images/og-fr.jpg et public/images/og-en.jpg.
 * À relancer quand le nom, l'eyebrow ou l'intro changent, puis committer les images.
 *
 *   node --experimental-strip-types scripts/og-image.mjs      (Node 22 ; option inutile dès Node 24)
 *   PLAYWRIGHT_CHROMIUM=/opt/pw-browsers/chromium ...          (dans le conteneur Claude Code)
 */
import { chromium } from '@playwright/test'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { resumeConfig } = await import(pathToFileURL(path.join(root, 'src/data/resume-config.ts')).href)
const asset = (p) => pathToFileURL(path.join(root, p)).href

const { personal, site, languages } = resumeConfig
const [firstName, ...rest] = personal.name.split(' ')
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function html(lang) {
  const t = (ls) => ls[lang] ?? ls[languages.default]
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
    @font-face { font-family: Geist; src: url(${asset('public/fonts/geist-latin.woff2')}); font-weight: 400 800; }
    @font-face { font-family: Geist Mono; src: url(${asset('public/fonts/geist-mono-latin.woff2')}); font-weight: 400 700; }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; display: flex; background: #f5f3ee; font-family: Geist; color: #2b5170; -webkit-font-smoothing: antialiased; }
    .photo { width: 460px; height: 630px; background: url(${asset('src/assets/og-source.jpg')}) 50% 0 / auto 630px no-repeat; flex: none; }
    .text { flex: 1; padding: 64px 64px 56px; display: flex; flex-direction: column; }
    .eyebrow { font: 500 20px 'Geist Mono'; color: #7a6216; white-space: nowrap; }
    .eyebrow b { color: #d4af37; margin-right: 12px; }
    h1 { margin-top: 26px; font-size: 84px; line-height: 1; font-weight: 800; letter-spacing: -0.035em; color: #0d1f2d; }
    h1 span { color: #5a7a94; }
    p { margin-top: 30px; font-size: 30px; line-height: 1.45; text-wrap: pretty; }
    .foot { margin-top: auto; display: flex; align-items: center; gap: 18px; font: 500 24px 'Geist Mono'; color: #1a3a52; }
    .foot i { width: 56px; height: 4px; background: #d4af37; }
  </style></head><body>
    <div class="photo"></div>
    <div class="text">
      <div class="eyebrow"><b>#</b>${escape(t(personal.headline))}</div>
      <h1>${escape(firstName)}<br><span>${escape(rest.join(' '))}</span></h1>
      <p>${escape(t(personal.intro))}</p>
      <div class="foot"><i></i>${escape(site.domain)}</div>
    </div>
  </body></html>`
}

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
// Page servie depuis un fichier (et non setContent) : elle peut charger polices et photo en file://
const tmp = await mkdtemp(path.join(os.tmpdir(), 'og-'))
for (const lang of languages.available) {
  const htmlFile = path.join(tmp, `${lang}.html`)
  await writeFile(htmlFile, html(lang))
  await page.goto(pathToFileURL(htmlFile).href, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  const file = path.join(root, `public/images/og-${lang}.jpg`)
  await page.screenshot({ path: file, type: 'jpeg', quality: 86 })
  console.log(`[og] ${path.relative(root, file)}`)
}
await browser.close()
await rm(tmp, { recursive: true, force: true })
