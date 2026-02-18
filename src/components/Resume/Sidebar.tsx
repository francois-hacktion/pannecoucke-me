import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { assetUrl } from '@/lib/utils'
import { SidebarSection } from './SidebarSection'
import { ContactItem } from './ContactItem'
import { SkillCategory } from './SkillCategory'
import { TechBadge } from './TechBadge'

const PHOTO_ANIMATION_DURATION = 0.8

function SidebarPhoto({ photo, name, emoji }: { photo: string; name: string; emoji?: string }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleFlip = () => {
    if (isSpinning) return
    setIsSpinning(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFlip()
    }
  }

  if (hasError) {
    return (
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-resume-primary to-resume-primary-light flex items-center justify-center border-4 border-resume-bg/30 shadow-lg">
          <span className="text-4xl">{emoji || '👨‍💻'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center mb-6" style={{ perspective: '300px' }}>
      <motion.div
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        onAnimationComplete={() => setIsSpinning(false)}
        animate={{ rotateY: isSpinning ? 360 : 0 }}
        transition={{ duration: PHOTO_ANIMATION_DURATION, ease: 'easeInOut' }}
        className="relative w-32 h-32 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        role="button"
        tabIndex={0}
        aria-label={`Photo of ${name} — click to flip`}
      >
        <div
          className="absolute inset-0 rounded-full overflow-hidden border-4 border-resume-bg/30 shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={photo}
            alt={`Profile photo of ${name}`}
            className="object-cover w-full h-full"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        </div>
        <div
          className="absolute inset-0 rounded-full border-4 border-resume-bg/30 shadow-lg bg-gradient-to-br from-resume-primary to-resume-primary-light flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-4xl">{emoji || '👨‍💻'}</span>
        </div>
      </motion.div>
    </div>
  )
}

export function Sidebar() {
  const { resolve } = useTranslation()
  const { personal, contact, skills, hobbies, labels } = resumeConfig

  return (
    <div className="md:w-[38%] bg-gradient-to-b from-resume-sidebar-from to-resume-sidebar-to p-8">
      {/* Photo */}
      {personal.photo && (
        <SidebarPhoto
          photo={assetUrl(personal.photo)}
          name={personal.name}
          emoji={personal.photoBackEmoji}
        />
      )}

      {/* Contact */}
      <SidebarSection title={resolve(labels.sections.contact)}>
        <div className="space-y-3">
          {contact.map((item) => (
            <ContactItem key={`${item.type}-${item.label}`} type={item.type} label={item.label} href={item.href} />
          ))}
        </div>
      </SidebarSection>

      {/* Skills */}
      <SidebarSection title={resolve(labels.sections.skills)}>
        <div className="space-y-4">
          {skills.map((category, i) => (
            <SkillCategory key={`${resolve(category.title)}-${i}`} title={resolve(category.title)}>
              {category.type === 'badges' && (
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => {
                    const techName = typeof item.name === 'string' ? item.name : resolve(item.name)
                    return <TechBadge key={techName} tech={techName} color={item.color} />
                  })}
                </div>
              )}
              {category.type === 'text' && (
                <p className="text-xs text-resume-text-secondary">
                  {category.items
                    .map((item) => (typeof item.name === 'string' ? item.name : resolve(item.name)))
                    .join(', ')}
                </p>
              )}
              {category.type === 'languages' && (
                <div className="space-y-2.5">
                  {category.items.map((item, j) => {
                    const name = typeof item.name === 'string' ? item.name : resolve(item.name)
                    const level = item.level ? resolve(item.level) : ''
                    // Calcul du niveau en pourcentage selon le label
                    const levelLower = level.toLowerCase()
                    const pct =
                      levelLower === 'native' || levelLower === 'natif' ? 100
                        : levelLower === 'professional' || levelLower === 'professionnel' ? 80
                          : levelLower === 'intermediate' || levelLower === 'intermédiaire' ? 60
                            : levelLower === 'basic' || levelLower === 'débutant' ? 40
                              : 70
                    return (
                      <div key={`${name}-${j}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-resume-text">{name}</span>
                          <span className="text-xs text-resume-text-secondary">{level}</span>
                        </div>
                        <div className="h-1 bg-resume-primary/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-resume-primary rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </SkillCategory>
          ))}
        </div>
      </SidebarSection>

      {/* Hobbies */}
      {hobbies && hobbies.length > 0 && labels.sections.hobbies && (
        <SidebarSection title={resolve(labels.sections.hobbies)}>
          <div className="space-y-3">
            {hobbies.map((hobby, i) => (
              <div key={`${resolve(hobby.title)}-${i}`}>
                <p className="font-medium text-sm text-resume-text">{resolve(hobby.title)}</p>
                {hobby.details?.map((detail, j) => (
                  <p key={j} className="text-xs text-resume-text-secondary">
                    {resolve(detail)}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </SidebarSection>
      )}
    </div>
  )
}
