import { useState, useEffect, type ReactNode } from 'react'
import { resumeConfig } from '@/data/resume-config'
import { ThemeContext } from './ThemeContext'

const STORAGE_KEY = 'resume-theme'

/** Couleur du bureau, reprise par la barre d'adresse des navigateurs mobiles. */
const DESK_COLOR = { light: '#f5f3ee', dark: '#0d1f2d' }

function getTimeBasedTheme(): 'light' | 'dark' {
  const now = new Date()
  const hour = now.getHours()
  const month = now.getMonth() // 0 = janvier, 11 = décembre

  // Heures approximatives du coucher et du lever du soleil en France, par mois
  const eveningThresholds = [18, 18, 19, 20, 21, 21, 21, 20, 19, 19, 18, 18]
  const morningThresholds = [8, 8, 7, 7, 6, 6, 6, 7, 7, 7, 8, 8]

  return hour >= eveningThresholds[month] || hour < morningThresholds[month] ? 'dark' : 'light'
}

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function getInitialDark(): boolean {
  const stored = readStoredTheme()
  if (stored === 'dark') return true
  if (stored === 'light') return false

  const mode = resumeConfig.theme?.defaultMode
  if (mode === 'dark') return true
  if (mode === 'light') return false
  if (mode === 'system') return window.matchMedia('(prefers-color-scheme: dark)').matches

  // Par défaut : selon l'heure
  return getTimeBasedTheme() === 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(getInitialDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark ? DESK_COLOR.dark : DESK_COLOR.light)
  }, [isDark])

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
      } catch {
        // Stockage indisponible (navigation privée) : le choix vaut pour la session
      }
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
