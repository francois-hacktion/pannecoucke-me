import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { SectionEyebrow, SectionTitle } from '@/components/ui/Section'
import { TechBadge } from '@/components/ui/TechBadge'

export function SkillsSection() {
  const { resolve } = useTranslation()
  const { skills, labels } = resumeConfig

  return (
    <section data-anchor="competences" aria-labelledby="competences-title" className="flex flex-col">
      <SectionEyebrow>{resolve(labels.skills.eyebrow)}</SectionEyebrow>
      <SectionTitle id="competences-title" className="mb-7">
        {resolve(labels.skills.title)}
      </SectionTitle>

      {/* 2×2 sur desktop, une colonne sur mobile */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-12 gap-y-8">
        {skills.map((category) => (
          <div key={category.title.fr} className="flex flex-col gap-3 border-t border-rule pt-[18px]">
            <h3 className="m-0 flex items-center gap-2.5 text-[17px] font-bold text-ink">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-[2px]"
                style={{ background: `var(--tone-${category.tone}-solid)` }}
              />
              {resolve(category.title)}
            </h3>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
              {category.items.map((item) => (
                <li key={item.fr} className="flex">
                  <TechBadge tone={category.tone}>{resolve(item)}</TechBadge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
