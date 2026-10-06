import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { getContact } from '@/lib/resume'

/** Barre d'état en pied de fenêtre, masquée sous 760px. */
export function StatusBar() {
  const { resolve } = useTranslation()
  const { name, city, status } = resumeConfig.personal
  const email = getContact('email')

  return (
    <footer className="hidden h-[30px] flex-none items-center justify-between gap-4 overflow-hidden whitespace-nowrap border-t border-rule bg-sunken px-4 font-mono text-[11.5px] text-muted os:flex">
      <span>
        © {new Date().getFullYear()} {name} · {city}
      </span>
      {email && (
        <a href={email.href} className="text-muted no-underline hover:text-ink">
          {email.label}
        </a>
      )}
      {status && (
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-[7px] rounded-full bg-status" />
          {resolve(status)}
        </span>
      )}
    </footer>
  )
}
