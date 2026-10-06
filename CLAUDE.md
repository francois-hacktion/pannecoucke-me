# CLAUDE.md, pannecoucke.me

CV interactif de François Pannecoucke. Vite + React 19 + TypeScript + Tailwind v4 + Framer Motion, déployé sur Cloudflare Pages depuis `main`.

## Commandes

- `npm run dev` : serveur de dev (port 5173)
- `npm run build` : `tsc -b` puis build Vite (doit passer sans erreur avant toute PR)
- `npm run lint` : ESLint

## Décisions d'architecture

- **Contenu** : `src/data/resume-config.ts` est la source unique. Ne jamais écrire de texte de CV en dur dans les composants, y compris les libellés d'interface (`labels`).
- **Design system Hacktion OS 2** (handoff du 06/10/2026) : tokens en variables CSS dans `src/globals.css` (`--os-*`, `--hb-*`, `--tone-*`), redéfinis sous `.dark`. Les composants les consomment via les couleurs Tailwind sémantiques (`text-ink`, `text-body`, `text-muted`, `border-rule`, `bg-sunken`…).
- **Une seule fenêtre, pas de scroll global** : seul `<main>` (corps de la fenêtre) défile. Le scroll-spy, la navigation et le hash vivent dans `src/lib/hooks/useSectionNav.ts`. Le verrou du scroll-spy se lève sur `scrollend` (repli à 700 ms).
- **Points de rupture** : `os` 760px (barre d'état), `nav` 880px (nav dans la headerbar, sinon barre sticky), `wide` 1080px (URL et libellé "CV PDF"). La nav passe en barre sticky sous 880px et non 760px comme dans le handoff : mesuré, la headerbar déborde sinon (nav 421px + FR/EN + boutons).
- **Centrage de la nav** : grille `minmax(0,1fr) auto minmax(0,1fr)` et padding horizontal symétrique (14px), pour un centrage exact sur la fenêtre.
- **Mobile (< 640px)** : la période passe au-dessus du contenu dans les lignes du parcours et des engagements ; photo réduite à 150×180.
- **Icônes** : Phosphor "regular" recopiées en SVG inline (`src/components/icons`), pour éviter une dépendance.
- **Typographie française** : `resolve()` (lib/i18n) rend insécables les espaces avant `: ; ? ! »` et après `«` en français. Écrire des espaces normales dans la config.
- **Texte riche** : `**gras**` uniquement (`RichText`), retiré ou converti en `<strong>` par le plugin SEO.
- **SEO** : `vite-plugin-resume-seo.ts` injecte au build le titre, la description, le JSON-LD et un `<noscript>` complet. Garder `resume-config.ts` et `types.ts` sans import d'alias `@/` (ils sont chargés par le plugin).
- **Langue** : `?lang=en` n'apparaît que pour l'anglais ; le français (langue par défaut) garde une URL propre.

## Règles de copy

Pas de tiret cadratin. Périodes au format `2015 - 2024`. Ton direct et court.
