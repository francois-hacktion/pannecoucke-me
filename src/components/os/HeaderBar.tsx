import type { ReactNode } from 'react'
import { ArrowsOutSimpleIcon, MinusIcon, XIcon } from '@/components/icons'

const WINDOW_DOTS = [
  { color: '#ef4444', Icon: XIcon },
  { color: '#eab308', Icon: MinusIcon },
  { color: '#22c55e', Icon: ArrowsOutSimpleIcon },
]

/** Pastilles de fenêtre : purement décoratives (aucune action), icône au survol. */
function WindowDots() {
  return (
    <div aria-hidden="true" className="group flex flex-none gap-2 max-[359px]:hidden">
      {WINDOW_DOTS.map(({ color, Icon }) => (
        <span
          key={color}
          className="flex size-[13px] items-center justify-center rounded-full border border-[rgba(13,31,45,.18)] text-[rgba(13,31,45,.7)] opacity-90"
          style={{ background: color }}
        >
          <Icon size={8} strokeWidth={28} className="opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
      ))}
    </div>
  )
}

interface HeaderBarProps {
  start?: ReactNode
  /** Contenu centré (navigation). Masqué sous le point de rupture "nav". */
  center?: ReactNode
  end?: ReactNode
}

/**
 * Headerbar (source : ds-source/HeaderBar.jsx).
 * Grille minmax(0,1fr) auto minmax(0,1fr) : les deux côtés ont toujours la même largeur,
 * le centre est donc centré sur la fenêtre, quel que soit le contenu des côtés.
 */
export function HeaderBar({ start, center, end }: HeaderBarProps) {
  return (
    <header className="grid h-[52px] flex-none select-none grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-(color:--hb-border) px-3.5 [background:var(--hb-bg)] nav:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <div className="flex min-w-0 items-center gap-3">
        <WindowDots />
        {start}
      </div>
      {center && <div className="hidden justify-center nav:flex">{center}</div>}
      <div className="flex min-w-0 items-center justify-end gap-1.5">{end}</div>
    </header>
  )
}
