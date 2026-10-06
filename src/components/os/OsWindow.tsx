import type { ReactNode, Ref } from 'react'

interface OsWindowProps {
  header: ReactNode
  footer?: ReactNode
  children: ReactNode
  /** Le corps est le seul conteneur qui défile : la navigation et le scroll-spy s'y rattachent. */
  bodyRef?: Ref<HTMLElement>
}

/** Fenêtre unique posée sur le bureau (source : ds-source/HeaderBar.jsx, OsWindow). */
export function OsWindow({ header, footer, children, bodyRef }: OsWindowProps) {
  return (
    <div className="relative mx-auto flex h-full max-w-[1280px] flex-col overflow-hidden rounded-[10px] border border-(color:--os-window-border) bg-content shadow-(--os-window-shadow) transition-colors duration-300">
      {header}
      <main ref={bodyRef} className="scrollbar-thin relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {children}
      </main>
      {footer}
    </div>
  )
}
