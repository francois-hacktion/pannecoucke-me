import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import type { Experience, Mission } from '@/data/types'
import { CaretDownIcon } from '@/components/icons'
import { Collapse } from '@/components/ui/Collapse'
import { SectionEyebrow, SectionTitle } from '@/components/ui/Section'
import { TechBadge } from '@/components/ui/TechBadge'
import { cn } from '@/lib/utils'
import { TagList, TaskList } from './TagList'

/** Colonne période + colonne contenu. Sous 640px, la période passe au-dessus du contenu. */
const ROW_GRID = 'grid gap-x-[clamp(12px,3vw,24px)] sm:grid-cols-[minmax(88px,140px)_minmax(0,1fr)]'

/** Par défaut, la mission en cours est ouverte. */
const DEFAULT_OPEN =
  resumeConfig.experiences.flatMap((exp) => exp.missions ?? []).find((mission) => mission.isOngoing)?.id ?? null

function Caret({ open, className }: { open: boolean; className?: string }) {
  return (
    <CaretDownIcon
      className={cn('flex-none text-[18px] text-muted transition-transform duration-200', open && 'rotate-180', className)}
    />
  )
}

function Period({ children }: { children: string }) {
  return <span className="font-mono text-[13px] text-muted sm:pt-1">{children}</span>
}

function ExperienceHeading({ experience }: { experience: Experience }) {
  const { resolve } = useTranslation()
  return (
    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
      <strong className="text-[19px] font-bold text-ink">
        {experience.title ? resolve(experience.title) : experience.company}
      </strong>
      {experience.badges.map((badge) => (
        <TechBadge key={badge.label.fr} tone={badge.tone} size="xs">
          {resolve(badge.label)}
        </TechBadge>
      ))}
    </span>
  )
}

interface ToggleProps {
  open: boolean
  onToggle: () => void
}

function MissionCard({ mission, open, onToggle }: { mission: Mission } & ToggleProps) {
  const { resolve, resolveArray } = useTranslation()
  const { labels } = resumeConfig
  const panelId = `mission-${mission.id}`
  const heading = [resolve(labels.experience.mission), mission.client, mission.title && resolve(mission.title)]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="rounded-lg border border-card-border bg-sunken">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start justify-between gap-4 rounded-lg px-[18px] py-4 text-left"
      >
        <span className="flex min-w-0 flex-col gap-1.5">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-mono text-sm font-semibold text-ink">
              <span aria-hidden="true" className="text-gold">
                ${' '}
              </span>
              {heading}
            </span>
            {mission.isOngoing ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <span aria-hidden="true" className="size-[7px] rounded-full bg-status" />
                {resolve(labels.experience.ongoing)}
              </span>
            ) : (
              mission.period && <span className="font-mono text-xs text-muted">{resolve(mission.period)}</span>
            )}
          </span>
          <span className="text-[15.5px] leading-[1.55] text-pretty text-body">{resolve(mission.description)}</span>
        </span>
        <Caret open={open} />
      </button>
      <Collapse open={open} id={panelId}>
        <div className="flex flex-col gap-3.5 px-[18px] pb-[18px]">
          <TaskList tasks={resolveArray(mission.tasks)} className="border-t border-rule pt-3.5" />
          <TagList tags={mission.tags} />
        </div>
      </Collapse>
    </div>
  )
}

/** Ligne avec missions imbriquées : la ligne elle-même n'est pas dépliable. */
function MissionsRow({ experience, openId, onToggle }: { experience: Experience; openId: string | null; onToggle: (id: string) => void }) {
  const { resolve } = useTranslation()
  return (
    <li className={cn(ROW_GRID, 'gap-y-1.5 border-t border-rule py-[22px] last:border-b')}>
      <Period>{resolve(experience.period)}</Period>
      <div className="flex min-w-0 flex-col gap-3.5">
        <div className="flex flex-col gap-2">
          <ExperienceHeading experience={experience} />
          <p className="m-0 text-base leading-[1.55] text-body">{resolve(experience.description)}</p>
        </div>
        {experience.missions?.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            open={openId === mission.id}
            onToggle={() => onToggle(mission.id)}
          />
        ))}
      </div>
    </li>
  )
}

/** Ligne dépliable : période, titre + badge, résumé, chevron ; détail en dessous. */
function ExperienceRow({ experience, open, onToggle }: { experience: Experience } & ToggleProps) {
  const { resolve, resolveArray } = useTranslation()
  const panelId = `experience-${experience.id}`

  return (
    <li className="border-t border-rule last:border-b">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] gap-x-[clamp(12px,3vw,24px)] gap-y-1.5 py-[22px] text-left sm:grid-cols-[minmax(88px,140px)_minmax(0,1fr)_auto]"
      >
        <span className="col-span-2 sm:col-span-1">
          <Period>{resolve(experience.period)}</Period>
        </span>
        <span className="flex min-w-0 flex-col gap-1.5">
          <ExperienceHeading experience={experience} />
          <span className="text-base leading-[1.55] text-pretty text-body">{resolve(experience.description)}</span>
        </span>
        <Caret open={open} className="sm:mt-1" />
      </button>
      <Collapse open={open} id={panelId}>
        <div className={cn(ROW_GRID, 'pb-[22px]')}>
          <span aria-hidden="true" className="hidden sm:block" />
          <div className="flex flex-col gap-3.5">
            {experience.tasks && <TaskList tasks={resolveArray(experience.tasks)} />}
            {experience.tags && <TagList tags={experience.tags} />}
          </div>
        </div>
      </Collapse>
    </li>
  )
}

export function ExperienceSection() {
  const { resolve } = useTranslation()
  const { experiences, labels } = resumeConfig
  // Accordéon : une seule ligne ou mission ouverte à la fois
  const [openId, setOpenId] = useState<string | null>(DEFAULT_OPEN)
  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id))

  return (
    <section data-anchor="parcours" aria-labelledby="parcours-title" className="flex flex-col">
      <SectionEyebrow>{resolve(labels.experience.eyebrow)}</SectionEyebrow>
      <SectionTitle id="parcours-title" className="mb-2.5">
        {resolve(labels.experience.title)}
      </SectionTitle>
      <p className="m-0 mb-7 text-base text-muted">{resolve(labels.experience.hint)}</p>

      <ol className="m-0 list-none p-0">
        {experiences.map((experience) =>
          experience.missions?.length ? (
            <MissionsRow key={experience.id} experience={experience} openId={openId} onToggle={toggle} />
          ) : (
            <ExperienceRow
              key={experience.id}
              experience={experience}
              open={openId === experience.id}
              onToggle={() => toggle(experience.id)}
            />
          ),
        )}
      </ol>
    </section>
  )
}
