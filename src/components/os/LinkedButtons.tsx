import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { HeaderButton, HeaderLink, type LinkedPosition } from './HeaderButton'

export interface LinkedItem<T extends string> {
  id: T
  label: string
  /** Avec href : lien de navigation (aria-current). Sans : bouton bascule (aria-pressed). */
  href?: string
  lang?: string
  /** Icône qui remplace le libellé sous 640px en mode fill (le libellé reste lu par les lecteurs d'écran) */
  icon?: ReactNode
}

interface LinkedButtonsProps<T extends string> {
  items: LinkedItem<T>[]
  value: T
  onSelect: (id: T, event: MouseEvent) => void
  ariaLabel: string
  /**
   * Sous 640px, le groupe occupe toute la largeur et ses boutons se compactent
   * (barre de navigation mobile : les 5 sections tiennent sans défilement dès 320px).
   */
  fill?: boolean
}

/**
 * Mode fill : boutons étirés et compacts sous 640px, taille normale au-dessus.
 * Paliers mesurés pour que les libellés français tiennent jusqu'à 320px.
 */
const FILL_ITEM =
  'max-sm:flex-auto max-sm:px-1 max-sm:text-[12px] min-[360px]:max-sm:px-1.5 min-[410px]:max-sm:px-2 min-[410px]:max-sm:text-[13px]'

function ItemContent({ label, icon }: { label: string; icon?: ReactNode }) {
  if (!icon) return label
  return (
    <>
      <span aria-hidden="true" className="flex text-[17px] sm:hidden">
        {icon}
      </span>
      <span className="max-sm:sr-only">{label}</span>
    </>
  )
}

function position(index: number, count: number): LinkedPosition | undefined {
  if (count === 1) return undefined
  if (index === 0) return 'first'
  return index === count - 1 ? 'last' : 'middle'
}

/** Groupe de boutons liés : seuls les bords extérieurs sont arrondis. */
export function LinkedButtons<T extends string>({ items, value, onSelect, ariaLabel, fill }: LinkedButtonsProps<T>) {
  const isNav = items.some((item) => item.href)

  const buttons = items.map((item, i) => {
    const checked = item.id === value
    const common = {
      checked,
      linked: position(i, items.length),
      lang: item.lang,
      className: fill ? FILL_ITEM : undefined,
    }
    const content = <ItemContent label={item.label} icon={fill ? item.icon : undefined} />
    return item.href ? (
      <HeaderLink
        key={item.id}
        {...common}
        href={item.href}
        hrefLang={item.lang}
        aria-current={checked ? 'true' : undefined}
        onClick={(e) => onSelect(item.id, e)}
      >
        {content}
      </HeaderLink>
    ) : (
      <HeaderButton key={item.id} {...common} aria-pressed={checked} onClick={(e) => onSelect(item.id, e)}>
        {content}
      </HeaderButton>
    )
  })

  const groupClass = cn('inline-flex', fill && 'max-sm:flex max-sm:w-full')

  return isNav ? (
    <nav aria-label={ariaLabel} className={groupClass}>
      {buttons}
    </nav>
  ) : (
    <div role="group" aria-label={ariaLabel} className={groupClass}>
      {buttons}
    </div>
  )
}
