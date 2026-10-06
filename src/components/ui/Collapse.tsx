import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Panneau dépliable en CSS pur : hauteur auto animée via grid-template-rows (0fr → 1fr),
 * 200ms, ease-out, sans rebond. Le contenu reste dans le HTML (référencement, ATS) ;
 * replié, il est inerte (ni focus ni lecteur d'écran).
 */
export function Collapse({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
  return (
    <div
      id={id}
      data-collapse
      inert={!open}
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}
