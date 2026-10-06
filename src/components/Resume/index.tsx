import { useRef, type MouseEvent } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import { useSectionNav } from '@/lib/hooks/useSectionNav'
import { resumeConfig } from '@/data/resume-config'
import type { SectionId } from '@/data/types'
import { SECTION_IDS, getPdfPath } from '@/lib/resume'
import { assetUrl } from '@/lib/utils'
import { DownloadSimpleIcon, MoonIcon, SunIcon } from '@/components/icons'
import { HeaderBar } from '@/components/os/HeaderBar'
import { HeaderButton, HeaderLink } from '@/components/os/HeaderButton'
import { LinkedButtons } from '@/components/os/LinkedButtons'
import { OsWindow } from '@/components/os/OsWindow'
import { StatusBar } from '@/components/os/StatusBar'
import { ProfileSection } from './ProfileSection'
import { ExperienceSection } from './ExperienceSection'
import { SkillsSection } from './SkillsSection'
import { EngagementsSection } from './EngagementsSection'
import { EducationSection } from './EducationSection'
import { ContactSection } from './ContactSection'

/**
 * Bureau papier + fenêtre unique. Pas de scroll global : seul le corps de la fenêtre défile.
 * La navigation vit dans la headerbar, ou dans une barre sticky en haut du corps sous 880px.
 */
export function Resume() {
  const { resolve, language, setLanguage } = useTranslation()
  const { isDark, toggle } = useTheme()
  const { site, languages, labels } = resumeConfig
  const bodyRef = useRef<HTMLElement>(null)
  const stickyNavRef = useRef<HTMLDivElement>(null)
  const { active, go } = useSectionNav(bodyRef, stickyNavRef)
  const pdfPath = getPdfPath(language)

  const onNavigate = (id: SectionId, event: MouseEvent) => {
    event.preventDefault()
    go(id)
  }

  const nav = (
    <LinkedButtons
      ariaLabel={resolve(labels.navAriaLabel)}
      value={active}
      onSelect={onNavigate}
      items={SECTION_IDS.map((id) => ({ id, label: resolve(labels.nav[id]), href: `#${id}` }))}
    />
  )

  const header = (
    <HeaderBar
      start={
        <>
          <img
            src={assetUrl('/images/hacktion-mark.png')}
            alt="Hacktion"
            width={58}
            height={40}
            className="-my-1 block h-10 w-auto flex-none dark:hidden"
          />
          <img
            src={assetUrl('/images/hacktion-mark-on-dark.png')}
            alt="Hacktion"
            width={58}
            height={40}
            className="-my-1 hidden h-10 w-auto flex-none dark:block"
          />
          <span className="hidden truncate font-mono text-[12.5px] text-muted wide:block">
            {site.domain}
            {active !== 'profil' && `/${active}`}
          </span>
        </>
      }
      center={nav}
      end={
        <>
          {languages.available.length > 1 && (
            <LinkedButtons
              ariaLabel={resolve(labels.actions.language)}
              value={language}
              onSelect={(lang) => setLanguage(lang)}
              items={languages.available.map((lang) => ({ id: lang, label: languages.labels[lang], lang }))}
            />
          )}
          <HeaderButton
            icon={isDark ? <SunIcon /> : <MoonIcon />}
            label={resolve(isDark ? labels.actions.switchToLight : labels.actions.switchToDark)}
            onClick={toggle}
          />
          {pdfPath && (
            <HeaderLink
              suggested
              href={assetUrl(pdfPath)}
              download={pdfPath.split('/').pop()}
              label={resolve(labels.actions.downloadCv)}
              icon={<DownloadSimpleIcon />}
              className="min-w-[34px] px-2 wide:px-3"
            >
              <span className="hidden wide:inline">{resolve(labels.actions.downloadCvShort)}</span>
            </HeaderLink>
          )}
        </>
      }
    />
  )

  return (
    <div className="relative h-dvh bg-desk p-[clamp(8px,2.4vw,28px)] transition-[background-color] duration-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-(image:--texture-noise) opacity-80 mix-blend-multiply [background-size:200px]"
      />
      <OsWindow header={header} footer={<StatusBar />} bodyRef={bodyRef}>
        <div
          ref={stickyNavRef}
          className="scrollbar-none sticky top-0 z-[5] overflow-x-auto border-b border-rule bg-content px-4 py-2.5 [mask-image:linear-gradient(to_right,transparent,#000_14px,#000_calc(100%-14px),transparent)] nav:hidden"
        >
          {nav}
        </div>
        <div className="mx-auto flex max-w-[1000px] flex-col gap-[72px] px-[clamp(18px,5vw,56px)] pt-[clamp(28px,5vw,60px)] pb-[72px]">
          <ProfileSection />
          <ExperienceSection />
          <SkillsSection />
          <EngagementsSection />
          <EducationSection />
          <ContactSection />
        </div>
      </OsWindow>
    </div>
  )
}
