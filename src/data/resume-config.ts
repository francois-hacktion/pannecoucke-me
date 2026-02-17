import type { ResumeConfig } from './types'

export const resumeConfig: ResumeConfig = {
  // ===== PERSONAL INFO =====
  personal: {
    name: 'François Pannecoucke',
    photo: '/images/photo.jpg', // TODO: Add photo
    photoBackEmoji: '🚀',
    title: {
      en: 'Transformation Director & Digital Consultant',
      fr: 'Directeur de la Transformation & Consultant Digital',
    },
    subtitle: {
      en: 'Building digital products & automating workflows',
      fr: 'Création de produits digitaux & automatisation de workflows',
    },
    location: 'France',
  },

  // ===== SEO =====
  seo: {
    title: 'François Pannecoucke — Transformation Director',
    description: 'CV Interactif de François Pannecoucke, Directeur de la Transformation et expert en produits digitaux.',
  },

  // ===== LANGUAGES =====
  languages: {
    default: 'fr',
    available: ['fr', 'en'],
    labels: {
      en: 'EN',
      fr: 'FR',
    },
  },

  // ===== CONTACT =====
  contact: [
    { type: 'github', label: 'hacktion', href: 'https://github.com/hacktion' },
    { type: 'linkedin', label: 'François Pannecoucke', href: 'https://linkedin.com/in/francois-pannecoucke' },
    { type: 'email', label: 'francois.pannecoucke@example.com' },
    { type: 'location', label: 'France' },
  ],

  // ===== SKILLS =====
  skills: [
    {
      title: { en: 'Expertise', fr: 'Expertise' },
      type: 'badges',
      items: [
        { name: 'Transformation Digitale' },
        { name: 'Produit & No-Code' },
        { name: 'Automatisation' },
        { name: 'Architecture' },
      ],
    },
    {
      title: { en: 'Tech Stack', fr: 'Stack Technique' },
      type: 'badges',
      items: [
        { name: 'Astro' },
        { name: 'Tailwind CSS' },
        { name: 'Cloudflare' },
        { name: 'GitHub' },
        { name: 'Make/n8n' },
      ],
    },
    {
      title: { en: 'Languages', fr: 'Langues' },
      type: 'languages',
      items: [
        { name: { en: 'French', fr: 'Français' }, level: { en: 'Native', fr: 'Natif' } },
        { name: { en: 'English', fr: 'Anglais' }, level: { en: 'Professional', fr: 'Professionnel' } },
      ],
    },
  ],

  // ===== PROFESSIONAL EXPERIENCES =====
  experiences: [
    {
      id: 'current-role',
      company: { en: 'Current Company', fr: 'Entreprise Actuelle' }, // À mettre à jour
      role: { en: 'Transformation Director', fr: 'Directeur de la Transformation' },
      type: { en: 'Full-time', fr: 'CDI' },
      period: { en: 'Present', fr: 'Présent' },
      description: {
        en: 'Leading digital transformation initiatives and product strategy.',
        fr: 'Pilotage des initiatives de transformation digitale et stratégie produit.',
      },
      techs: ['Strategy', 'Management', 'Tech'],
      isHighlighted: true,
      details: {
        context: {
          en: 'Strategic role in digital evolution.',
          fr: 'Rôle stratégique dans l\'évolution numérique.',
        },
        tasks: {
          en: ['Defining digital roadmap', 'Managing tech teams', 'Product delivery'],
          fr: ['Définition de la roadmap digitale', 'Management des équipes tech', 'Livraison produit'],
        },
        env: {
          en: 'Digital Ecosystem',
          fr: 'Écosystème Digital',
        },
      },
    },
  ],

  // ===== PROJECTS =====
  projects: [
    {
      id: 'resume-interactive',
      title: { en: 'Interactive Resume', fr: 'CV Interactif' },
      description: {
        en: 'My personal interactive resume built with React and Vite.',
        fr: 'Mon CV interactif personnel construit avec React et Vite.',
      },
      techs: ['React', 'Vite', 'Tailwind'],
      github: 'https://github.com/hacktion/interactive-resume-pannecoucke',
    },
  ],

  // ===== EDUCATION =====
  education: [
    {
      school: { en: 'School Name', fr: 'École / Université' }, // À mettre à jour
      degree: { en: 'Degree Name', fr: 'Diplôme' },
      period: '20xx - 20xx',
    },
  ],

  // ===== HOBBIES =====
  hobbies: [
    {
      title: { en: 'Tech', fr: 'Tech' },
      details: [
        { en: 'Open Source', fr: 'Open Source' },
        { en: 'Product Hunt', fr: 'Product Hunt' },
      ],
    },
  ],
  
  pdf: {
    label: { en: 'Download PDF', fr: 'Télécharger le PDF' },
    path: { en: '/cv/resume.pdf', fr: '/cv/resume.pdf' },
  },

  theme: {
    preset: 'slate',
  },

  labels: {
     sections: {
      contact: { en: 'CONTACT', fr: 'CONTACT' },
      skills: { en: 'SKILLS', fr: 'COMPÉTENCES' },
      experience: { en: 'PROFESSIONAL EXPERIENCE', fr: 'EXPÉRIENCES PROFESSIONNELLES' },
      education: { en: 'EDUCATION', fr: 'FORMATION' },
      projects: { en: 'PROJECTS', fr: 'PROJETS' },
      hobbies: { en: 'HOBBIES', fr: 'LOISIRS' },
    },
    experience: {
      mainTasks: { en: 'Main tasks:', fr: 'Tâches principales :' },
      moreTasks: { en: 'more tasks...', fr: 'autres tâches...' },
      training: { en: 'Training:', fr: 'Formations :' },
      techEnv: { en: 'Tech environment:', fr: 'Env. technique :' },
      technologies: { en: 'Technologies', fr: 'Technologies' },
    },
    actions: {
      clickHint: { en: 'Click on experiences to see more details', fr: 'Cliquez sur les expériences pour voir plus de détails' },
      switchTheme: { en: 'Toggle dark mode', fr: 'Changer le thème' },
      downloadPdf: { en: 'Download PDF', fr: 'Télécharger le PDF' },
    },
  }
}
