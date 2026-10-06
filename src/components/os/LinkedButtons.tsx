import type { MouseEvent } from 'react'
import { HeaderButton, HeaderLink, type LinkedPosition } from './HeaderButton'

export interface LinkedItem<T extends string> {
  id: T
  label: string
  /** Avec href : lien de navigation (aria-current). Sans : bouton bascule (aria-pressed). */
  href?: string
  lang?: string
}

interface LinkedButtonsProps<T extends string> {
  items: LinkedItem<T>[]
  value: T
  onSelect: (id: T, event: MouseEvent) => void
  ariaLabel: string
}

function position(index: number, count: number): LinkedPosition | undefined {
  if (count === 1) return undefined
  if (index === 0) return 'first'
  return index === count - 1 ? 'last' : 'middle'
}

/** Groupe de boutons liés : seuls les bords extérieurs sont arrondis. */
export function LinkedButtons<T extends string>({ items, value, onSelect, ariaLabel }: LinkedButtonsProps<T>) {
  const isNav = items.some((item) => item.href)

  const buttons = items.map((item, i) => {
    const checked = item.id === value
    const common = { checked, linked: position(i, items.length), lang: item.lang }
    return item.href ? (
      <HeaderLink
        key={item.id}
        {...common}
        href={item.href}
        hrefLang={item.lang}
        aria-current={checked ? 'true' : undefined}
        onClick={(e) => onSelect(item.id, e)}
      >
        {item.label}
      </HeaderLink>
    ) : (
      <HeaderButton key={item.id} {...common} aria-pressed={checked} onClick={(e) => onSelect(item.id, e)}>
        {item.label}
      </HeaderButton>
    )
  })

  return isNav ? (
    <nav aria-label={ariaLabel} className="inline-flex">
      {buttons}
    </nav>
  ) : (
    <div role="group" aria-label={ariaLabel} className="inline-flex">
      {buttons}
    </div>
  )
}
