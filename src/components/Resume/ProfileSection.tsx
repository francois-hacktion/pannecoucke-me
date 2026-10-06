import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { assetUrl } from '@/lib/utils'
import { getContact, getPdfPath } from '@/lib/resume'
import { Button } from '@/components/ui/Button'
import { SectionEyebrow } from '@/components/ui/Section'
import { DownloadSimpleIcon, EnvelopeSimpleIcon } from '@/components/icons'

/** Photo 220×264 (150×180 sur mobile) qui fait un tour complet en 3D au clic, avec l'emoji au dos. */
function ProfilePhoto({ src, name, emoji, label }: { src: string; name: string; emoji: string; label: string }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="h-[180px] flex-[0_0_150px] [perspective:900px] sm:h-[264px] sm:flex-[0_0_220px]">
      <motion.button
        type="button"
        aria-label={label}
        onClick={() => !isSpinning && setIsSpinning(true)}
        onAnimationComplete={() => setIsSpinning(false)}
        animate={{ rotateY: isSpinning ? 360 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="relative block size-full cursor-pointer rounded-lg [transform-style:preserve-3d]"
      >
        <span className="absolute inset-0 overflow-hidden rounded-lg border border-card-border bg-sunken [backface-visibility:hidden]">
          {!hasError && (
            <img
              src={src}
              alt={name}
              width={220}
              height={264}
              decoding="async"
              fetchPriority="high"
              onError={() => setHasError(true)}
              className="block size-full object-cover"
            />
          )}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center rounded-lg border border-card-border bg-navy text-6xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          {emoji}
        </span>
      </motion.button>
    </div>
  )
}

export function ProfileSection() {
  const { resolve, language } = useTranslation()
  const { personal, labels } = resumeConfig
  const [firstName, ...rest] = personal.name.split(' ')
  const email = getContact('email')
  const pdfPath = getPdfPath(language)

  return (
    <section data-anchor="profil" aria-labelledby="profil-title" className="flex flex-col gap-10">
      <div className="flex flex-wrap-reverse items-center gap-x-10 gap-y-7 sm:gap-y-10">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-5">
          <SectionEyebrow className="mb-0 tracking-[0.02em]">{resolve(personal.headline)}</SectionEyebrow>
          <h1
            id="profil-title"
            className="m-0 text-[clamp(44px,6vw,64px)] leading-none font-extrabold tracking-[-0.035em] text-ink"
          >
            {firstName}
            <br />
            <span className="text-muted">{rest.join(' ')}</span>
          </h1>
          <p className="m-0 max-w-[560px] text-xl leading-[1.6] text-pretty text-body">{resolve(personal.intro)}</p>
          {personal.tagline && (
            <p className="m-0 max-w-[560px] text-[17px] leading-[1.6] text-muted">{resolve(personal.tagline)}</p>
          )}
          <div className="mt-1 flex flex-wrap gap-3">
            {email?.href && (
              <Button variant="primary" href={email.href} icon={<EnvelopeSimpleIcon />}>
                {resolve(labels.actions.contactMe)}
              </Button>
            )}
            {pdfPath && (
              <Button
                variant="secondary"
                href={assetUrl(pdfPath)}
                download={pdfPath.split('/').pop()}
                icon={<DownloadSimpleIcon />}
              >
                {resolve(labels.actions.downloadCv)}
              </Button>
            )}
          </div>
        </div>
        {personal.photo && (
          <ProfilePhoto
            src={assetUrl(personal.photo)}
            name={personal.name}
            emoji={personal.photoBackEmoji ?? '🚀'}
            label={resolve(labels.actions.flipPhoto)}
          />
        )}
      </div>

      {personal.mantra && (
        <figure className="m-0 border-y border-rule py-10 text-center">
          <figcaption className="mb-4 font-mono text-xs tracking-[0.12em] text-eyebrow uppercase">
            {resolve(labels.mantra)}
          </figcaption>
          <blockquote className="mx-auto my-0 max-w-[720px] text-[clamp(22px,3vw,28px)] leading-[1.35] font-medium tracking-[-0.015em] text-balance text-ink">
            {resolve(personal.mantra)}
          </blockquote>
          <div aria-hidden="true" className="mx-auto mt-5 h-[3px] w-14 bg-gold" />
        </figure>
      )}
    </section>
  )
}
