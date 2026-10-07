import { resumeConfig } from '@/data/resume-config'
import type { LocalizedString } from '@/data/types'
import { pageUrl } from '@/lib/resume'

/**
 * Données SEO d'une page de langue : titre, description, canonical, hreflang, Open Graph et JSON-LD.
 */

const OG_LOCALES: Record<string, string> = { fr: 'fr_FR', en: 'en_US' }

/** Retire le balisage **gras** des textes riches. */
function plain(value: string): string {
  return value.replace(/\*\*(.+?)\*\*/g, '$1')
}

function translator(language: string) {
  const fallback = resumeConfig.languages.default
  return (ls: LocalizedString) => ls[language] ?? ls[fallback] ?? Object.values(ls)[0] ?? ''
}

export function buildJsonLd(language: string) {
  const t = translator(language)
  const { personal, contact, site, skills, education, experiences, spokenLanguages, seo } = resumeConfig
  const sameAs = contact
    .filter((c) => ['linkedin', 'github', 'website'].includes(c.type) && c.href)
    .map((c) => c.href as string)
  const email = contact.find((c) => c.type === 'email')?.label
  const website = contact.find((c) => c.type === 'website')?.href
  const current = experiences.find((exp) => exp.missions?.length) ?? experiences[0]
  const ongoing = current?.missions?.find((mission) => mission.isOngoing)
  const knowsAbout = [
    ...new Set([
      // "No-code, vibe coding" → deux compétences distinctes
      ...skills.flatMap((category) => category.items.flatMap((item) => t(item).split(', '))),
      ...experiences.flatMap((exp) => [
        ...(exp.tags ?? []).map((tag) => t(tag.label)),
        ...(exp.missions ?? []).flatMap((mission) => mission.tags.map((tag) => t(tag.label))),
      ]),
    ]),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: pageUrl(language),
    name: t(seo.title),
    inLanguage: language,
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: personal.name,
      jobTitle: t(personal.title),
      description: t(personal.intro),
      url: `${site.url}/`,
      ...(personal.photo && { image: `${site.url}${personal.photo}` }),
      ...(email && { email: `mailto:${email}` }),
      address: { '@type': 'PostalAddress', addressLocality: personal.city, addressCountry: 'FR' },
      ...(current && {
        worksFor: { '@type': 'Organization', name: current.company, ...(website && { url: website }) },
      }),
      ...(ongoing && {
        hasOccupation: {
          '@type': 'Occupation',
          name: t(personal.title),
          description: `${ongoing.client} : ${plain(t(ongoing.description))}`,
        },
      }),
      alumniOf: education.map((edu) => ({ '@type': 'EducationalOrganization', name: edu.school })),
      ...(spokenLanguages && { knowsLanguage: spokenLanguages.map((lang) => t(lang.name)) }),
      ...(sameAs.length > 0 && { sameAs }),
      knowsAbout,
    },
  }
}

/** Balises du <head> propres à une langue (le reste est commun, cf. layouts/Base.astro). */
export function headData(language: string) {
  const t = translator(language)
  const { seo, languages } = resumeConfig
  return {
    title: t(seo.title),
    description: t(seo.description),
    url: pageUrl(language),
    alternates: [
      ...languages.available.map((lang) => ({ hreflang: lang, href: pageUrl(lang) })),
      { hreflang: 'x-default', href: pageUrl(languages.default) },
    ],
    ogLocale: OG_LOCALES[language] ?? language,
    ogLocaleAlternates: languages.available.filter((lang) => lang !== language).map((lang) => OG_LOCALES[lang] ?? lang),
    // "<" échappé pour qu'aucune chaîne ne puisse fermer la balise <script>
    jsonLd: JSON.stringify(buildJsonLd(language)).replace(/</g, '\\u003c'),
  }
}
