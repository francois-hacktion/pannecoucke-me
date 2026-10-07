// ===== LOCALISATION =====

export type LocalizedString = Record<string, string>

export type LocalizedStringArray = Record<string, string[]>

// ===== TAGS =====

/**
 * Teintes du design system Hacktion (cf. globals.css, variables --tone-*).
 * Règle : Stratégie = blue, Management = violet, Exécution & Tech = emerald,
 * Domaine = amber, Formation = cyan, Entrepreneuriat/Business = rose, Hacktion/Conseil = gold.
 */
export type Tone = 'blue' | 'violet' | 'emerald' | 'amber' | 'cyan' | 'rose' | 'navy' | 'gold'

export interface Tag {
  label: LocalizedString
  tone: Tone
}

// ===== CONTACT =====

export type ContactType = 'email' | 'phone' | 'location' | 'github' | 'linkedin' | 'website'

export interface ContactItem {
  type: ContactType
  label: string
  href?: string
}

// ===== NAVIGATION =====

/** Sections présentes dans la navigation de la headerbar (dans l'ordre). */
export type SectionId = 'profil' | 'parcours' | 'competences' | 'formation' | 'contact'

// ===== PARCOURS =====

/**
 * Les textes marqués "riche" acceptent **gras** (syntaxe Markdown minimale).
 */
export interface Mission {
  id: string
  client: string
  title?: LocalizedString
  period?: LocalizedString
  isOngoing?: boolean
  description: LocalizedString
  /** Texte riche */
  tasks: LocalizedStringArray
  tags: Tag[]
}

export interface Experience {
  id: string
  /** Organisation (JSON-LD, ATS) */
  company: string
  /** Titre affiché sur la ligne. Par défaut : company */
  title?: LocalizedString
  /** Intitulé de poste (ATS, noscript) */
  role: LocalizedString
  period: LocalizedString
  badges: Tag[]
  description: LocalizedString
  /** Texte riche */
  tasks?: LocalizedStringArray
  tags?: Tag[]
  /** Missions imbriquées : la ligne n'est alors pas dépliable, chaque mission l'est. */
  missions?: Mission[]
}

// ===== COMPÉTENCES =====

export interface SkillCategory {
  /** Identifiant affiché en mono, façon variable : strategie_produit */
  title: LocalizedString
  /** Libellé lu par les lecteurs d'écran à la place de l'identifiant (strategie_produit → Stratégie produit) */
  spoken?: LocalizedString
  items: LocalizedString[]
}

export interface SpokenLanguage {
  name: LocalizedString
  level: LocalizedString
}

// ===== ENGAGEMENTS =====

export interface Engagement {
  id: string
  period: LocalizedString
  /** Texte riche : **Nom** (précision) */
  title: LocalizedString
  detail: LocalizedString
}

// ===== FORMATION =====

export interface Education {
  degree: LocalizedString
  school: string
  /** Complément affiché après l'école (niveau, statut) */
  details?: LocalizedString
  period: string
}

// ===== EN DEHORS DU TRAVAIL =====

export interface Hobby {
  title: LocalizedString
  description: LocalizedString
}

// ===== LABELS UI =====

export interface ResumeLabels {
  nav: Record<SectionId, LocalizedString>
  navAriaLabel: LocalizedString
  mantra: LocalizedString
  experience: {
    eyebrow: LocalizedString
    title: LocalizedString
    hint: LocalizedString
    mission: LocalizedString
    ongoing: LocalizedString
  }
  skills: {
    eyebrow: LocalizedString
    title: LocalizedString
  }
  engagements: { eyebrow: LocalizedString }
  education: { eyebrow: LocalizedString }
  hobbies: { eyebrow: LocalizedString }
  languages: { eyebrow: LocalizedString }
  contact: {
    prompt: string
    title: LocalizedString
  }
  actions: {
    contactMe: LocalizedString
    downloadCv: LocalizedString
    downloadCvShort: LocalizedString
    sendEmail: LocalizedString
    linkedin: LocalizedString
    switchToDark: LocalizedString
    switchToLight: LocalizedString
    language: LocalizedString
    flipPhoto: LocalizedString
  }
}

// ===== CONFIG PRINCIPALE =====

export interface ResumeConfig {
  site: {
    /** URL canonique, sans slash final */
    url: string
    /** Domaine affiché dans la headerbar */
    domain: string
  }
  personal: {
    name: string
    /** Photo publique (JSON-LD). Le hero affiche src/assets/profil.jpg, décliné en AVIF/WebP par Astro */
    photo?: string
    photoBackEmoji?: string
    /** Intitulé (SEO, JSON-LD) */
    title: LocalizedString
    /** Eyebrow du hero */
    headline: LocalizedString
    intro: LocalizedString
    tagline?: LocalizedString
    mantra?: LocalizedString
    city: string
    location: string
    /** Statut affiché dans la barre d'état */
    status?: LocalizedString
  }
  seo: {
    title: LocalizedString
    description: LocalizedString
  }
  languages: {
    default: string
    available: string[]
    labels: Record<string, string>
  }
  contact: ContactItem[]
  experiences: Experience[]
  skills: SkillCategory[]
  engagements?: Engagement[]
  education: Education[]
  hobbies?: Hobby[]
  spokenLanguages?: SpokenLanguage[]
  pdf?: {
    /** Un chemin pour toutes les langues, ou un chemin par langue (bouton masqué si absent) */
    path: string | LocalizedString
  }
  theme?: {
    defaultMode?: 'light' | 'dark' | 'system'
  }
  labels: ResumeLabels
}
