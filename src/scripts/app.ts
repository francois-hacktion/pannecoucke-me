/**
 * Seul JavaScript de la page, natif (aucun framework) : thème, langue, navigation par sections
 * (scroll-spy, hash, défilement), accordéon du parcours et retournement de la photo.
 * Le HTML est complet sans lui : il ne fait qu'ajouter les interactions.
 */

const SECTION_IDS = ['profil', 'parcours', 'competences', 'formation', 'contact'] as const
type SectionId = (typeof SECTION_IDS)[number]

const root = document.documentElement
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// ===== THÈME =====
// Source de vérité : la classe .dark sur <html>, posée avant le premier affichage (layouts/Base.astro)

const THEME_KEY = 'resume-theme'
const DESK_COLOR = { light: '#f5f3ee', dark: '#0d1f2d' }

function applyTheme(dark: boolean) {
  root.classList.toggle('dark', dark)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? DESK_COLOR.dark : DESK_COLOR.light)
}

function syncThemeButton(button: HTMLElement) {
  // Info-bulle = nom accessible visible (span sr-only affiché selon le thème)
  const label = [...button.querySelectorAll<HTMLElement>('.sr-only')].find((el) => getComputedStyle(el).display !== 'none')
  if (label) button.title = label.textContent ?? ''
}

for (const button of document.querySelectorAll<HTMLElement>('[data-theme-toggle]')) {
  syncThemeButton(button)
  button.addEventListener('click', () => {
    const dark = !root.classList.contains('dark')
    applyTheme(dark)
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    } catch {
      // Stockage indisponible (navigation privée) : le choix vaut pour la page
    }
    syncThemeButton(button)
  })
}

// Thème du système suivi en direct, tant que le visiteur n'a rien choisi
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  let stored: string | null = null
  try {
    stored = localStorage.getItem(THEME_KEY)
  } catch {
    // Stockage indisponible
  }
  if (!stored && root.dataset.defaultTheme === 'system') {
    applyTheme(event.matches)
    document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach(syncThemeButton)
  }
})

// ===== LANGUE =====
// Une page par langue : le lien FR/EN mémorise le choix et garde la section courante (#hash)

for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]')) {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    try {
      localStorage.setItem('resume-language', link.dataset.langSwitch ?? '')
    } catch {
      // Stockage indisponible : le lien suffit
    }
    if (link.getAttribute('aria-current') === 'true') {
      event.preventDefault()
      return
    }
    event.preventDefault()
    location.href = link.pathname + location.hash
  })
}

// ===== NAVIGATION PAR SECTIONS =====
// Seul <main> défile : scroll-spy, défilement doux vers une section, synchronisation avec le hash

/** Une section devient active quand son haut passe à moins de 140px du haut du corps. */
const SPY_THRESHOLD = 140
/** Marge laissée au-dessus d'une section atteinte par la navigation (plus grande sous la barre sticky). */
const SCROLL_OFFSET = 36
const SCROLL_OFFSET_WITH_STICKY_NAV = 72
/**
 * Le scroll-spy est ignoré pendant un défilement programmé, jusqu'à l'événement scrollend.
 * Délai de secours si scrollend n'est pas supporté (ou si aucun défilement n'a lieu).
 */
const SPY_LOCK_MS = 700
const SPY_LOCK_MAX_MS = 2000
const SUPPORTS_SCROLLEND = 'onscrollend' in window

const body = document.querySelector<HTMLElement>('main')
const stickyNav = document.querySelector<HTMLElement>('[data-sticky-nav]')
const urlSection = document.querySelector<HTMLElement>('[data-url-section]')

let active: SectionId = 'profil'
let locked = false
let lockTimer: number | undefined

const isSectionId = (value: string): value is SectionId => (SECTION_IDS as readonly string[]).includes(value)

function readHash(): SectionId | null {
  const hash = decodeURIComponent(location.hash.slice(1))
  return isSectionId(hash) ? hash : null
}

/** Met à jour le hash sans créer d'entrée d'historique. */
function writeHash(id: SectionId) {
  const url = new URL(location.href)
  url.hash = id === 'profil' ? '' : id
  if (url.href !== location.href) history.replaceState(history.state, '', url.href)
}

/** Position d'un élément dans le contenu défilant du conteneur. */
function offsetWithin(element: Element, container: HTMLElement) {
  return element.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
}

const findAnchor = (id: SectionId) => body?.querySelector(`[data-anchor="${id}"]`)

