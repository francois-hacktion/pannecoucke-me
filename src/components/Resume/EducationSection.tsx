import type { ReactNode } from 'react'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { SectionEyebrow } from '@/components/ui/Section'

function Column({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <SectionEyebrow as="h2" id={id}>
        {title}
      </SectionEyebrow>
      <ul aria-labelledby={id} className="m-0 list-none p-0">
        {children}
      </ul>
    </div>
  )
}

/** Ligne titre + une ligne de détail : Formation et En dehors du travail s'alignent ligne à ligne. */
function Row({ title, aside, detail }: { title: string; aside?: string; detail: string }) {
  return (
    <li className="flex flex-col gap-1 border-t border-rule py-4 last:border-b">
      <div className="flex items-baseline justify-between gap-3">
        <strong className="text-base font-bold text-ink">{title}</strong>
        {aside && <span className="font-mono text-[13px] text-muted">{aside}</span>}
      </div>
      <span className="text-[15px] text-body">{detail}</span>
    </li>
  )
}

/** Formation, En dehors du travail et Langues (sous la nav "Formation"). */
export function EducationSection() {
  const { resolve } = useTranslation()
  const { education, hobbies, spokenLanguages, labels } = resumeConfig

  return (
    <section
      data-anchor="formation"
      aria-label={resolve(labels.nav.formation)}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-12 gap-y-14"
    >
      <Column id="formation-title" title={resolve(labels.education.eyebrow)}>
        {education.map((item) => (
          <Row
            key={item.period}
            title={resolve(item.degree)}
            aside={item.period}
            detail={[item.school, item.details && resolve(item.details)].filter(Boolean).join(' · ')}
          />
        ))}
      </Column>

      {hobbies && hobbies.length > 0 && (
        <Column id="loisirs-title" title={resolve(labels.hobbies.eyebrow)}>
          {hobbies.map((hobby) => (
            <Row key={hobby.title.fr} title={resolve(hobby.title)} detail={resolve(hobby.description)} />
          ))}
        </Column>
      )}

      {spokenLanguages && spokenLanguages.length > 0 && (
        <Column id="langues-title" title={resolve(labels.languages.eyebrow)}>
          {spokenLanguages.map((lang) => (
            <li
              key={lang.name.fr}
              className="flex justify-between gap-3 border-t border-rule py-3.5 text-base last:border-b"
            >
              <strong className="font-bold text-ink">{resolve(lang.name)}</strong>
              <span className="text-muted">{resolve(lang.level)}</span>
            </li>
          ))}
        </Column>
      )}
    </section>
  )
}
