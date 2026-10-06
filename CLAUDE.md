# CLAUDE.md, pannecoucke.me

CV interactif de François Pannecoucke. Vite + React 19 + TypeScript + Tailwind v4, pré-rendu en HTML statique, déployé sur Cloudflare Pages depuis `main`.

## Commandes

- `npm run dev` : serveur de dev (port 5173)
- `npm run build` : `tsc -b`, build client, build serveur (`src/entry-server.tsx`) puis pré-rendu (`scripts/prerender.mjs`). Doit passer sans erreur avant toute PR.
- `npx vite preview` puis `npx lighthouse@12 http://localhost:4173/` : contrôle Lighthouse (cible : 100 desktop, ≥ 99 mobile)
- `npm run lint` : ESLint

## Décisions d'architecture

- **Contenu** : `src/data/resume-config.ts` est la source unique. Ne jamais écrire de texte de CV en dur dans les composants, y compris les libellés d'interface (`labels`).
- **Design system Hacktion OS 2** (handoff du 06/10/2026) : tokens en variables CSS dans `src/globals.css` (`--os-*`, `--hb-*`, `--tone-*`), redéfinis sous `.dark`. Les composants les consomment via les couleurs Tailwind sémantiques (`text-ink`, `text-body`, `text-muted`, `border-rule`, `bg-sunken`…).
- **Une seule fenêtre, pas de scroll global** : seul `<main>` (corps de la fenêtre) défile. Le scroll-spy, la navigation et le hash vivent dans `src/lib/hooks/useSectionNav.ts`. Le verrou du scroll-spy se lève sur `scrollend` (repli à 700 ms).
- **Points de rupture** : `os` 760px (barre d'état), `nav` 880px (nav dans la headerbar, sinon barre sticky), `wide` 1080px (URL et libellé "CV PDF"). La nav passe en barre sticky sous 880px et non 760px comme dans le handoff : mesuré, la headerbar déborde sinon (nav 421px + FR/EN + boutons).
- **Centrage de la nav** : grille `minmax(0,1fr) auto minmax(0,1fr)` et padding horizontal symétrique (14px), pour un centrage exact sur la fenêtre.
- **Mobile (< 640px)** : la période passe au-dessus du contenu dans les lignes du parcours et des engagements ; photo réduite à 150×180.
- **Bouton primaire** : texte navy `#0d1f2d` sur or (et non blanc comme dans le handoff) : contraste 8:1 au lieu de 2,1:1, aligné sur le bouton or de la headerbar. À reporter dans le design system Hacktion.
- **Icônes** : Phosphor "regular" recopiées en SVG inline (`src/components/icons`), pour éviter une dépendance.
- **Typographie française** : `resolve()` (lib/i18n) rend insécables les espaces avant `: ; ? ! »` et après `«` en français. Écrire des espaces normales dans la config.
- **Texte riche** : `**gras**` uniquement (`RichText`), retiré du JSON-LD par `lib/seo.ts`.
- **Pré-rendu (SSG)** : `scripts/prerender.mjs` génère `dist/index.html` (FR) et `dist/en/index.html` (EN) avec le HTML complet, le `<head>` de `src/lib/seo.ts` (titre, description, canonical, hreflang, Open Graph, JSON-LD) et la CSS inlinée. Le client hydrate (`hydrateRoot`) après la première frame. Tout composant doit donc rendre le même HTML côté serveur et client : pas d'accès à `window`/`localStorage` pendant le rendu.
- **Thème** : source de vérité = classe `.dark` sur `<html>`, posée avant le premier rendu par le script inline de `index.html` ; lue via `useSyncExternalStore` (`lib/theme/store.ts`).
- **Langue** : une URL par langue (`/`, `/en/`). La bascule FR/EN change de langue sans rechargement et réécrit l'URL. Le script inline de `index.html` redirige `?lang=xx` (anciens liens) et, sur `/` uniquement, la langue mémorisée. Pas de détection de la langue du navigateur (elle ferait rediriger Lighthouse et Googlebot).
- **Animations** : CSS pur (accordéon en `grid-template-rows`, flip de la photo en `transition`), Framer Motion retiré (-40 Ko gzip). Le contenu replié reste dans le HTML (`inert`), lisible par les robots.
- **Polices** : Geist et Geist Mono en woff2 dans `public/fonts` (sous-ensembles latin et latin-ext), préchargées ; polices de secours Arial / Courier New recalées sur les métriques de Geist (CLS 0).
- **Glyphes décoratifs** (`#`, `$`, `→`) : pseudo-éléments `glyph-*` avec texte alternatif vide, ignorés par les lecteurs d'écran et le calcul de contraste.
- **Contraste** : `text-muted-strong` (#4d6b84) pour le petit texte sur fond beige (barre d'état, cartes mission, URL), le `text-muted` du handoff y tombait à 4,2:1.
- **Images** : photo en 440 px et 300 px (`srcset`), sans métadonnées EXIF ; le PDF n'est chargé qu'au clic. Un nouveau PDF doit avoir ses métadonnées (titre, auteur, langue) et des images rééchantillonnées (~300 dpi).
- **Documentation** : `README.md` (présentation, ton de François), `docs/CONTENU.md` (mise à jour du contenu, ajout d'une mission), ce fichier (choix techniques).

## Règles de copy

Pas de tiret cadratin. Périodes au format `2015 - 2024`. Ton direct et court.
