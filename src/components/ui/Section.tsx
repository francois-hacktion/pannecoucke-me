import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionEyebrowProps {
  /** h2 quand la section n'a pas de titre visible, pour garder une hiérarchie de titres propre */
  as?: ElementType
  id?: string
  className?: string
  children: ReactNode
}

/** Eyebrow "# Section" en Geist Mono or. */
export function SectionEyebrow({ as: Tag = 'p', id, className, children }: SectionEyebrowProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'glyph-hash m-0 mb-3.5 font-mono text-[13px] font-medium text-eyebrow before:mr-2 before:font-bold before:text-gold',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function SectionTitle({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <h2 id={id} className={cn('m-0 text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-ink', className)}>
      {children}
    </h2>
  )
}
