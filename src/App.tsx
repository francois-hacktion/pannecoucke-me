import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider, useTranslation } from '@/lib/i18n'
import { ThemeProvider } from '@/lib/theme'
import { Resume } from '@/components/Resume'
import { resumeConfig } from '@/data/resume-config'

const Agentation = lazy(() =>
  import('agentation').then((m) => ({ default: m.Agentation }))
)

/**
 * Titre et description suivent la langue courante.
 * Le JSON-LD et le contenu <noscript> sont injectés au build par vite-plugin-resume-seo.
 */
function SeoHead() {
  const { resolve, language } = useTranslation()
  useEffect(() => {
    document.title = resolve(resumeConfig.seo.title)
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', resolve(resumeConfig.seo.description))
    // resolve dépend de la langue : on ne relance l'effet qu'au changement de langue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SeoHead />
        <MotionConfig reducedMotion="user">
          <Resume />
        </MotionConfig>
      </LanguageProvider>
      {import.meta.env.DEV && (
        <Suspense>
          <Agentation />
        </Suspense>
      )}
    </ThemeProvider>
  )
}
