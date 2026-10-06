import { lazy, Suspense, useEffect } from 'react'
import { LanguageProvider, useTranslation } from '@/lib/i18n'
import { ThemeProvider } from '@/lib/theme'
import { pageUrl } from '@/lib/resume'
import { Resume } from '@/components/Resume'
import { resumeConfig } from '@/data/resume-config'

// Outil d'annotation en développement uniquement (absent du build de production)
const Agentation = import.meta.env.DEV
  ? lazy(() => import('agentation').then((m) => ({ default: m.Agentation })))
  : null

/**
 * Le <head> est pré-rendu par langue au build (lib/seo.ts).
 * Lors d'une bascule de langue sans rechargement, on met à jour titre, description et canonical.
 */
function SeoHead() {
  const { resolve, language } = useTranslation()
  useEffect(() => {
    document.title = resolve(resumeConfig.seo.title)
    document.querySelector('meta[name="description"]')?.setAttribute('content', resolve(resumeConfig.seo.description))
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl(language))
    // resolve dépend de la langue : on ne relance l'effet qu'au changement de langue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])
  return null
}

export default function App({ initialLanguage }: { initialLanguage: string }) {
  return (
    <ThemeProvider>
      <LanguageProvider initialLanguage={initialLanguage}>
        <SeoHead />
        <Resume />
      </LanguageProvider>
      {Agentation && (
        <Suspense>
          <Agentation />
        </Suspense>
      )}
    </ThemeProvider>
  )
}
