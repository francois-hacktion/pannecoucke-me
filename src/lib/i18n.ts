import { resumeConfig } from '@/data/resume-config'
import type { LocalizedString, LocalizedStringArray } from '@/data/types'

/**
 * Typographie française : espace insécable avant : ; ? ! » et après «.
 * Évite qu'un signe double se retrouve seul en début de ligne.
 */
function frenchTypography(text: string): string {
  return text.replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ')
}

/** Traducteur d'une langue, appliqué au build : chaque page est rendue dans sa langue. */
export function translator(language: string) {
  const fallback = resumeConfig.languages.default
  const typo = (text: string) => (language === 'fr' ? frenchTypography(text) : text)
  return {
    language,
    t: (ls: LocalizedString): string => typo(ls[language] ?? ls[fallback] ?? Object.values(ls)[0] ?? ''),
    tArray: (lsa: LocalizedStringArray): string[] =>
      (lsa[language] ?? lsa[fallback] ?? Object.values(lsa)[0] ?? []).map(typo),
  }
}

export type Translator = ReturnType<typeof translator>
