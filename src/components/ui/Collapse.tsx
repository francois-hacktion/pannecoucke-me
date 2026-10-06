import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Panneau dépliable : hauteur auto, 200ms, ease-out, sans rebond. */
export function Collapse({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key={id}
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
