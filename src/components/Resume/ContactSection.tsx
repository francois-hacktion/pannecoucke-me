import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { getContact } from '@/lib/resume'
import { Button } from '@/components/ui/Button'
import { EnvelopeSimpleIcon, LinkedinLogoIcon } from '@/components/icons'

/** Bloc navy de fin de page. */
export function ContactSection() {
  const { resolve } = useTranslation()
  const { labels, personal } = resumeConfig
  const email = getContact('email')
  const phone = getContact('phone')
  const linkedin = getContact('linkedin')

  return (
    <section
      data-anchor="contact"
      aria-labelledby="contact-title"
      className="flex flex-wrap items-center justify-between gap-7 rounded-[10px] border border-(color:--os-contact-border) bg-navy p-[clamp(24px,4vw,40px)] text-[#f5f3ee]"
    >
      <div className="flex min-w-0 flex-col gap-2.5">
        <p className="m-0 font-mono text-[13px] text-[#e6cc75]">{labels.contact.prompt}</p>
        <h2 id="contact-title" className="m-0 text-[28px] leading-tight font-bold tracking-[-0.02em]">
          {resolve(labels.contact.title)}
        </h2>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[13.5px] text-[#c9d5de]">
          {email && (
            <a href={email.href} className="text-[#c9d5de] underline hover:text-[#e6cc75]">
              {email.label}
            </a>
          )}
          {phone && (
            <a href={phone.href} className="text-[#c9d5de] underline hover:text-[#e6cc75]">
              {phone.label}
            </a>
          )}
          <span>{personal.location}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {email?.href && (
          <Button variant="primary" href={email.href} icon={<EnvelopeSimpleIcon />}>
            {resolve(labels.actions.sendEmail)}
          </Button>
        )}
        {linkedin?.href && (
          <Button
            variant="secondary"
            href={linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            icon={<LinkedinLogoIcon />}
          >
            {resolve(labels.actions.linkedin)}
          </Button>
        )}
      </div>
    </section>
  )
}
