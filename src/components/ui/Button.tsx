import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Bouton du design system Hacktion (source : ds-source/Button.jsx).
 * - primary / secondary : variante "signature" à ombre dure, qui s'enfonce au survol et à la pression.
 * - blue / slate : variante "douce", en option.
 * Rendu en lien : tous les boutons du CV mènent quelque part (mailto, PDF, LinkedIn).
 */
export type ButtonVariant = 'primary' | 'secondary' | 'blue' | 'slate'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: ButtonVariant
  icon?: ReactNode
}

const HARD_SHADOW =
  'shadow-[4px_4px_0_0_var(--color-navy)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-navy)] active:translate-x-1 active:translate-y-1 active:shadow-none'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: cn('rounded-[4px] border-2 border-black bg-gold text-white', HARD_SHADOW),
  secondary: cn('rounded-[4px] border-2 border-navy bg-white text-navy', HARD_SHADOW),
  blue: 'rounded-lg bg-[#2563eb] text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,.1)] hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_10px_15px_-3px_rgba(59,130,246,.3)]',
  slate: 'rounded-lg bg-[#0f172a] font-semibold text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,.1),0_2px_4px_-2px_rgba(0,0,0,.1)] hover:bg-[#1e293b]',
}

export function Button({ variant = 'primary', icon, className, children, ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap px-6 py-3 font-sans text-base leading-5 font-bold no-underline transition-all duration-150',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {icon && <span className="flex text-[18px]">{icon}</span>}
      {children}
    </a>
  )
}
