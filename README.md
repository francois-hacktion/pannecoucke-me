# pannecoucke.me

Mon CV en ligne : **[pannecoucke.me](https://pannecoucke.me)**

<p align="center">
  <img src="docs/apercu.jpg" alt="Aperçu du CV : une fenêtre façon elementary OS posée sur un bureau papier" width="800" />
</p>

## Pourquoi cette refonte

Ce site est né d'un template open source que j'avais personnalisé. Il faisait le job, mais il ne me ressemblait pas.

Ma nouvelle mission chez Abeille Assurances m'a donné le bon prétexte. Plutôt que d'ajouter une ligne de plus, j'ai tout repris à ma charte : Hacktion OS 2, la même que sur [hacktion.fr](https://hacktion.fr). Un bureau papier, une seule fenêtre, du bleu nuit et de l'or.

Tout a été fait en vibe coding avec Claude Code, de la maquette à la mise en ligne. Je ne suis pas né dans le code, je suis né dans le business. Ce repo montre qu'on peut livrer un site rapide, accessible et propre sans écrire le code soi-même, à condition de savoir ce qu'on veut.

## Ce qu'il fait

- Français et anglais, chacun sa page (`/` et `/en/`)
- Mode clair et mode sombre
- Le CV en PDF, téléchargé seulement quand on clique
- Lisible par Google, les ATS et les IA, même sans JavaScript (avec un `llms.txt`)
- Lighthouse : 100 partout en desktop, 99/100/100/100 en mobile

## Mettre à jour le contenu

Tout se passe dans `src/data/resume-config.ts` : textes FR/EN, missions, compétences, liens. Le mode d'emploi, avec l'ajout d'une mission pas à pas, est dans [docs/CONTENU.md](docs/CONTENU.md).

Pour un nouveau CV PDF, je remplace le fichier dans `public/cv/`.

## Lancer le site en local

```bash
npm install
npm run dev
```

Le site tourne sur [http://localhost:5173](http://localhost:5173).

## Mise en ligne

Chaque push sur `main` part en production sur Cloudflare Pages (commande `npm run build`, dossier `dist`, Node 20). Le build génère une page HTML complète par langue, puis React prend le relais dans le navigateur.

Un seul domaine fait foi : `pannecoucke.me`. Les autres adresses (`pannecoucke-me.pages.dev`, `www`) redirigent vers lui, et les adresses inconnues renvoient une vraie page 404.

## Sous le capot

Vite, React 19, TypeScript et Tailwind CSS v4. Polices Geist et Geist Mono (licence OFL), icônes Phosphor (licence MIT). Pas de cookie, aucun script tiers dans le code : la seule mesure d'audience est Cloudflare Web Analytics, sans cookie, ajoutée par l'hébergement.

Les choix techniques sont détaillés dans [CLAUDE.md](CLAUDE.md).

## Licence

MIT, voir [LICENSE](./LICENSE). Le site est parti du template [interactive-resume-template](https://github.com/clementbouly/interactive-resume-template) de Clément Bouly : merci à lui.

Une coquille, une idée ? Les [issues](https://github.com/francois-hacktion/pannecoucke-me/issues) sont ouvertes.
