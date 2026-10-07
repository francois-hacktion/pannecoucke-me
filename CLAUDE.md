# CLAUDE.md, pannecoucke.me

CV interactif de François Pannecoucke. Vite + React 19 + TypeScript + Tailwind v4, pré-rendu en HTML statique, déployé sur Cloudflare Pages depuis `main`.

## Commandes

- `npm run dev` : serveur de dev (port 5173)
- `npm run build` : `tsc -b`, build client, build serveur (`src/entry-server.tsx`) puis pré-rendu (`scripts/prerender.mjs`). Doit passer sans erreur avant toute PR.
- `npx vite preview` puis `npx lighthouse@12 http://localhost:4173/` : contrôle Lighthouse (production : 100/100/100/100 en mobile et desktop, à préserver)
- `npm run lint` : ESLint
- `npm test` : Playwright sur le build servi par `vite preview` (lancer `npm run build` avant). `npm run test:update` régénère les captures. Dans le conteneur Claude Code, ajouter `PLAYWRIGHT_CHROMIUM=/opt/pw-browsers/chromium` (Chromium préinstallé, d'une autre version que celui de Playwright)

## Décisions d'architecture

- **Contenu** : `src/data/resume-config.ts` est la source unique. Ne jamais écrire de texte de CV en dur dans les composants, y compris les libellés d'interface (`labels`).
- **Design system Hacktion OS 2** (handoff du 06/10/2026) : tokens en variables CSS dans `src/globals.css` (`--os-*`, `--hb-*`, `--tone-*`), redéfinis sous `.dark`. Les composants les consomment via les couleurs Tailwind sémantiques (`text-ink`, `text-body`, `text-muted`, `border-rule`, `bg-sunken`…).
- **Une seule fenêtre, pas de scroll global** : seul `<main>` (corps de la fenêtre) défile. Le scroll-spy, la navigation et le hash vivent dans `src/lib/hooks/useSectionNav.ts`. Le verrou du scroll-spy se lève sur `scrollend` (repli à 700 ms).
- **Points de rupture** : `os` 760px (barre d'état), `nav` 880px (nav dans la headerbar, sinon barre sticky), `wide` 1080px (URL et libellé "CV PDF"). La nav passe en barre sticky sous 880px et non 760px comme dans le handoff : mesuré, la headerbar déborde sinon (nav 421px + FR/EN + boutons).
- **Nav mobile (< 640px)** : la barre sticky occupe toute la largeur (`LinkedButtons fill`), "Profil" devient une icône maison (libellé gardé pour les lecteurs d'écran) et les boutons se compactent par paliers mesurés (13px dès 410px, 12px de 360 à 409px, 11,5px et padding 4px sous 360px). Les 5 sections tiennent sans défilement dès 311px en FR (9px de marge à 320px ; à 12px, "Contact" mangeait de 8px la marge de la barre) et 285px en EN ; défilement horizontal en secours en dessous. Avant : 453px nécessaires, "Contact" coupé sur tous les téléphones.
- **Centrage de la nav** : grille `minmax(0,1fr) auto minmax(0,1fr)` et padding horizontal symétrique (14px), pour un centrage exact sur la fenêtre.
- **Mobile (< 640px)** : la période passe au-dessus du contenu dans les lignes du parcours et des engagements ; photo réduite à 150×180.
- **Bouton primaire** : texte navy `#0d1f2d` sur or (et non blanc comme dans le handoff) : contraste 8:1 au lieu de 2,1:1, aligné sur le bouton or de la headerbar. À reporter dans le design system Hacktion.
- **Icônes** : Phosphor "regular" recopiées en SVG inline (`src/components/icons`), pour éviter une dépendance.
- **Typographie française** : `resolve()` (lib/i18n) rend insécables les espaces avant `: ; ? ! »` et après `«` en français. Écrire des espaces normales dans la config.
- **Texte riche** : `**gras**` uniquement (`RichText`), retiré du JSON-LD par `lib/seo.ts`.
- **Pré-rendu (SSG)** : `scripts/prerender.mjs` génère `dist/index.html` (FR) et `dist/en/index.html` (EN) avec le HTML complet, le `<head>` de `src/lib/seo.ts` (titre, description, canonical, hreflang, Open Graph, JSON-LD) et la CSS inlinée. Le client hydrate (`hydrateRoot`) après la première frame. Tout composant doit donc rendre le même HTML côté serveur et client : pas d'accès à `window`/`localStorage` pendant le rendu.
- **Thème** : source de vérité = classe `.dark` sur `<html>`, posée avant le premier rendu par le script inline de `index.html` ; lue via `useSyncExternalStore` (`lib/theme/store.ts`).
- **Langue** : une URL par langue (`/`, `/en/`). La bascule FR/EN change de langue sans rechargement et réécrit l'URL. `?lang=xx` (anciens liens) est redirigé en 301 par `functions/_middleware.ts` en production, par le script inline de `index.html` en développement ; ce script redirige aussi `/` vers la langue mémorisée. Pas de détection de la langue du navigateur (elle ferait rediriger Lighthouse et Googlebot).
- **Animations** : CSS pur (accordéon en `grid-template-rows`, flip de la photo en `transition`), Framer Motion retiré (-40 Ko gzip). Le contenu replié reste dans le HTML (`inert`), lisible par les robots.
- **Polices** : Geist et Geist Mono en woff2 dans `public/fonts` (sous-ensembles latin et latin-ext), préchargées ; polices de secours Arial / Courier New recalées sur les métriques de Geist (CLS 0).
- **Eyebrows de section** : trait or de 2,5px repris du CV PDF (`SectionEyebrow rule`), deux fois la longueur du libellé pour Parcours et Compétences (`long`), sa longueur pour les blocs du bas (`fit`), rien sur le hero.
- **Glyphes décoratifs** (`#`, `$`, `→`) : pseudo-éléments `glyph-*` avec texte alternatif vide, ignorés par les lecteurs d'écran et le calcul de contraste. Ils alimentent `--tw-content` : les variantes `before:` de Tailwind réécrivent `content` avec cette variable.
- **Contraste** : `text-muted-strong` (#4d6b84) pour le petit texte sur fond beige (barre d'état, cartes mission, URL), le `text-muted` du handoff y tombait à 4,2:1. Contour de focus navy en clair, or en sombre (`--os-focus`) : l'or sur blanc tombait à 2,1:1 (3:1 requis). Survol des liens via `--os-link-hover` : le bleu du mode clair tombait à 2,9:1 sur fond sombre. À reporter dans le design system Hacktion.
- **Bouton PDF de la headerbar** : pas d'`aria-label`, le nom accessible est le texte visible ("CV PDF") dès 1080px, un libellé `sr-only` en dessous (WCAG 2.5.3, nom accessible = texte visible).
- **Images** : photo en 440 px et 300 px (`srcset`), sans métadonnées EXIF ; le PDF n'est chargé qu'au clic. Un nouveau PDF doit avoir ses métadonnées (titre, auteur, langue) et des images rééchantillonnées (~300 dpi).
- **Domaine unique** : `functions/_middleware.ts` (Pages Function) redirige en 301 tout autre domaine (`pannecoucke-me.pages.dev`, `www.pannecoucke.me`) vers `https://pannecoucke.me`, ainsi que `?lang=xx` vers `/` ou `/en/`. Les aperçus de PR (`*.pannecoucke-me.pages.dev`) restent accessibles, en `noindex` (`public/_headers`). `public/_routes.json` limite la Function aux pages, PDF et fichiers texte : assets, polices et images restent statiques (gratuits, hors quota). Logique testée hors Cloudflare en appelant `onRequest` avec Node.
- **404** : `public/404.html` autonome (HTML et CSS inline, fenêtre Hacktion OS, ton léger, FR/EN selon le chemin, la langue mémorisée ou celle du navigateur, e-mail prérempli avec l'adresse introuvable, `noindex`) ; sa présence fait renvoyer un vrai 404 par Cloudflare Pages au lieu de l'accueil.
- **Alignement sur le CV PDF** : compétences en carte à 4 colonnes `$ variable` (contenu identique au PDF), Formation / Engagements / En dehors du travail / Langues en grille 2×2 sans filets. Le PDF fait référence pour ces blocs.
- **Tests et CI** : `tests/` (Playwright + axe-core). `responsive` : 15 largeurs de 320 à 1440px en FR/EN, ni scroll horizontal de la page ou de `<main>`, nav sans débordement, 5 boutons dans l'écran (échoue sur le code d'avant la PR #5). `a11y` : axe WCAG 2.2 AA à 0 violation, clair/sombre, 390 et 1280px, transitions coupées avant l'analyse (sinon faux positifs de contraste). `smoke` : langue, thème, accordéon exclusif, ancres, PDF, photo ; attendre l'hydratation (`gotoHydrated`), le client s'attache après la première frame. `visual` (tag `@visual`) : captures de référence 360/412/768/1280px, FR/EN, clair/sombre, base de comparaison pour une refonte, générées sous Linux (identiques avec Chromium 140 et 153). Chromium complet (`channel: 'chromium'`), jamais `chrome-headless-shell` : sans positionnement sous-pixel, il élargit le texte d'environ 7 % et fait déborder la nav à 320px (+19px), rendu qu'aucun téléphone n'a. `.github/workflows/ci.yml` : lint, build, tests sur chaque PR et push sur `main`, Node depuis `.nvmrc` (24). Dependabot : npm hebdomadaire groupé (mineures et correctifs), GitHub Actions mensuel.
- **Documentation** : `README.md` (présentation, ton de François), `docs/CONTENU.md` (mise à jour du contenu, ajout d'une mission), ce fichier (choix techniques).

## Règles de copy

Pas de tiret cadratin. Périodes au format `2015 - 2024`. Ton direct et court.
