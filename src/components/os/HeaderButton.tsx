import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Boutons de headerbar façon elementary OS (source : ds-source/HeaderBar.jsx).
 * HeaderButton rend un <button>, HeaderLink un <a> avec exactement le même style.
 */
export type LinkedPosition = 'first' | 'middle' | 'last'

interface HeaderButtonStyle {
  /** État "enfoncé" (section active, langue courante) */
  checked?: boolean
  /** Action principale, en or */
  suggested?: boolean
  /** Position dans un groupe de boutons liés */
  linked?: LinkedPosition
  iconOnly?: boolean
}

function headerButtonClass({ checked, suggested, linked, iconOnly }: HeaderButtonStyle) {
  return cn(
    'relative inline-flex h-8 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap border font-sans text-[13.5px] tracking-[0.005em] no-underline transition-[background,box-shadow,filter] duration-[120ms]',
    iconOnly ? 'min-w-[34px] px-2' : 'px-3',
    linked === 'first' && 'rounded-l-md',
    linked === 'last' && 'rounded-r-md',
    !linked && 'rounded-md',
    linked && linked !== 'first' && '-ml-px',
    suggested
      ? 'border-[rgba(13,31,45,.35)] bg-gold font-semibold text-[#0d1f2d] shadow-[0_1px_0_rgba(255,255,255,.35)_inset,0_1px_1px_rgba(13,31,45,.12)] hover:bg-gold-hover active:shadow-(--hb-btn-pressed)'
      : checked
        ? 'z-[1] border-(color:--hb-btn-border) [background:var(--hb-btn-checked)] font-semibold text-(color:--hb-checked-fg) shadow-(--hb-btn-pressed)'
        : 'border-(color:--hb-btn-border) [background:var(--hb-btn-bg)] font-medium text-(color:--hb-fg) shadow-(--hb-btn-shadow) hover:[filter:var(--hb-btn-hover)] active:[background:var(--hb-btn-checked)] active:shadow-(--hb-btn-pressed)',
  )
}

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, HeaderButtonStyle {
  icon?: ReactNode
  /** Nom accessible (obligatoire pour un bouton icône seule) */
  label?: string
}

export function HeaderButton({ icon, label, checked, suggested, linked, iconOnly, className, children, ...props }: HeaderButtonProps) {
  const onlyIcon = iconOnly ?? (!!icon && !children)
  return (
    <button
      type="button"
      aria-label={label}
      title={onlyIcon ? label : undefined}
      className={cn(headerButtonClass({ checked, suggested, linked, iconOnly: onlyIcon }), className)}
      {...props}
    >
      {icon && <span className="flex text-[17px]">{icon}</span>}
      {children}
    </button>
  )
}

interface HeaderLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, HeaderButtonStyle {
  icon?: ReactNode
  label?: string
}

export function HeaderLink({ icon, label, checked, suggested, linked, iconOnly, className, children, ...props }: HeaderLinkProps) {
  return (
    <a
      aria-label={label}
      title={label}
      className={cn(headerButtonClass({ checked, suggested, linked, iconOnly }), className)}
      {...props}
    >
      {icon && <span className="flex text-[17px]">{icon}</span>}
      {children}
    </a>
  )
}
