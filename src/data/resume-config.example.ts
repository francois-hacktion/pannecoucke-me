import type { ResumeConfig, Tag, Tone } from './types'

/**
 * Exemple de configuration.
 * Copier ce fichier dans `resume-config.ts` et le remplir avec ses propres informations.
 *
 * Les textes multilingues utilisent le format `LocalizedString` : { fr: '…', en: '…' }.
 * Les textes "riches" (tâches, engagements) acceptent **gras**.
 * Voir docs/CUSTOMIZATION.md pour le détail de chaque champ.
 */
const tag = (fr: string, en: string, tone: Tone): Tag => ({ label: { fr, en }, tone })

export const resumeConfig: ResumeConfig = {
  site: {
    url: 'https://janedoe.dev',
    domain: 'janedoe.dev',
  },

  personal: {
    name: 'Jane Doe',
    photo: '/images/photo.jpg', // Format portrait 440×528 conseillé, dans public/images/
    photoBackEmoji: '👩‍💻', // Affiché au dos de la photo (flip 3D au clic)
    title: { fr: 'Développeuse fullstack', en: 'Fullstack developer' },
    headline: { fr: 'Développeuse fullstack · React', en: 'Fullstack developer · React' },
    intro: {
      fr: 'Je conçois des produits web rapides et accessibles. 8 ans entre la startup et le grand compte.',
      en: 'I build fast, accessible web products. 8 years between startups and large companies.',
    },
    tagline: { fr: 'Le code est un moyen, pas une fin.', en: 'Code is a means, not an end.' },
    mantra: { fr: '« Faire simple, c\'est difficile. »', en: '"Simple is hard."' },
    city: 'Paris',
    location: 'Paris, France',
    status: { fr: 'Disponible', en: 'Available' },
  },

  seo: {
    title: { fr: 'Jane Doe · Développeuse fullstack', en: 'Jane Doe · Fullstack developer' },
    description: {
      fr: 'CV de Jane Doe, développeuse fullstack React et TypeScript à Paris.',
      en: 'Resume of Jane Doe, fullstack React and TypeScript developer in Paris.',
    },
  },

  languages: {
    default: 'fr',
    available: ['fr', 'en'],
    labels: { fr: 'FR', en: 'EN' },
  },

  contact: [
    { type: 'email', label: 'jane@example.com' },
    { type: 'phone', label: '+33 6 12 34 56 78' },
    { type: 'linkedin', label: 'Jane Doe', href: 'https://linkedin.com/in/janedoe' },
    { type: 'github', label: 'janedoe', href: 'https://github.com/janedoe' },
    { type: 'location', label: 'Paris, France' },
  ],

  experiences: [
    {
      id: 'freelance',
      company: 'Jane Doe Studio',
      role: { fr: 'Développeuse freelance', en: 'Freelance developer' },
      period: { fr: 'depuis 2022', en: 'since 2022' },
      badges: [tag('Freelance', 'Freelance', 'gold')],
      description: { fr: 'Mon studio de développement. Deux clients principaux :', en: 'My development studio. Two main clients:' },
      missions: [
        {
          id: 'acme',
          client: 'Acme',
          isOngoing: true, // Ouverte par défaut dans l'accordéon
          description: { fr: 'Refonte du tunnel de commande.', en: 'Checkout funnel redesign.' },
          tasks: {
            fr: ['Conversion en hausse de **+12 %**.', 'Migration vers React 19.'],
            en: ['Conversion up **+12%**.', 'Migration to React 19.'],
          },
          tags: [tag('React', 'React', 'emerald'), tag('Performance', 'Performance', 'blue')],
        },
      ],
    },
    {
      id: 'startup',
      company: 'Startup SAS',
      title: { fr: 'Lead dev chez Startup', en: 'Lead dev at Startup' },
      role: { fr: 'Lead développeuse', en: 'Lead developer' },
      period: { fr: '2018 - 2022', en: '2018 - 2022' },
      badges: [tag('CDI', 'Full-time', 'navy')],
      description: { fr: 'J\'ai monté l\'équipe front de 1 à 6 personnes.', en: 'I grew the front-end team from 1 to 6 people.' },
      tasks: {
        fr: ['Design system interne adopté par **4 équipes**.'],
        en: ['Internal design system adopted by **4 teams**.'],
      },
      tags: [tag('Management', 'Management', 'violet'), tag('TypeScript', 'TypeScript', 'emerald')],
    },
  ],

  skills: [
    {
      title: { fr: 'Front-end', en: 'Front-end' },
      tone: 'emerald',
      items: [{ fr: 'React', en: 'React' }, { fr: 'TypeScript', en: 'TypeScript' }],
    },
    {
      title: { fr: 'Management', en: 'Management' },
      tone: 'violet',
      items: [{ fr: 'Recrutement', en: 'Hiring' }, { fr: 'Mentorat', en: 'Mentoring' }],
    },
  ],

  engagements: [
    {
      id: 'meetup',
      period: { fr: 'depuis 2020', en: 'since 2020' },
      text: { fr: '**Paris.js** : co-organisatrice.', en: '**Paris.js**: co-organiser.' },
    },
  ],

  education: [
    {
      degree: { fr: 'Diplôme d\'ingénieure', en: 'Engineering degree' },
      school: 'École Exemple',
      details: { fr: 'Bac +5', en: 'Master\'s level' },
      period: '2016',
    },
  ],

  hobbies: [
    { title: { fr: 'Escalade', en: 'Climbing' }, description: { fr: 'Bloc, en salle.', en: 'Indoor bouldering.' } },
  ],

  spokenLanguages: [
    { name: { fr: 'Français', en: 'French' }, level: { fr: 'natif', en: 'native' } },
    { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'courant', en: 'fluent' } },
  ],

  pdf: {
    path: { fr: '/cv/cv-fr.pdf', en: '/cv/cv-en.pdf' },
  },

  theme: {
    defaultMode: 'light', // 'light' | 'dark' | 'system' (absent : selon l'heure)
  },

  labels: {
    nav: {
      profil: { fr: 'Profil', en: 'Profile' },
      parcours: { fr: 'Parcours', en: 'Experience' },
      competences: { fr: 'Compétences', en: 'Skills' },
      formation: { fr: 'Formation', en: 'Education' },
      contact: { fr: 'Contact', en: 'Contact' },
    },
    navAriaLabel: { fr: 'Sections du CV', en: 'Resume sections' },
    mantra: { fr: 'Mon mantra', en: 'My mantra' },
    experience: {
      eyebrow: { fr: 'Parcours', en: 'Experience' },
      title: { fr: 'Ce que j\'ai fait', en: 'What I\'ve done' },
      hint: { fr: 'Cliquez sur une ligne pour le détail.', en: 'Click a row for details.' },
      mission: { fr: 'mission', en: 'mission' },
      ongoing: { fr: 'en cours', en: 'ongoing' },
    },
    skills: {
      eyebrow: { fr: 'Compétences', en: 'Skills' },
      title: { fr: 'Ce que je sais faire', en: 'What I can do' },
    },
    engagements: { eyebrow: { fr: 'Engagements', en: 'Commitments' } },
    education: { eyebrow: { fr: 'Formation', en: 'Education' } },
    hobbies: { eyebrow: { fr: 'En dehors du travail', en: 'Outside work' } },
    languages: { eyebrow: { fr: 'Langues', en: 'Languages' } },
    contact: {
      prompt: '$ contact --jane',
      title: { fr: 'On en parle ?', en: 'Shall we talk?' },
    },
    actions: {
      contactMe: { fr: 'Me contacter', en: 'Get in touch' },
      downloadCv: { fr: 'Télécharger le CV', en: 'Download my CV' },
      downloadCvShort: { fr: 'CV PDF', en: 'CV PDF' },
      sendEmail: { fr: 'Écrire un e-mail', en: 'Send an email' },
      linkedin: { fr: 'LinkedIn', en: 'LinkedIn' },
      switchToDark: { fr: 'Passer en mode sombre', en: 'Switch to dark mode' },
      switchToLight: { fr: 'Passer en mode clair', en: 'Switch to light mode' },
      language: { fr: 'Langue', en: 'Language' },
      flipPhoto: { fr: 'Retourner la photo', en: 'Flip the photo' },
    },
  },
}
