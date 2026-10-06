import { resumeConfig } from '@/data/resume-config'

/**
 * Thème clair/sombre : la source de vérité est la classe .dark sur <html>,
 * posée avant le premier rendu par le script de index.html si le mode sombre est mémorisé.
 * Le HTML pré-rendu est toujours en clair : React lit la classe après l'hydratation.
 */
const STORAGE_KEY = 'resume-theme'

/** Couleur du bureau, reprise par la barre d'adresse des navigateurs mobiles. */
const DESK_COLOR = { light: '#f5f3ee', dark: '#0d1f2d' }

const listeners = new Set<() => void>()

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getSnapshot() {
  return document.documentElement.classList.contains('dark')
}

export function getServerSnapshot() {
  return false
}

function getTimeBasedDark(): boolean {
  const now = new Date()
  const hour = now.getHours()
  const month = now.getMonth() // 0 = janvier, 11 = décembre
  // Heures approximatives du coucher et du lever du soleil en France, par mois
  const eveningThresholds = [18, 18, 19, 20, 21, 21, 21, 20, 19, 19, 18, 18]
  const morningThresholds = [8, 8, 7, 7, 6, 6, 6, 7, 7, 7, 8, 8]
  return hour >= eveningThresholds[month] || hour < morningThresholds[month]
}

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark') return true
    if (stored === 'light') return false
  } catch {
    // Stockage indisponible : on retombe sur la config
  }
  const mode = resumeConfig.theme?.defaultMode
  if (mode === 'dark') return true
  if (mode === 'light') return false
  if (mode === 'system') return window.matchMedia('(prefers-color-scheme: dark)').matches
  return getTimeBasedDark()
}

export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? DESK_COLOR.dark : DESK_COLOR.light)
  listeners.forEach((listener) => listener())
}

/** À appeler côté client avant l'hydratation. */
export function initTheme() {
  applyTheme(getInitialDark())
}

export function persistTheme(dark: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  } catch {
    // Stockage indisponible (navigation privée) : le choix vaut pour la session
  }
}
