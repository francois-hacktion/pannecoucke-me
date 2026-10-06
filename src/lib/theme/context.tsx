import { useSyncExternalStore, type ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import { applyTheme, getServerSnapshot, getSnapshot, persistTheme, subscribe } from './store'

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Hydratation : valeur serveur (clair) puis valeur réelle, sans erreur de correspondance
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = () => {
    persistTheme(!isDark)
    applyTheme(!isDark)
  }

  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>
}
