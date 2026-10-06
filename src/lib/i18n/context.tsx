import { useState, useEffect, type ReactNode } from 'react'
import { resumeConfig } from '@/data/resume-config'
import type { LocalizedString, LocalizedStringArray } from '@/data/types'
import { pagePath } from '@/lib/resume'
import { LanguageContext } from './LanguageContext'

/**
 * Langue : une page pré-rendue par langue ("/" en français, "/en/" en anglais).
 * La langue initiale vient du chemin, identique côté serveur et client.
 * Le choix explicite (bouton FR/EN, ?lang=) est mémorisé : le script de index.html
 * redirige ensuite "/" vers la langue mémorisée avant le premier rendu.
 */
const STORAGE_KEY = 'resume-language'

function storeLanguage(lang: string) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Stockage indisponible (navigation privée) : le choix vaut pour la session
  }
}

/**
 * Typographie française : espace insécable avant : ; ? ! » et après «.
 * Évite qu'un signe double se retrouve seul en début de ligne.
 */
function frenchTypography(text: string): string {
  return text.replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ')
}

export function LanguageProvider({ initialLanguage, children }: { initialLanguage: string; children: ReactNode }) {
  const { default: defaultLang } = resumeConfig.languages
  const [language, setLanguageState] = useState(initialLanguage)

  // Bascule sans rechargement : l'URL prend le chemin de la langue, la section (#hash) est conservée
  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    storeLanguage(lang)
    window.history.replaceState(window.history.state, '', `${pagePath(lang)}${window.location.hash}`)
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const typo = (text: string) => (language === 'fr' ? frenchTypography(text) : text)

  const resolve = (ls: LocalizedString): string =>
    typo(ls[language] ?? ls[defaultLang] ?? Object.values(ls)[0] ?? '')

  const resolveArray = (lsa: LocalizedStringArray): string[] =>
    (lsa[language] ?? lsa[defaultLang] ?? Object.values(lsa)[0] ?? []).map(typo)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, resolve, resolveArray }}>
      {children}
    </LanguageContext.Provider>
  )
}
