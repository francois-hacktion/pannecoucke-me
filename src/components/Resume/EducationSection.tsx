import type { ReactNode } from 'react'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { SectionEyebrow } from '@/components/ui/Section'
import { RichText } from '@/components/ui/RichText'

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col">
      <SectionEyebrow as="h2" id={id} rule="fit" className="mb-5">
        {title}
      </SectionEyebrow>
      <ul aria-labelledby={id} className="m-0 flex list-none flex-col gap-4 p-0">
        {children}
      </ul>
    </div>
  )
}

/** Ligne datée sans filet : période en mono à gauche (au-dessus sur mobile), titre et détail à droite. */
function DatedRow({ period, title, detail }: { period: string; title: ReactNode; detail: string }) {
  return (
    <li className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[96px_minmax(0,1fr)]">
      <span className="font-mono text-[13px] text-muted sm:pt-0.5">{period}</span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-base text-ink">{title}</span>
        <span className="text-[15px] text-body">{detail}</span>
      </div>
    </li>
  )
}

/**
 * Formation, Engagements, En dehors du travail et Langues en grille 2×2 (une colonne sur mobile),
 * sans filets entre les lignes, comme sur le CV PDF. Ancre de navigation : "formation".
 */
export function EducationSection() {
  const { resolve } = useTranslation()
  const { education, engagements, hobbies, spokenLanguages, labels } = resumeConfig

  return (
    <section
      data-anchor="formation"
      aria-label={resolve(labels.nav.formation)}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-12 gap-y-12"
    >
      <Block id="formation-title" title={resolve(labels.education.eyebrow)}>
        {education.map((item) => (
          <DatedRow
            key={item.period}
            period={item.period}
            title={<strong className="font-bold">{resolve(item.degree)}</strong>}
            detail={[item.school, item.details && resolve(item.details)].filter(Boolean).join(' · ')}
          />
        ))}
      </Block>

      {engagements && engagements.length > 0 && (
        <Block id="engagements-title" title={resolve(labels.engagements.eyebrow)}>
          {engagements.map((engagement) => (
            <DatedRow
              key={engagement.id}
              period={resolve(engagement.period)}
              title={<RichText text={resolve(engagement.title)} />}
              detail={resolve(engagement.detail)}
            />
          ))}
        </Block>
      )}

      {hobbies && hobbies.length > 0 && (
        <Block id="loisirs-title" title={resolve(labels.hobbies.eyebrow)}>
          {hobbies.map((hobby) => (
            <li key={hobby.title.fr} className="text-[15px] leading-[1.5] text-body">
              <strong className="text-base font-bold text-ink">{resolve(hobby.title)}</strong>
              {' · '}
              {resolve(hobby.description)}
            </li>
          ))}
        </Block>
      )}

      {spokenLanguages && spokenLanguages.length > 0 && (
        <Block id="langues-title" title={resolve(labels.languages.eyebrow)}>
          {spokenLanguages.map((lang) => (
            <li key={lang.name.fr} className="flex justify-between gap-3 text-base">
              <strong className="font-bold text-ink">{resolve(lang.name)}</strong>
              <span className="text-muted">{resolve(lang.level)}</span>
            </li>
          ))}
        </Block>
      )}
    </section>
  )
}
