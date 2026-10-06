import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import type { SectionId } from '@/data/types'
import { SECTION_IDS } from '@/lib/resume'

/** Une section devient active quand son haut passe à moins de 140px du haut du corps. */
const SPY_THRESHOLD = 140
/** Marge laissée au-dessus d'une section atteinte par la navigation. */
const SCROLL_OFFSET = 36
/** Idem quand la barre de navigation sticky (mobile) recouvre le haut du corps. */
const SCROLL_OFFSET_WITH_STICKY_NAV = 72
/**
 * Le scroll-spy est ignoré pendant un défilement programmé, jusqu'à l'événement scrollend.
 * Délai de secours si scrollend n'est pas supporté (ou si aucun défilement n'a lieu).
 */
const SPY_LOCK_MS = 700
const SPY_LOCK_MAX_MS = 2000
const SUPPORTS_SCROLLEND = typeof window !== 'undefined' && 'onscrollend' in window

function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as string[]).includes(value)
}

function readHash(): SectionId | null {
  const hash = decodeURIComponent(window.location.hash.slice(1))
  return isSectionId(hash) ? hash : null
}

/** Met à jour le hash sans créer d'entrée d'historique (la langue en ?lang= est conservée). */
function writeHash(id: SectionId) {
  const url = new URL(window.location.href)
  url.hash = id === 'profil' ? '' : id
  if (url.href !== window.location.href) {
    window.history.replaceState(window.history.state, '', url.href)
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Position d'un élément dans le contenu défilant du conteneur. */
function offsetWithin(element: Element, container: HTMLElement) {
  return element.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
}

function findAnchor(container: HTMLElement, id: SectionId) {
  return container.querySelector(`[data-anchor="${id}"]`)
}

/**
 * Navigation par sections dans le corps de la fenêtre :
 * scroll-spy, défilement doux vers une section, synchronisation avec le hash de l'URL.
 */
export function useSectionNav(
  bodyRef: RefObject<HTMLElement | null>,
  stickyNavRef: RefObject<HTMLElement | null>,
) {
  // "profil" au rendu serveur comme à l'hydratation ; le hash éventuel est appliqué au montage
  const [active, setActive] = useState<SectionId>('profil')
  const locked = useRef(false)
  const lockTimer = useRef<number | undefined>(undefined)

  const scrollToSection = useCallback(
    (id: SectionId, behavior: ScrollBehavior) => {
      const body = bodyRef.current
      if (!body) return
      const anchor = findAnchor(body, id)
      const stickyNavVisible = (stickyNavRef.current?.offsetHeight ?? 0) > 0
      const offset = stickyNavVisible ? SCROLL_OFFSET_WITH_STICKY_NAV : SCROLL_OFFSET
      const top = id === 'profil' || !anchor ? 0 : Math.max(0, offsetWithin(anchor, body) - offset)
      body.scrollTo({ top, behavior })
    },
    [bodyRef, stickyNavRef],
  )

  /** Ignore le scroll-spy le temps d'un défilement programmé. */
  const lockSpy = useCallback(() => {
    const body = bodyRef.current
    locked.current = true
    window.clearTimeout(lockTimer.current)
    const unlock = () => {
      locked.current = false
      window.clearTimeout(lockTimer.current)
      body?.removeEventListener('scrollend', unlock)
    }
    body?.addEventListener('scrollend', unlock, { once: true })
    lockTimer.current = window.setTimeout(unlock, SUPPORTS_SCROLLEND ? SPY_LOCK_MAX_MS : SPY_LOCK_MS)
  }, [bodyRef])

  const go = useCallback(
    (id: SectionId) => {
      setActive(id)
      lockSpy()
      scrollToSection(id, prefersReducedMotion() ? 'auto' : 'smooth')
    },
    [lockSpy, scrollToSection],
  )

  // Scroll-spy : dernière section dont le haut est passé sous le seuil, "contact" en bas de page
  useEffect(() => {
    const body = bodyRef.current
    if (!body) return
    const onScroll = () => {
      if (locked.current) return
      let current: SectionId = 'profil'
      for (const id of SECTION_IDS) {
        const anchor = findAnchor(body, id)
        if (anchor && offsetWithin(anchor, body) - SPY_THRESHOLD <= body.scrollTop) current = id
      }
      if (body.scrollTop + body.clientHeight >= body.scrollHeight - 4) current = 'contact'
      setActive(current)
    }
    body.addEventListener('scroll', onScroll, { passive: true })
    return () => body.removeEventListener('scroll', onScroll)
  }, [bodyRef])

  // Arrivée sur un lien profond (#parcours) et changement manuel du hash
  useEffect(() => {
    const initial = readHash()
    if (initial) {
      // Synchronisation avec une source externe (l'URL), au montage uniquement
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(initial)
      lockSpy()
      scrollToSection(initial, 'auto')
    }
    const onHashChange = () => {
      const id = readHash()
      if (id) go(id)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.clearTimeout(lockTimer.current)
    }
  }, [go, lockSpy, scrollToSection])

  // L'URL reflète la section active
  useEffect(() => {
    writeHash(active)
  }, [active])

  // Mobile : garde le bouton actif visible dans la barre de navigation défilante
  useEffect(() => {
    const nav = stickyNavRef.current
    if (!nav || nav.offsetHeight === 0) return
    const current = nav.querySelector<HTMLElement>('[aria-current="true"]')
    if (!current) return
    nav.scrollTo({
      left: current.offsetLeft - (nav.clientWidth - current.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [active, stickyNavRef])

  return { active, go }
}
