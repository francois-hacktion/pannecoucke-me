import type { ResumeConfig, Tag, Tone } from './types'

/**
 * Source unique du contenu du CV.
 *
 * Conventions de copy :
 * - pas de tiret cadratin, périodes écrites "2015 - 2024" ;
 * - en français, écrire les espaces avant : ; ? ! « » normalement :
 *   elles sont rendues insécables automatiquement (cf. lib/i18n) ;
 * - **gras** accepté dans les textes riches (tâches, engagements).
 */

/** Raccourci pour déclarer un tag bilingue. */
const tag = (fr: string, en: string, tone: Tone): Tag => ({ label: { fr, en }, tone })

export const resumeConfig: ResumeConfig = {
  // ===== SITE =====
  site: {
    url: 'https://pannecoucke.me',
    domain: 'pannecoucke.me',
  },

  // ===== INFORMATIONS PERSONNELLES =====
  personal: {
    name: 'François Pannecoucke',
    photo: '/images/profil.jpg',
    photoBackEmoji: '🚀',
    title: {
      fr: 'Product leader/builder | Transformation digitale',
      en: 'Product leader/builder | Digital transformation',
    },
    headline: {
      fr: 'Product leader/builder · Transformation digitale',
      en: 'Product leader/builder · Digital transformation',
    },
    intro: {
      fr: 'J\'aide les équipes à livrer plus vite ce qui compte. 20 ans entre la banque, l\'assurance et le produit.',
      en: 'I help teams ship what matters, faster. 20 years across banking, insurance and product.',
    },
    tagline: {
      fr: 'Je ne suis pas né dans le code. Je suis né dans le business.',
      en: 'I wasn\'t born in code. I was born in business.',
    },
    mantra: {
      fr: '« La technologie ne révèle son plein potentiel que si l\'humain en est le héros. »',
      en: '"Technology only reaches its full potential when people are the heroes."',
    },
    city: 'Arras',
    location: 'Arras, France',
    status: {
      fr: 'Mission en cours · Abeille',
      en: 'Current mission · Abeille',
    },
  },

  // ===== SEO =====
  seo: {
    title: {
      fr: 'François Pannecoucke · Product leader/builder | Transformation digitale',
      en: 'François Pannecoucke · Product leader/builder | Digital transformation',
    },
    description: {
      fr: 'CV de François Pannecoucke, product leader/builder et consultant en transformation digitale et IA à Arras (Hacktion). 20 ans entre la banque, l\'assurance et le produit. En mission chez Abeille Assurances.',
      en: 'Resume of François Pannecoucke, product leader/builder and digital transformation & AI consultant based in Arras, France (Hacktion). 20 years across banking, insurance and product. Currently on assignment at Abeille Assurances.',
    },
  },

  // ===== LANGUES DU SITE =====
  languages: {
    default: 'fr',
    available: ['fr', 'en'],
    labels: {
      fr: 'FR',
      en: 'EN',
    },
  },

  // ===== CONTACT =====
  contact: [
    { type: 'email', label: 'francois@pannecoucke.fr' },
    { type: 'phone', label: '+33 6 07 69 98 34', href: 'tel:+33607699834' },
    { type: 'linkedin', label: 'François Pannecoucke', href: 'https://linkedin.com/in/francois-pannecoucke' },
    { type: 'github', label: 'hacktion', href: 'https://github.com/hacktion' },
    { type: 'website', label: 'hacktion.fr', href: 'https://hacktion.fr' },
    { type: 'location', label: 'Arras, France' },
  ],

  // ===== PARCOURS =====
  experiences: [
    {
      id: 'hacktion',
      company: 'Hacktion',
      role: {
        fr: 'Fondateur, consultant en transformation digitale et IA',
        en: 'Founder, digital transformation & AI consultant',
      },
      period: { fr: 'depuis 2024', en: 'since 2024' },
      badges: [
        tag('Conseil', 'Consulting', 'gold'),
        tag('Innovation', 'Innovation', 'blue'),
        tag('Formation', 'Training', 'cyan'),
      ],
      description: {
        fr: 'Fondateur. Mon cabinet de conseil en transformation digitale et IA, à Arras. Trois clients principaux :',
        en: 'Founder. My digital transformation and AI consulting firm, based in Arras. Three main clients:',
      },
      missions: [
        {
          id: 'abeille',
          client: 'Abeille Assurances',
          isOngoing: true,
          description: {
            fr: 'J\'accompagne l\'équipe E Visibilité - Innovation sur une question simple : comment faire mieux, plus vite et plus efficacement ?',
            en: 'I support the E Visibilité - Innovation team on a simple question: how can we work better, faster and more efficiently?',
          },
          tasks: {
            fr: [
              'Diagnostic de l\'organisation avec le modèle de **Weisbord** : un cadre éprouvé, appliqué à leur réalité.',
              'Les bonnes pratiques de la démarche **DIAGNum**, adaptées à leur contexte.',
              'Des pistes concrètes pour gagner en vitesse et en efficacité.',
            ],
            en: [
              'Organisational diagnosis using the **Weisbord** model: a proven framework, applied to their reality.',
              'Best practices from the **DIAGNum** approach, adapted to their context.',
              'Concrete levers to gain speed and efficiency.',
            ],
          },
          tags: [
            tag('Innovation', 'Innovation', 'blue'),
            tag('Weisbord', 'Weisbord', 'violet'),
            tag('DIAGNum', 'DIAGNum', 'blue'),
            tag('Diagnostic organisationnel', 'Organisational diagnosis', 'violet'),
          ],
        },
        {
          id: 'axa',
          client: 'AXA',
          title: { fr: 'Product leader Data & IA', en: 'Data & AI product leader' },
          period: { fr: '10/2024 - 12/2025', en: '10/2024 - 12/2025' },
          description: {
            fr: 'J\'ai lancé et piloté le projet Ariane B2B de A à Z. Prototype No-code livré en 6 mois au lieu de 18.',
            en: 'I launched and led the Ariane B2B project end to end. No-code prototype delivered in 6 months instead of 18.',
          },
          tasks: {
            fr: [
              '**800k signaux d\'affaires** générés grâce à la donnée.',
              '**670 jours/homme** économisés.',
              'Roadmap adoptée par le board.',
            ],
            en: [
              '**800k business signals** generated from data.',
              '**670 person-days** saved.',
              'Roadmap adopted by the board.',
            ],
          },
          tags: [
            tag('Data & IA', 'Data & AI', 'emerald'),
            tag('No-code', 'No-code', 'emerald'),
            tag('Roadmap produit', 'Product roadmap', 'blue'),
            tag('Stratégie B2B', 'B2B strategy', 'blue'),
          ],
        },
        {
          id: 'af2a',
          client: 'AF2A',
          title: { fr: 'Formateur IA', en: 'AI trainer' },
          period: { fr: 'depuis 2024', en: 'since 2024' },
          description: {
            fr: 'Je forme les réseaux de distribution en assurance à utiliser l\'IA au quotidien.',
            en: 'I train insurance distribution networks to use AI in their daily work.',
          },
          tasks: {
            fr: [
              'Programmes sur-mesure, pensés pour le terrain.',
              '**+550 agents et collaborateurs** autonomes sur l\'IA.',
              'Les réticences sont devenues des usages concrets.',
            ],
            en: [
              'Tailor-made programmes, designed for the field.',
              '**550+ agents and staff** now autonomous with AI.',
              'Reluctance turned into concrete, everyday use.',
            ],
          },
          tags: [
            tag('IA', 'AI', 'emerald'),
            tag('Conduite du changement', 'Change management', 'violet'),
            tag('Ingénierie de formation', 'Training design', 'cyan'),
          ],
        },
      ],
    },
    {
      id: 'agent',
      company: 'AXA',
      title: { fr: 'Agent général AXA', en: 'AXA general agent' },
      role: {
        fr: 'Agent général d\'assurances, dirigeant d\'agence',
        en: 'General insurance agent, agency owner',
      },
      period: { fr: '2015 - 2024', en: '2015 - 2024' },
      badges: [tag('Entrepreneuriat', 'Entrepreneurship', 'rose')],
      description: {
        fr: 'J\'ai dirigé ma propre agence pendant 10 ans. Chiffre d\'affaires doublé, 4 fois la croissance du marché.',
        en: 'I ran my own agency for 10 years. Revenue doubled, 4 times the market\'s growth.',
      },
      tasks: {
        fr: [
          'CA doublé à **350k€ (+106 %)**.',
          'Portefeuille B2B créé de zéro : 25 % du CA.',
          'Gouvernance partagée avec une équipe de 4 experts.',
          '**1ère agence d\'assurance dans le Métavers** : BFM, Les Echos, l\'Argus en ont parlé.',
        ],
        en: [
          'Revenue doubled to **€350k (+106%)**.',
          'B2B portfolio built from scratch: 25% of revenue.',
          'Shared governance with a team of 4 experts.',
          '**1st insurance agency in the Metaverse**: covered by BFM, Les Echos and l\'Argus.',
        ],
      },
      tags: [
        tag('Management', 'Management', 'violet'),
        tag('Projet', 'Project', 'emerald'),
        tag('Stratégie B2B', 'B2B strategy', 'blue'),
        tag('Gouvernance partagée', 'Shared governance', 'violet'),
        tag('Web3 / Métavers', 'Web3 / Metaverse', 'blue'),
      ],
    },
    {
      id: 'cic',
      company: 'CIC & Caisse d\'Épargne',
      role: {
        fr: 'Conseiller clientèle professionnelle, puis directeur d\'agence',
        en: 'Business account manager, then branch manager',
      },
      period: { fr: '2004 - 2015', en: '2004 - 2015' },
      badges: [tag('Banque', 'Banking', 'amber')],
      description: {
        fr: '10 ans de banque, du conseil aux professionnels à la direction d\'agence. Directeur d\'agence, je pilotais un P&L.',
        en: '10 years in banking, from advising business clients to running a branch. As branch manager, I owned a P&L.',
      },
      tasks: {
        fr: [
          'Développement d\'un portefeuille de clients professionnels.',
          'Direction d\'agence : pilotage du P&L et d\'une équipe de 4.',
          'Développement commercial B2B et B2C.',
        ],
        en: [
          'Built a portfolio of business clients.',
          'Branch management: P&L and a team of 4.',
          'B2B and B2C business development.',
        ],
      },
      tags: [
        tag('Management', 'Management', 'violet'),
        tag('Développement commercial', 'Business development', 'rose'),
        tag('P&L', 'P&L', 'blue'),
      ],
    },
  ],

  // ===== COMPÉTENCES =====
  skills: [
    {
      title: { fr: 'Stratégie & vision', en: 'Strategy & vision' },
      tone: 'blue',
      items: [
        { fr: 'Stratégie', en: 'Strategy' },
        { fr: 'Roadmap produit', en: 'Product roadmap' },
        { fr: 'Business model', en: 'Business model' },
        { fr: 'Veille', en: 'Market watch' },
        { fr: 'Innovation', en: 'Innovation' },
        { fr: 'DIAGNum', en: 'DIAGNum' },
      ],
    },
    {
      title: { fr: 'Management', en: 'Management' },
      tone: 'violet',
      items: [
        { fr: 'Gouvernance partagée', en: 'Shared governance' },
        { fr: 'Management d\'experts', en: 'Managing experts' },
        { fr: 'Conduite du changement', en: 'Change management' },
        { fr: 'Diagnostic Weisbord', en: 'Weisbord diagnosis' },
      ],
    },
    {
      title: { fr: 'Exécution & tech', en: 'Execution & tech' },
      tone: 'emerald',
      items: [
        { fr: 'Data/IA', en: 'Data/AI' },
        { fr: 'Product leadership', en: 'Product leadership' },
        { fr: 'No-code', en: 'No-code' },
        { fr: 'Delivery', en: 'Delivery' },
        { fr: 'Agile', en: 'Agile' },
        { fr: 'OKR', en: 'OKR' },
        { fr: 'Open Data', en: 'Open Data' },
        { fr: 'Vibe Coding', en: 'Vibe Coding' },
      ],
    },
    {
      title: { fr: 'Domaine & marché', en: 'Domain & market' },
      tone: 'amber',
      items: [
        { fr: 'Assurance', en: 'Insurance' },
        { fr: 'Banque', en: 'Banking' },
        { fr: 'B2B', en: 'B2B' },
        { fr: 'B2C', en: 'B2C' },
        { fr: 'Développement commercial', en: 'Business development' },
      ],
    },
  ],

  // ===== ENGAGEMENTS (du plus récent au plus ancien) =====
  engagements: [
    {
      id: 'reussir',
      period: { fr: '2023 - 2024', en: '2023 - 2024' },
      text: {
        fr: '**Réussir** (syndicat des agents AXA) : commissions digitales et data.',
        en: '**Réussir** (AXA agents\' union): digital and data committees.',
      },
    },
    {
      id: 'no-code-france',
      period: { fr: '2022', en: '2022' },
      text: {
        fr: '**No-code France** : cofondateur de l\'association, membre du premier conseil d\'administration.',
        en: '**No-code France**: co-founder of the association, member of its first board.',
      },
    },
    {
      id: 'collectif-no-code',
      period: { fr: 'depuis 2020', en: 'since 2020' },
      text: {
        fr: '**Collectif No-code France** : membre actif.',
        en: '**No-code France collective**: active member.',
      },
    },
  ],

  // ===== FORMATION =====
  education: [
    {
      degree: { fr: 'Executive Mastère Spécialisé MSIT', en: 'Executive Advanced Master MSIT' },
      school: 'Mines Paris - PSL',
      details: { fr: 'Bac +6 · en cours', en: 'Postgraduate · in progress' },
      period: '2026',
    },
    {
      degree: { fr: 'IUP Banque Finance Assurance', en: 'IUP Banking, Finance & Insurance' },
      school: 'IAE Lille',
      details: { fr: 'Bac +4', en: 'Master\'s level 1' },
      period: '2004',
    },
    {
      degree: { fr: 'Bac scientifique', en: 'Scientific baccalaureate' },
      school: 'Sacré-Cœur Tourcoing',
      period: '2000',
    },
  ],

  // ===== EN DEHORS DU TRAVAIL =====
  hobbies: [
    {
      title: { fr: 'Tech & innovation', en: 'Tech & innovation' },
      description: {
        fr: 'Vibe coding, open source, communauté No-code.',
        en: 'Vibe coding, open source, No-code community.',
      },
    },
    {
      title: { fr: 'Jeux de rôle', en: 'Role-playing games' },
      description: {
        fr: 'Magic the Gathering, grandeur nature.',
        en: 'Magic the Gathering, live-action role-play.',
      },
    },
    {
      title: { fr: 'Lecture', en: 'Reading' },
      description: {
        fr: 'Heroic fantasy : Robin Hobb, Tolkien, McCaffrey.',
        en: 'Heroic fantasy: Robin Hobb, Tolkien, McCaffrey.',
      },
    },
  ],

  // ===== LANGUES PARLÉES =====
  spokenLanguages: [
    { name: { fr: 'Français', en: 'French' }, level: { fr: 'natif', en: 'native' } },
    { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'professionnel', en: 'professional' } },
  ],

  // ===== PDF =====
  // Remplacer le fichier dans public/cv/ (ou changer le chemin) pour publier un nouveau CV.
  pdf: {
    path: {
      fr: '/cv/CV_Francois_Pannecoucke_2026_Transfo.pdf',
      en: '/cv/CV_Francois_Pannecoucke_2026_Transfo.pdf',
    },
  },

  // ===== THÈME =====
  theme: {
    defaultMode: 'light',
  },

  // ===== LABELS UI =====
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
      prompt: '$ contact --francois',
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
