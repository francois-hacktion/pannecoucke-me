# CV Interactif — François Pannecoucke

CV interactif open source, construit avec React, TypeScript, Tailwind CSS et Framer Motion.

**[▶ Voir le CV en ligne](https://pannecoucke.me)**

<p align="center">
  <img src="docs/demo.gif" alt="Démo du CV interactif" width="480" />
</p>

---

## Inspiration & Origine

Ce projet est basé sur le template open source **[interactive-resume-template](https://github.com/clementbouly/interactive-resume-template)** de [Clément Bouly](https://github.com/clementbouly), publié sous licence MIT.

J'ai personnalisé ce template pour en faire mon CV interactif, en ajoutant :
- Un thème **Indigo** premium (light & dark mode)
- La police **Geist** pour un rendu haut de gamme
- Des **tags colorés par catégorie sémantique**
- Le support **multilingue FR/EN** complet des tags
- Les fichiers **llms.txt**, **robots.txt** et **security.txt** pour les crawlers IA

---

## Fonctionnalités

- **Un seul fichier de config** — Tout se passe dans `src/data/resume-config.ts`
- **Multilingue** — Support i18n intégré (FR par défaut, EN disponible)
- **Mode sombre / clair** — Détection automatique + bascule manuelle
- **Thèmes couleur** — 7 presets dont le thème Indigo premium
- **Responsive** — Mobile-first, adapté à tous les écrans
- **Expériences dépliables** — Détails en inline (desktop) ou modal (mobile)
- **Section projets** — Vitrine de réalisations personnelles
- **Téléchargement PDF** — Un PDF par langue
- **SEO & ATS ready** — Contenu visible par les crawlers sans JavaScript (JSON-LD, HTML sémantique)
- **Fichiers IA** — `llms.txt` pour les agents IA, `robots.txt` optimisé

---

## Démarrage rapide

### 1. Cloner le repo

```bash
git clone https://github.com/francois-hacktion/pannecoucke-me.git
cd pannecoucke-me
npm install
```

### 2. Personnaliser

Éditer `src/data/resume-config.ts` avec vos informations.

Ajouter votre photo dans `public/images/`.

### 3. Prévisualiser en local

```bash
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173) dans votre navigateur.

### 4. Déployer

```bash
npm run build
```

Le dossier `dist/` contient le site statique. Déployable sur Cloudflare Pages, Vercel, Netlify ou GitHub Pages.

**Configuration Cloudflare Pages :**

| Champ | Valeur |
|-------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Variable `NODE_VERSION` | `20` |

---

## Stack technique

- [Vite](https://vite.dev/) — Build ultra-rapide
- [React 19](https://react.dev/) — Framework UI
- [TypeScript](https://www.typescriptlang.org/) — Typage statique
- [Tailwind CSS v4](https://tailwindcss.com/) — CSS utilitaire
- [Framer Motion](https://www.framer.com/motion/) — Animations fluides

---

## Structure du projet

```
├── src/
│   ├── data/
│   │   ├── resume-config.ts    # ← VOTRE FICHIER DE CONFIG
│   │   ├── types.ts            # Types TypeScript
│   │   ├── presets.ts          # Thèmes couleur
│   │   └── tech-registry.ts   # Couleurs des tags
│   ├── components/Resume/      # Composants du CV
│   ├── lib/                    # i18n, thème, hooks
│   └── App.tsx
├── public/
│   ├── llms.txt                # Pour les agents IA
│   ├── robots.txt              # Crawlers autorisés
│   └── .well-known/
│       └── security.txt        # RFC 9116
```

---

## Licence

Ce projet est distribué sous licence **MIT** — libre d'utilisation, de modification et de redistribution, avec mention de l'auteur original.

Voir le fichier [LICENSE](./LICENSE) pour les détails.

---

*Projet open source — Contributions bienvenues via [Issues](https://github.com/francois-hacktion/pannecoucke-me/issues) ou Pull Requests.*
