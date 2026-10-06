import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { SectionEyebrow } from '@/components/ui/Section'
import { RichText } from '@/components/ui/RichText'

/** Engagements associatifs, hors navigation, du plus récent au plus ancien. */
export function EngagementsSection() {
  const { resolve } = useTranslation()
  const { engagements, labels } = resumeConfig
  if (!engagements?.length) return null

  return (
    <section data-anchor="engagements" aria-labelledby="engagements-title" className="flex flex-col">
      <SectionEyebrow as="h2" id="engagements-title">
        {resolve(labels.engagements.eyebrow)}
      </SectionEyebrow>
      <ul className="m-0 list-none p-0">
        {engagements.map((engagement) => (
          <li
            key={engagement.id}
            className="grid gap-x-[clamp(12px,3vw,24px)] gap-y-1 border-t border-rule py-4 last:border-b sm:grid-cols-[minmax(88px,140px)_minmax(0,1fr)]"
          >
            <span className="font-mono text-[13px] text-muted sm:pt-0.5">{resolve(engagement.period)}</span>
            <span className="text-base leading-[1.55] text-body">
              <RichText text={resolve(engagement.text)} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
