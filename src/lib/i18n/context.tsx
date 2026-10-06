import { useState, useEffect, type ReactNode } from 'react'
import { resumeConfig } from '@/data/resume-config'
import type { LocalizedString, LocalizedStringArray } from '@/data/types'
import { LanguageContext } from './LanguageContext'

const STORAGE_KEY = 'resume-language'

function isAvailable(lang: string | null): lang is string {
  return !!lang && resumeConfig.languages.available.includes(lang)
}

function getUrlLanguage(): string | null {
  const lang = new URLSearchParams(window.location.search).get('lang')
  return isAvailable(lang) ? lang : null
}

function getStoredLanguage(): string | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isAvailable(stored) ? stored : null
  } catch {
    return null
  }
}

function storeLanguage(lang: string) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Stockage indisponible (navigation privée) : le choix vaut pour la session
  }
}

function detectBrowserLanguage(): string {
  const browserLang = navigator.language.split('-')[0]
  return isAvailable(browserLang) ? browserLang : resumeConfig.languages.default
}

function updateUrlLanguage(lang: string) {
  const url = new URL(window.location.href)
  if (lang === resumeConfig.languages.default) {
    url.searchParams.delete('lang')
  } else {
    url.searchParams.set('lang', lang)
  }
  window.history.replaceState(window.history.state, '', url.toString())
}

/**
 * Typographie française : espace insécable avant : ; ? ! » et après «.
 * Évite qu'un signe double se retrouve seul en début de ligne.
 */
function frenchTypography(text: string): string {
  return text.replace(/ ([:;?!»])/g, '\u00A0$1').replace(/« /g, '«\u00A0')
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { default: defaultLang } = resumeConfig.languages

  // Priorité : 1. paramètre ?lang  2. choix mémorisé  3. langue du navigateur
  const [language, setLanguageState] = useState(() => {
    const urlLang = getUrlLanguage()
    // Une langue demandée par l'URL vaut choix explicite : l'URL est ensuite nettoyée
    // pour la langue par défaut, le choix doit donc survivre à un rechargement
    if (urlLang) {
      storeLanguage(urlLang)
      return urlLang
    }
    return getStoredLanguage() ?? detectBrowserLanguage()
  })

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    storeLanguage(lang)
  }

  useEffect(() => {
    document.documentElement.lang = language
    updateUrlLanguage(language)
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