function setActive(id: SectionId) {
  if (id === active) return
  active = id
  for (const link of document.querySelectorAll<HTMLElement>('[data-section-nav] [data-section]')) {
    if (link.dataset.section === id) link.setAttribute('aria-current', 'true')
    else link.removeAttribute('aria-current')
  }
  if (urlSection) urlSection.textContent = id === 'profil' ? '' : `/${id}`
  writeHash(id)
  // Mobile : garde le bouton actif visible dans la barre de navigation défilante
  if (stickyNav && stickyNav.offsetHeight > 0) {
    const current = stickyNav.querySelector<HTMLElement>('[aria-current="true"]')
    if (current) {
      stickyNav.scrollTo({
        left: current.offsetLeft - (stickyNav.clientWidth - current.offsetWidth) / 2,
        behavior: reducedMotion() ? 'auto' : 'smooth',
      })
    }
  }
}

function scrollToSection(id: SectionId, behavior: ScrollBehavior) {
  if (!body) return
  const anchor = findAnchor(id)
  const offset = (stickyNav?.offsetHeight ?? 0) > 0 ? SCROLL_OFFSET_WITH_STICKY_NAV : SCROLL_OFFSET
  const top = id === 'profil' || !anchor ? 0 : Math.max(0, offsetWithin(anchor, body) - offset)
  body.scrollTo({ top, behavior })
}

/** Ignore le scroll-spy le temps d'un défilement programmé. */
function lockSpy() {
  locked = true
  clearTimeout(lockTimer)
  const unlock = () => {
    locked = false
    clearTimeout(lockTimer)
    body?.removeEventListener('scrollend', unlock)
  }
  body?.addEventListener('scrollend', unlock, { once: true })
  lockTimer = window.setTimeout(unlock, SUPPORTS_SCROLLEND ? SPY_LOCK_MAX_MS : SPY_LOCK_MS)
}

function go(id: SectionId, behavior: ScrollBehavior = reducedMotion() ? 'auto' : 'smooth') {
  setActive(id)
  lockSpy()
  scrollToSection(id, behavior)
}

for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-section-nav] [data-section]')) {
  link.addEventListener('click', (event) => {
    const id = link.dataset.section ?? ''
    if (!isSectionId(id)) return
    event.preventDefault()
    go(id)
  })
}

// Scroll-spy : dernière section dont le haut est passé sous le seuil, "contact" en bas de page
body?.addEventListener(
  'scroll',
  () => {
    if (locked) return
    let current: SectionId = 'profil'
    for (const id of SECTION_IDS) {
      const anchor = findAnchor(id)
      if (anchor && offsetWithin(anchor, body) - SPY_THRESHOLD <= body.scrollTop) current = id
    }
    if (body.scrollTop + body.clientHeight >= body.scrollHeight - 4) current = 'contact'
    setActive(current)
  },
  { passive: true },
)

// Arrivée sur un lien profond (#parcours) et changement manuel du hash
const initial = readHash()
if (initial) go(initial, 'auto')
addEventListener('hashchange', () => {
  const id = readHash()
  if (id) go(id)
})

// ===== ACCORDÉON DU PARCOURS =====
// Une seule ligne ou mission ouverte à la fois ; le panneau replié est inerte (le style suit l'attribut)

for (const group of document.querySelectorAll<HTMLElement>('[data-accordion]')) {
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('button[aria-expanded]')]
  const setOpen = (button: HTMLButtonElement, open: boolean) => {
    button.setAttribute('aria-expanded', String(open))
    document.getElementById(button.getAttribute('aria-controls') ?? '')?.toggleAttribute('inert', !open)
  }
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true'
      for (const other of buttons) if (other !== button) setOpen(other, false)
      setOpen(button, open)
    })
  }
}

// ===== PHOTO =====
// Un tour complet en 3D au clic, aller puis retour (transition CSS sur data-spinning)

for (const photo of document.querySelectorAll<HTMLElement>('[data-photo]')) {
  photo.addEventListener('click', () => {
    if (photo.hasAttribute('data-spinning')) return
    // Sans animation (moins de mouvement demandé), pas de transitionend : rien à faire
    if (reducedMotion()) return
    photo.setAttribute('data-spinning', '')
  })
  photo.addEventListener('transitionend', (event) => {
    if (event.target === photo) photo.removeAttribute('data-spinning')
  })
}

// Signal pour les tests : interactions branchées
root.dataset.ready = ''
