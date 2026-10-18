import { resumeConfig } from '@/data/resume-config'
import type { LocalizedString, LocalizedStringArray } from '@/data/types'

/**
 * Typographie française : espace insécable avant : ; ? ! » et après «.
 * Évite qu'un signe double se retrouve seul en début de ligne.
 */
function frenchTypography(text: string): string {
  return text.replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ')
}

/** Un nombre reste collé au mot qui le suit ("4 fois", "10 ans") : jamais seul en fin de ligne. */
function bindNumbers(text: string): string {
  return text.replace(/(\d) (?=\p{L})/gu, '$1\u00a0')
}

/** Traducteur d'une langue, appliqué au build : chaque page est rendue dans sa langue. */
export function translator(language: string) {
  const fallback = resumeConfig.languages.default
  const typo = (text: string) => bindNumbers(language === 'fr' ? frenchTypography(text) : text)
  return {
    language,
    t: (ls: LocalizedString): string => typo(ls[language] ?? ls[fallback] ?? Object.values(ls)[0] ?? ''),
    tArray: (lsa: LocalizedStringArray): string[] =>
      (lsa[language] ?? lsa[fallback] ?? Object.values(lsa)[0] ?? []).map(typo),
  }
}

export type Translator = ReturnType<typeof translator>
