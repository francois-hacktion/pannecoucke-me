import type { Plugin } from 'vite'
import type { ResumeConfig, LocalizedString, LocalizedStringArray } from './src/data/types'

/**
 * Plugin Vite qui injecte le contenu du CV dans le HTML au build.
 *
 * Le site est une SPA rendue côté client : sans JavaScript, la page serait vide.
 * Ce plugin lit `resume-config` au build et injecte :
 * - les données structurées JSON-LD (schema.org Person) ;
 * - le <title> et la <meta description> ;
 * - un <noscript> complet en HTML sémantique.
 *
 * Les robots et les ATS lisent ainsi tout le CV sans exécuter de JavaScript.
 */
export function resumeSeoPlugin(): Plugin {
  let config: ResumeConfig | null = null
  let base = '/'

  return {
    name: 'resume-seo',
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    async buildStart() {
      // Import dynamique de la config (Vite résout le TypeScript)
      try {
        const mod = await import('./src/data/resume-config')
        config = mod.resumeConfig
      } catch (e) {
        console.warn('[resume-seo] Impossible de charger resume-config, injection SEO ignorée :', e)
      }
    },
    transformIndexHtml(html) {
      if (!config) return html

      const lang = config.languages.default
      const t = (ls: LocalizedString) => ls[lang] ?? Object.values(ls)[0] ?? ''
      const tArray = (lsa: LocalizedStringArray) => lsa[lang] ?? Object.values(lsa)[0] ?? []
      const ctx: Ctx = { config, t, tArray, base }

      html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(t(config.seo.title))}</title>`)
      html = html.replace(
        /<meta name="description" content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${escapeHtml(t(config.seo.description))}" />`,
      )
      html = html.replace(
        '</head>',
        `  <script type="application/ld+json">${JSON.stringify(buildJsonLd(ctx))}</script>\n  </head>`,
      )
      html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n${buildNoscriptHtml(ctx)}\n    </noscript>`)

      return html
    },
  }
}

interface Ctx {
  config: ResumeConfig
  t: (ls: LocalizedString) => string
  tArray: (lsa: LocalizedStringArray) => string[]
  base: string
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Retire le balisage **gras** des textes riches. */
function plain(str: string): string {
  return str.replace(/\*\*(.+?)\*\*/g, '$1')
}

/** Échappe puis convertit **gras** en <strong>. */
function rich(str: string): string {
  return escapeHtml(str).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

function assetHref(path: string, base: string) {
  return path.startsWith('/') ? `${base.replace(/\/$/, '')}${path}` : path
}

function buildJsonLd({ config, t }: Ctx) {
  const { personal, contact, site, skills, education, experiences, spokenLanguages } = config
  const sameAs = contact
    .filter((c) => ['linkedin', 'github', 'website'].includes(c.type) && c.href)
    .map((c) => c.href as string)
  const email = contact.find((c) => c.type === 'email')?.label
  const current = experiences.find((exp) => exp.missions?.length) ?? experiences[0]
  const ongoing = current?.missions?.find((m) => m.isOngoing)
  const website = contact.find((c) => c.type === 'website')?.href

  const knowsAbout = [
    ...new Set([
      ...skills.flatMap((cat) => cat.items.map(t)),
      ...experiences.flatMap((exp) => [
        ...(exp.tags ?? []).map((tag) => t(tag.label)),
        ...(exp.missions ?? []).flatMap((m) => m.tags.map((tag) => t(tag.label))),
      ]),
    ]),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: t(personal.title),
    description: t(personal.intro),
    url: `${site.url}/`,
    ...(personal.photo && { image: `${site.url}${personal.photo}` }),
    ...(email && { email: `mailto:${email}` }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: personal.city,
      addressCountry: 'FR',
    },
    ...(current && {
      worksFor: {
        '@type': 'Organization',
        name: current.company,
        ...(website && { url: website }),
      },
    }),
    ...(ongoing && {
      hasOccupation: {
        '@type': 'Occupation',
        name: t(personal.title),
        description: `${ongoing.client} : ${plain(t(ongoing.description))}`,
      },
    }),
    alumniOf: education.map((edu) => ({ '@type': 'EducationalOrganization', name: edu.school })),
    ...(spokenLanguages && { knowsLanguage: spokenLanguages.map((l) => t(l.name)) }),
    ...(sameAs.length > 0 && { sameAs }),
    knowsAbout,
  }
}

function buildNoscriptHtml({ config, t, tArray, base }: Ctx): string {
  const { personal, contact, skills, experiences, engagements, education, hobbies, spokenLanguages, pdf, labels } =
    config
  const out: string[] = []
  const i = '      '
  const h2 = (text: string) =>
    `${i}    <h2 style="font-size: 1.1rem; border-bottom: 1px solid #e2e9ee; padding-bottom: 0.25rem;">${escapeHtml(text)}</h2>`

  out.push(`${i}<div style="max-width: 800px; margin: 2rem auto; padding: 2rem; font-family: system-ui, -apple-system, sans-serif; color: #0d1f2d; line-height: 1.6;">`)

  // En-tête
  out.push(`${i}  <header style="margin-bottom: 2rem;">`)
  out.push(`${i}    <h1 style="margin: 0;">${escapeHtml(personal.name)}</h1>`)
  out.push(`${i}    <p style="margin: 0; color: #5a7a94;">${escapeHtml(t(personal.title))} · ${escapeHtml(personal.location)}</p>`)
  out.push(`${i}    <p>${escapeHtml(t(personal.intro))}</p>`)
  if (personal.tagline) out.push(`${i}    <p>${escapeHtml(t(personal.tagline))}</p>`)
  if (personal.mantra) out.push(`${i}    <blockquote>${escapeHtml(t(personal.mantra))}</blockquote>`)
  out.push(`${i}  </header>`)

  // Parcours
  out.push(`${i}  <section>`)
  out.push(h2(t(labels.experience.title)))
  for (const exp of experiences) {
    out.push(`${i}    <article>`)
    out.push(`${i}      <h3>${escapeHtml(exp.title ? t(exp.title) : exp.company)} · ${escapeHtml(t(exp.role))}</h3>`)
    out.push(`${i}      <p><em>${escapeHtml(t(exp.period))}</em> · ${escapeHtml(t(exp.description))}</p>`)
    if (exp.tasks) {
      out.push(`${i}      <ul>`)
      for (const task of tArray(exp.tasks)) out.push(`${i}        <li>${rich(task)}</li>`)
      out.push(`${i}      </ul>`)
    }
    for (const mission of exp.missions ?? []) {
      const title = [mission.client, mission.title && t(mission.title)].filter(Boolean).join(' · ')
      const period = mission.isOngoing ? t(labels.experience.ongoing) : mission.period ? t(mission.period) : ''
      out.push(`${i}      <h4>${escapeHtml(title)}${period ? ` (${escapeHtml(period)})` : ''}</h4>`)
      out.push(`${i}      <p>${escapeHtml(t(mission.description))}</p>`)
      out.push(`${i}      <ul>`)
      for (const task of tArray(mission.tasks)) out.push(`${i}        <li>${rich(task)}</li>`)
      out.push(`${i}      </ul>`)
    }
    out.push(`${i}    </article>`)
  }
  out.push(`${i}  </section>`)

  // Compétences
  out.push(`${i}  <section>`)
  out.push(h2(t(labels.skills.title)))
  for (const cat of skills) {
    out.push(`${i}    <p><strong>${escapeHtml(t(cat.title))}</strong> : ${escapeHtml(cat.items.map(t).join(', '))}</p>`)
  }
  out.push(`${i}  </section>`)

  // Engagements
  if (engagements?.length) {
    out.push(`${i}  <section>`)
    out.push(h2(t(labels.engagements.eyebrow)))
    out.push(`${i}    <ul>`)
    for (const eng of engagements) out.push(`${i}      <li>${escapeHtml(t(eng.period))} · ${rich(t(eng.text))}</li>`)
    out.push(`${i}    </ul>`)
    out.push(`${i}  </section>`)
  }

  // Formation
  out.push(`${i}  <section>`)
  out.push(h2(t(labels.education.eyebrow)))
  out.push(`${i}    <ul>`)
  for (const edu of education) {
    const details = [edu.school, edu.details && t(edu.details), edu.period].filter(Boolean).join(' · ')
    out.push(`${i}      <li><strong>${escapeHtml(t(edu.degree))}</strong> · ${escapeHtml(details)}</li>`)
  }
  out.push(`${i}    </ul>`)
  out.push(`${i}  </section>`)

  // Langues et centres d'intérêt
  if (spokenLanguages?.length) {
    out.push(`${i}  <section>`)
    out.push(h2(t(labels.languages.eyebrow)))
    out.push(`${i}    <p>${escapeHtml(spokenLanguages.map((l) => `${t(l.name)} (${t(l.level)})`).join(', '))}</p>`)
    out.push(`${i}  </section>`)
  }
  if (hobbies?.length) {
    out.push(`${i}  <section>`)
    out.push(h2(t(labels.hobbies.eyebrow)))
    out.push(`${i}    <ul>`)
    for (const hobby of hobbies) {
      out.push(`${i}      <li><strong>${escapeHtml(t(hobby.title))}</strong> : ${escapeHtml(t(hobby.description))}</li>`)
    }
    out.push(`${i}    </ul>`)
    out.push(`${i}  </section>`)
  }

  // Contact
  out.push(`${i}  <section>`)
  out.push(h2(t(labels.nav.contact)))
  out.push(`${i}    <ul>`)
  for (const c of contact) {
    const href = c.href ?? (c.type === 'email' ? `mailto:${c.label}` : undefined)
    out.push(
      href
        ? `${i}      <li><a href="${escapeHtml(href)}">${escapeHtml(c.label)}</a></li>`
        : `${i}      <li>${escapeHtml(c.label)}</li>`,
    )
  }
  out.push(`${i}    </ul>`)
  out.push(`${i}  </section>`)

  // PDF
  if (pdf) {
    const path = typeof pdf.path === 'string' ? pdf.path : t(pdf.path)
    if (path) {
      out.push(`${i}  <p><a href="${escapeHtml(assetHref(path, base))}">${escapeHtml(t(labels.actions.downloadCv))} (PDF)</a></p>`)
    }
  }

  out.push(`${i}</div>`)
  return out.join('\n')
}
