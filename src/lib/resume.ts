import { resumeConfig } from '@/data/resume-config'
import type { ContactType, SectionId } from '@/data/types'

/** Ordre des sections de la navigation (et du scroll-spy). */
export const SECTION_IDS: SectionId[] = ['profil', 'parcours', 'competences', 'formation', 'contact']

/** Libellé et lien d'un contact de la config, par type. */
export function getContact(type: ContactType) {
  const item = resumeConfig.contact.find((c) => c.type === type)
  if (!item) return null
  const href =
    item.href ??
    (type === 'email' ? `mailto:${item.label}` : type === 'phone' ? `tel:${item.label.replace(/\s/g, '')}` : undefined)
  return { label: item.label, href }
}

/** Chemin du PDF pour une langue (null si aucun PDF pour cette langue). */
export function getPdfPath(language: string): string | null {
  const pdf = resumeConfig.pdf
  if (!pdf) return null
  return typeof pdf.path === 'string' ? pdf.path : pdf.path[language] ?? null
}
