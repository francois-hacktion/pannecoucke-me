import type { ResumeConfig } from './types'

export const resumeConfig: ResumeConfig = {
  // ===== INFORMATIONS PERSONNELLES =====
  personal: {
    name: 'François Pannecoucke',
    photo: '/images/profil_bureau.jpg',
    photoBackEmoji: '🚀',
    title: {
      en: 'Transformation Architect | Product Strategy & Development',
      fr: 'Architecte de la Transformation | Stratégie produit et développement',
    },
    subtitle: {
      en: 'Turning innovation into measurable business value',
      fr: 'Transformer les innovations en valeur business mesurable',
    },
    location: 'Arras, France',
  },

  // ===== SEO =====
  seo: {
    title: 'François Pannecoucke — Architecte de la Transformation',
    description: 'CV Interactif de François Pannecoucke. Leader entrepreneur, expert en transformation digitale, stratégie produit et développement. Track-record : croissance 4x supérieure au marché, 670 jours/homme économisés.',
  },

  // ===== LANGUES DU SITE =====
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
    { type: 'phone', label: '+33 6 07 69 98 34' },
    { type: 'email', label: 'francois@pannecoucke.fr' },
    { type: 'linkedin', label: 'François Pannecoucke', href: 'https://linkedin.com/in/francois-pannecoucke' },
    { type: 'github', label: 'hacktion', href: 'https://github.com/hacktion' },
    { type: 'website', label: 'hacktion.fr', href: 'https://hacktion.fr' },
    { type: 'location', label: 'Arras, France (62000)' },
  ],

  // ===== COMPÉTENCES =====
  skills: [
    {
      title: { en: 'Strategy & Vision', fr: 'Stratégie & Vision' },
      type: 'badges',
      items: [
        { name: { en: 'Strategic planning', fr: 'Stratégie' } },
        { name: { en: 'Product roadmap', fr: 'Roadmap' } },
        { name: { en: 'Competitive intelligence', fr: 'Veille' } },
        { name: { en: 'Business model innovation', fr: 'Business Model' } },
        { name: { en: 'Innovation', fr: 'Innovation' } },
      ],
    },
    {
      title: { en: 'Management', fr: 'Management' },
      type: 'badges',
      items: [
        { name: { en: 'Shared governance', fr: 'Gouvernance partagée' } },
        { name: { en: 'Management', fr: 'Management' } },
        { name: { en: 'Change management', fr: 'Conduite du changement' } },
        { name: { en: 'Training', fr: 'Formation' } },
      ],
    },
    {
      title: { en: 'Execution & Tech', fr: 'Exécution & Tech' },
      type: 'badges',
      items: [
        { name: { en: 'Data/AI', fr: 'Data/IA' } },
        { name: { en: 'No-code', fr: 'No-code' } },
        { name: { en: 'Agile', fr: 'Agile' } },
        { name: { en: 'OKR', fr: 'OKR' } },
        { name: { en: 'Open Data', fr: 'Open Data' } },
        { name: { en: 'Vibe Coding', fr: 'Vibe Coding' } },
      ],
    },
    {
      title: { en: 'Domain & Market', fr: 'Domaine & Marché' },
      type: 'badges',
      items: [
        { name: { en: 'Insurance', fr: 'Assurance' } },
        { name: { en: 'Banking', fr: 'Banque' } },
        { name: { en: 'B2B', fr: 'B2B' } },
        { name: { en: 'B2C', fr: 'B2C' } },
        { name: { en: 'Business development', fr: 'Développement commercial' } },
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

  // ===== EXPÉRIENCES PROFESSIONNELLES =====
  experiences: [
    {
      id: 'hacktion',
      company: { en: 'Hacktion', fr: 'Hacktion' },
      role: { en: 'Founder & Digital Transformation Consultant', fr: 'Fondateur & Consultant en Transformation Digitale' },
      type: { en: 'Consulting', fr: 'Conseil' },
      description: {
        en: 'Consulting firm specializing in digital transformation, AI strategy and product leadership.',
        fr: 'Cabinet de conseil spécialisé en transformation digitale, stratégie IA et leadership produit.',
      },
      techs: [
        { en: 'Product Leadership', fr: 'Leadership Produit' },
        { en: 'AI', fr: 'IA' },
        { en: 'No-code', fr: 'No-code' },
        { en: 'Innovation', fr: 'Innovation' },
      ],
      isHighlighted: true,
    },
    {
      id: 'axa-consultant',
      company: { en: 'AXA', fr: 'AXA' },
      role: { en: 'Strategic Consultant - Data & AI Product Leader', fr: 'Consultant stratégique - Product Leader Data & IA' },
      type: { en: 'Entrepreneurship', fr: 'Entrepreneuriat' },
      description: {
        en: 'Initiated and led end-to-end the strategic Ariane B2B project. No-code prototype delivered in 6 months (vs 18 months standard IT), 800k business signals generated, 670 person-days saved.',
        fr: 'Initié et piloté de bout en bout le projet stratégique Ariane B2B. Prototype No-code livré en 6 mois (vs 18 mois en cycle standard IT), 800k signaux d\'affaires générés, 670 jours/homme économisés.',
      },
      techs: [
        { en: 'Hacktion', fr: 'Hacktion' },
        { en: 'Data-Driven', fr: 'Data-Driven' },
        { en: 'Prototyping', fr: 'Prototype' },
        { en: 'Product Leadership', fr: 'Leadership Produit' },
      ],
      details: {
        context: {
          en: 'Entrepreneurship & Product Leadership within AXA ecosystem.',
          fr: 'Entrepreneuriat & Leadership Produit au sein de l\'écosystème AXA.',
        },
        tasks: {
          en: [
            'Initiated and led end-to-end the strategic Ariane B2B project',
            'Designed and delivered a functional prototype in 6 months (No-code)',
            'Secured board adoption of the strategic roadmap',
            'Generated 800k business signals via a Data-Driven approach',
            'Achieved 670 person-days saved in operational efficiency',
          ],
          fr: [
            'Initiation et pilotage de bout en bout du projet stratégique Ariane B2B',
            'Conception et livraison d\'un prototype fonctionnel en 6 mois (No-code)',
            'Sécurisation de l\'adoption de la roadmap par le board',
            '800k signaux d\'affaires générés via une approche Data-Driven',
            'Gain de 670 jours/homme en efficacité opérationnelle',
          ],
        },
        env: {
          en: 'No-Code / Data & AI / B2B Strategy / Product Management',
          fr: 'No-Code / Data & IA / Stratégie B2B / Product Management',
        },
      },
    },
    {
      id: 'af2a-formateur',
      company: { en: 'AF2A', fr: 'AF2A' },
      role: { en: 'Strategic Trainer - AI Adoption in Insurance', fr: 'Formateur stratégique - Adoption de l\'IA en assurance' },
      type: { en: 'Training', fr: 'Formation' },
      description: {
        en: 'Designed and deployed tailor-made AI training programs for insurance distribution networks. 550+ agents made autonomous with AI.',
        fr: 'Conçu et déployé des programmes de formation IA sur-mesure pour les réseaux de distribution en assurance. +550 agents rendus autonomes sur l\'IA.',
      },
      techs: [
        { en: 'Hacktion', fr: 'Hacktion' },
        { en: 'AI', fr: 'IA' },
        { en: 'Training', fr: 'Formation' },
        { en: 'Change Management', fr: 'Conduite du changement' },
      ],
      details: {
        context: {
          en: 'Strategic training for insurance distribution networks on AI adoption.',
          fr: 'Formation stratégique des réseaux de distribution en assurance sur l\'adoption de l\'IA.',
        },
        tasks: {
          en: [
            'Designed and deployed tailor-made AI training programs',
            'Transformed resistance to AI into operational performance',
            '550+ agents and employees made autonomous with AI',
            'Made AI a tangible competitive advantage for 2025',
          ],
          fr: [
            'Conception et déploiement de programmes de formation IA sur-mesure',
            'Transformation de la résistance à l\'IA en performance opérationnelle',
            '+550 agents et collaborateurs rendus autonomes sur l\'IA',
            'L\'IA devenue un avantage concurrentiel tangible pour 2025',
          ],
        },
        env: {
          en: 'AI / Insurance Distribution / Change Management / Training Design',
          fr: 'IA / Distribution Assurance / Conduite du Changement / Ingénierie de Formation',
        },
      },
    },
    {
      id: 'axa-agent',
      company: { en: 'AXA', fr: 'AXA' },
      role: { en: 'General Insurance Agent - Entrepreneur Director', fr: 'Agent Général d\'Assurances - Dirigeant Entrepreneur' },
      type: { en: 'Entrepreneurship', fr: 'Entrepreneuriat' },
      period: { en: '2015 - 2024', fr: '2015 - 2024' },
      description: {
        en: 'Led an insurance agency for 10 years, building performance on a dual pivot: strategic B2B orientation and shared governance with a team of 4 experts. Revenue doubled to 350k€ (+106%), 4x market outperformance. Launched the 1st insurance agency in the Metaverse (BFM, Les Echos, l\'Argus).',
        fr: 'Dirigé une agence d\'assurance pendant 10 ans, fondant sa performance sur un double pivot : orientation stratégique B2B et gouvernance partagée avec une équipe de 4 experts. CA doublé à 350k€ (+106%), surperformance de 4x le marché. Lancement de la 1ère agence d\'assurance dans le Métavers (BFM, Les Echos, l\'Argus).',
      },
      techs: [
        { en: 'B2B Strategy', fr: 'Stratégie B2B' },
        { en: 'Management', fr: 'Management' },
        { en: 'Insurance', fr: 'Assurance' },
        { en: 'Innovation', fr: 'Innovation' },
      ],
      details: {
        context: {
          en: '10 years of full ownership of a local insurance agency, strategic transformation and entrepreneurship.',
          fr: '10 ans de direction complète d\'une agence d\'assurance locale, transformation stratégique et entrepreneuriat.',
        },
        tasks: {
          en: [
            'Revenue doubled to 350k€ (+106% in 10 years), 4x market outperformance',
            'B2B portfolio created from scratch, reaching 25% of total revenue',
            'Implemented shared governance with a team of 4 experts',
            'Launched the 1st insurance agency in the Metaverse — national media coverage (BFM, Les Echos, l\'Argus)',
            'Built a trust bridge with Tech leaders through a strategic Web3 initiative',
          ],
          fr: [
            'CA doublé à 350k€ (+106% en 10 ans), surperformance de 4x le marché',
            'Portefeuille B2B créé de zéro, atteignant 25% du CA total',
            'Mise en place d\'une gouvernance partagée avec une équipe de 4 experts',
            'Lancement de la 1ère agence d\'assurance dans le Métavers — couverture nationale (BFM, Les Echos, l\'Argus)',
            'Construction d\'un pont de confiance avec les leaders de la Tech via une initiative stratégique Web3',
          ],
        },
        env: {
          en: 'Insurance / B2B / B2C / Shared Governance / Web3 / Metaverse',
          fr: 'Assurance / B2B / B2C / Gouvernance partagée / Web3 / Métavers',
        },
      },
    },
    {
      id: 'cic-ce',
      company: { en: 'CIC & Caisse d\'Épargne', fr: 'CIC & Caisse d\'Épargne' },
      role: { en: 'Commercial Director & Management', fr: 'Direction Commerciale & Management' },
      type: { en: 'Full-time', fr: 'CDI' },
      period: { en: '2004 - 2015', fr: '2004 - 2015' },
      description: {
        en: 'Foundational managerial and commercial career path, from portfolio management to profit center direction.',
        fr: 'Parcours managérial et commercial fondateur, de la gestion de portefeuille à la direction d\'un centre de profit.',
      },
      techs: [
        { en: 'Banking', fr: 'Banque' },
        { en: 'Management', fr: 'Management' },
        { en: 'Sales', fr: 'Développement commercial' },
      ],
      details: {
        context: {
          en: 'Banking sector — progressive career from portfolio management to branch direction.',
          fr: 'Secteur bancaire — parcours progressif de la gestion de portefeuille à la direction d\'agence.',
        },
        tasks: {
          en: [
            'Portfolio management and client relationship development',
            'Team management and profit center direction',
            'Commercial development B2B and B2C',
          ],
          fr: [
            'Gestion de portefeuille et développement relation client',
            'Management d\'équipe et direction de centre de profit',
            'Développement commercial B2B et B2C',
          ],
        },
        env: {
          en: 'Banking / CRM / Team Management / Sales Direction',
          fr: 'Banque / CRM / Management d\'Équipe / Direction Commerciale',
        },
      },
    },
  ],

  // ===== PROJETS (Expériences Personnelles) =====
  projects: [
    {
      id: 'no-code-france',
      title: { en: 'No-code France - Board Member', fr: 'No-code France - Conseil d\'Administration' },
      description: {
        en: 'Co-founder and active member of the first board of directors of No-code France (2022).',
        fr: 'Co-fondateur de l\'association No-code France et membre actif de la communauté No-code France (2022).',
      },
      techs: [
        { en: 'No-code', fr: 'No-code' },
        { en: 'Community', fr: 'Communauté' },
      ],
    },
    {
      id: 'reussir-commissions',
      title: { en: 'Réussir - AXA Agents Union', fr: 'Réussir - Syndicat des agents AXA' },
      description: {
        en: 'Active member of digital and data commissions at Réussir, AXA agents union (2023-2024).',
        fr: 'Membre actif des commissions digitales et data de Réussir, syndicat des agents AXA (2023-2024).',
      },
      techs: [
        { en: 'Digital', fr: 'Digital' },
        { en: 'Data', fr: 'Data' },
        { en: 'Insurance', fr: 'Assurance' },
      ],
    },
  ],

  // ===== ÉDUCATION =====
  education: [
    {
      school: { en: 'Ecoles des Mines - PSL', fr: 'Ecoles des Mines - PSL' },
      degree: { en: 'Advanced Master in Strategic Management of Information and Technology (MSIT)', fr: 'Mastère Spécialisé Management stratégique de l\'Information et des Technologies (MSIT)' },
      period: '2026',
    },
    {
      school: { en: 'IUP Banking Finance Insurance - IAE Lille', fr: 'IUP Banque Finance Assurance - IAE Lille' },
      degree: { en: 'Banking, Finance & Insurance', fr: 'Banque, Finance & Assurance' },
      period: '2004',
    },
    {
      school: { en: 'Sacré Cœur Tourcoing', fr: 'Sacré Cœur Tourcoing' },
      degree: { en: 'Scientific Baccalaureate', fr: 'Baccalauréat scientifique' },
      period: '2000',
    },
  ],

  // ===== LOISIRS =====
  hobbies: [
    {
      title: { en: 'Tech & Innovation', fr: 'Tech & Innovation' },
      details: [
        { en: 'Vibe Coding', fr: 'Vibe Coding' },
        { en: 'Open Source projects', fr: 'Projets Open Source' },
        { en: 'No-code community', fr: 'Communauté No-code' },
      ],
    },
    {
      title: { en: 'Role-playing & Heroic Fantasy', fr: 'Jeux de rôle & Héroic Fantasy' },
      details: [
        { en: 'Magic the Gathering', fr: 'Magic the Gathering' },
        { en: 'Storytelling, imaginary universes', fr: 'Narration, univers imaginaires' },
        { en: 'Role-playing games', fr: 'Jeux de rôle grandeur nature' },
      ],
    },
    {
      title: { en: 'Reading', fr: 'Lecture' },
      details: [
        { en: 'Robin Hobb - The Farseer Trilogy', fr: 'Robin Hobb - L\'Assassin Royal' },
        { en: 'JRR Tolkien - The Lord of the Rings', fr: 'JRR Tolkien - Le Seigneur des Anneaux' },
        { en: 'Anne Mc Caffrey - The Dragonriders of Pern', fr: 'Anne Mc Caffrey - La Balade de Pern' },
      ],
    },
  ],

  // ===== PDF =====
  pdf: {
    label: { en: 'Download PDF', fr: 'Télécharger le PDF' },
    path: { en: '/cv/CV_Francois_Pannecoucke_2026_Transfo.pdf', fr: '/cv/CV_Francois_Pannecoucke_2026_Transfo.pdf' },
  },

  // ===== THÈME =====
  theme: {
    preset: 'indigo',
    defaultMode: 'light',
  },

  // ===== LABELS UI =====
  labels: {
    sections: {
      contact: { en: 'CONTACT', fr: 'CONTACT' },
      skills: { en: 'KEY SKILLS', fr: 'COMPÉTENCES CLÉS' },
      experience: { en: 'PROFESSIONAL EXPERIENCE', fr: 'EXPÉRIENCES PROFESSIONNELLES' },
      education: { en: 'EDUCATION', fr: 'FORMATION' },
      projects: { en: 'PERSONAL INITIATIVES', fr: 'EXPÉRIENCES PERSONNELLES' },
      hobbies: { en: 'INTERESTS', fr: 'CENTRES D\'INTÉRÊT' },
    },
    experience: {
      mainTasks: { en: 'Key achievements:', fr: 'Réalisations clés :' },
      moreTasks: { en: 'more...', fr: 'plus...' },
      training: { en: 'Training:', fr: 'Formations :' },
      techEnv: { en: 'Environment:', fr: 'Environnement :' },
      technologies: { en: 'Technologies', fr: 'Technologies' },
    },
    actions: {
      clickHint: { en: 'Click on experiences to see more details', fr: 'Cliquez sur les expériences pour voir plus de détails' },
      switchTheme: { en: 'Toggle dark mode', fr: 'Changer le thème' },
      downloadPdf: { en: 'Download PDF', fr: 'Télécharger le PDF' },
    },
  },
}
