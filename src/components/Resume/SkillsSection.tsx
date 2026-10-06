import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { SectionEyebrow, SectionTitle } from '@/components/ui/Section'

/** Compétences en carte à 4 colonnes, comme sur le CV PDF : titre mono "$ variable", liste simple. */
export function SkillsSection() {
  const { resolve } = useTranslation()
  const { skills, labels } = resumeConfig

  return (
    <section data-anchor="competences" aria-labelledby="competences-title" className="flex flex-col">
      <SectionEyebrow rule="long">{resolve(labels.skills.eyebrow)}</SectionEyebrow>
      <SectionTitle id="competences-title" className="mb-7">
        {resolve(labels.skills.title)}
      </SectionTitle>

      {/* 4 colonnes calées sur leur contenu sur grand écran, 2 sur tablette, 1 sur petit mobile */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 rounded-lg border border-card-border bg-sunken p-[clamp(18px,3vw,26px)] min-[480px]:grid-cols-2 lg:grid-cols-[repeat(4,max-content)] lg:justify-between">
        {skills.map((category) => (
          <div key={category.title.fr} className="flex min-w-0 flex-col gap-2">
            <h3 className="glyph-dollar m-0 font-mono text-[15px] font-semibold break-words text-ink before:mr-[1ch] before:text-gold">
              {resolve(category.title)}
            </h3>
            <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[15.5px] leading-[1.5] text-body">
              {category.items.map((item) => (
                <li key={item.fr}>{resolve(item)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
