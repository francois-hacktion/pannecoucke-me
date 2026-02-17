import { lazy, Suspense, useEffect } from 'react'
import { LanguageProvider } from '@/lib/i18n'
import { ThemeProvider, useTheme } from '@/lib/theme'
import { Resume } from '@/components/Resume'
import { resumeConfig } from '@/data/resume-config'

const Agentation = lazy(() =>
  import('agentation').then((m) => ({ default: m.Agentation }))
)

/**
 * Sets document title and meta description at runtime.
 * JSON-LD structured data and noscript fallback are injected at build time
 * by the vite-plugin-resume-seo plugin.
 */
function SeoHead() {
  useEffect(() => {
    const { title, description } = resumeConfig.seo
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [])
  return null
}

function ThemeVarsInjector({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme()

  return (
    <>
      <style>{`
        :root {
          --resume-bg: ${colors.bg};
          --resume-bg-card: ${colors.bgCard};
          --resume-text: ${colors.text};
          --resume-text-secondary: ${colors.textSecondary};
          --resume-primary: ${colors.primary};
          --resume-primary-light: ${colors.primaryLight};
          --resume-sidebar-from: ${colors.sidebarLight};
          --resume-sidebar-to: ${colors.sidebarLightEnd};
        }
        .dark {
          --resume-bg: ${colors.bgDark};
          --resume-bg-card: ${colors.bgCardDark};
          --resume-text: ${colors.textDark};
          --resume-text-secondary: ${colors.textSecondaryDark};
          --resume-primary: ${colors.primaryDark};
          --resume-primary-light: ${colors.primaryLightDark};
          --resume-sidebar-from: ${colors.sidebarDark};
          --resume-sidebar-to: ${colors.sidebarDarkEnd};
        }
      `}</style>
      {children}
    </>
  )
}



export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SeoHead />
        <ThemeVarsInjector>
          <Resume />
        </ThemeVarsInjector>
      </LanguageProvider>
      {import.meta.env.DEV && (
        <Suspense>
          <Agentation />
        </Suspense>
      )}
    </ThemeProvider>
  )
}
