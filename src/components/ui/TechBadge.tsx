import type { ReactNode } from 'react'
import type { Tone } from '@/data/types'
import { cn } from '@/lib/utils'

interface TechBadgeProps {
  tone: Tone
  /** sm : tags de détail · xs : badges de titre */
  size?: 'sm' | 'xs'
  children: ReactNode
}

/** Tag coloré du design system (source : ds-source/TechBadge.jsx, variante "tone"). */
export function TechBadge({ tone, size = 'sm', children }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-[4px] border px-[7px] font-sans text-xs leading-[1.33] font-semibold',
        size === 'xs' ? 'py-px' : 'py-[3px]',
      )}
      style={{
        backgroundColor: `var(--tone-${tone}-bg)`,
        borderColor: `var(--tone-${tone}-border)`,
        color: `var(--tone-${tone}-fg)`,
      }}
    >
      {children}
    </span>
  )
}
