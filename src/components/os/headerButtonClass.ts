import { cn } from '@/lib/utils'

/**
 * Boutons de headerbar façon elementary OS (source : ds-source/HeaderBar.jsx).
 * L'état "enfoncé" (section active, langue courante) suit aria-current="true" :
 * le script de navigation n'a qu'à déplacer l'attribut, le style suit.
 */
export type LinkedPosition = 'first' | 'middle' | 'last'

export interface HeaderButtonStyle {
  /** Action principale, en or */
  suggested?: boolean
  /** Position dans un groupe de boutons liés */
  linked?: LinkedPosition
  iconOnly?: boolean
}

const CHECKED =
  'aria-[current=true]:z-[1] aria-[current=true]:[background:var(--hb-btn-checked)] aria-[current=true]:font-semibold aria-[current=true]:text-(color:--hb-checked-fg) aria-[current=true]:shadow-(--hb-btn-pressed) aria-[current=true]:hover:[filter:none]'

export function headerButtonClass({ suggested, linked, iconOnly }: HeaderButtonStyle) {
  return cn(
    'relative inline-flex h-8 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap border font-sans text-[13.5px] tracking-[0.005em] no-underline transition-[background,box-shadow,filter] duration-[120ms]',
    iconOnly ? 'min-w-[34px] px-2' : 'px-3',
    linked === 'first' && 'rounded-l-md',
    linked === 'last' && 'rounded-r-md',
    !linked && 'rounded-md',
    linked && linked !== 'first' && '-ml-px',
    suggested
      ? 'border-[rgba(13,31,45,.35)] bg-gold font-semibold text-[#0d1f2d] shadow-[0_1px_0_rgba(255,255,255,.35)_inset,0_1px_1px_rgba(13,31,45,.12)] hover:bg-gold-hover active:shadow-(--hb-btn-pressed)'
      : cn(
          'border-(color:--hb-btn-border) [background:var(--hb-btn-bg)] font-medium text-(color:--hb-fg) shadow-(--hb-btn-shadow) hover:[filter:var(--hb-btn-hover)] active:[background:var(--hb-btn-checked)] active:shadow-(--hb-btn-pressed)',
          CHECKED,
        ),
  )
}
