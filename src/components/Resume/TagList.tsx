import { useTranslation } from '@/lib/i18n'
import type { Tag } from '@/data/types'
import { TechBadge } from '@/components/ui/TechBadge'
import { RichText } from '@/components/ui/RichText'
import { cn } from '@/lib/utils'

export function TagList({ tags, size = 'sm' }: { tags: Tag[]; size?: 'sm' | 'xs' }) {
  const { resolve } = useTranslation()
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
      {tags.map((tag) => {
        const label = resolve(tag.label)
        return (
          <li key={label} className="flex">
            <TechBadge tone={tag.tone} size={size}>
              {label}
            </TechBadge>
          </li>
        )
      })}
    </ul>
  )
}

/** Liste de réalisations, chaque ligne préfixée d'une flèche or. */
export function TaskList({ tasks, className }: { tasks: string[]; className?: string }) {
  return (
    <ul className={cn('m-0 flex list-none flex-col gap-2 p-0 text-[15px] leading-[1.55] text-body', className)}>
      {tasks.map((task) => (
        <li key={task} className="glyph-arrow flex gap-2.5 before:font-bold before:text-gold">
          <span>
            <RichText text={task} />
          </span>
        </li>
      ))}
    </ul>
  )
}
