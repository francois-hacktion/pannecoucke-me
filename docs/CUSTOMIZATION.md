# Guide de personnalisation

Tout le contenu du CV vit dans un seul fichier : `src/data/resume-config.ts`.
Il est typé (`src/data/types.ts`), l'éditeur propose donc l'autocomplétion et signale les erreurs.
Un exemple complet et commenté est disponible dans `src/data/resume-config.example.ts`.

## Conventions

- **Textes multilingues** : format `LocalizedString`, par exemple `{ fr: 'Parcours', en: 'Experience' }`. Chaque code de langue doit figurer dans `languages.available`.
- **Texte riche** : les tâches et les engagements acceptent `**gras**` (seule syntaxe supportée).
- **Typographie française** : écrire les espaces avant `:` `;` `?` `!` et dans les guillemets `« »` normalement. Elles sont rendues insécables automatiquement en français.
- **Copy** : pas de tiret cadratin, périodes au format `2015 - 2024`.

## Sections

### `site`

URL canonique (JSON-LD) et domaine affiché dans la headerbar, suivi de la section active (`pannecoucke.me/parcours`).

### `personal`

| Champ | Rôle |
|---|---|
| `name` | Le premier mot s'affiche sur la ligne 1 du H1, le reste sur la ligne 2 |
| `photo`, `photoBackEmoji` | Photo du hero (portrait 440×528 conseillé) et emoji au dos, visible au clic (flip 3D) |
| `title` | Intitulé pour le SEO et le JSON-LD |
| `headline` | Eyebrow du hero |
| `intro`, `tagline` | Les deux paragraphes du hero |
| `mantra` | Citation sous le hero (guillemets inclus) |
| `city`, `location` | Barre d'état et bloc contact |
| `status` | Statut de la barre d'état, précédé d'une pastille verte |

### `experiences`

Une expérience est soit **dépliable** (avec `tasks` et `tags`), soit un **conteneur de missions** (avec `missions`), comme Hacktion.

```typescript
{
  id: 'agent',
  company: 'AXA',                                    // Organisation (JSON-LD, ATS)
  title: { fr: 'Agent général AXA', en: '…' },        // Titre affiché (optionnel, company par défaut)
  role: { fr: 'Agent général d\'assurances', en: '…' }, // Intitulé de poste (ATS)
  period: { fr: '2015 - 2024', en: '2015 - 2024' },
  badges: [tag('Entrepreneuriat', 'Entrepreneurship', 'rose')],
  description: { fr: '…', en: '…' },
  tasks: { fr: ['CA doublé à **350k€**.'], en: ['…'] },
  tags: [tag('Management', 'Management', 'violet')],
}
```

Une mission (`missions[]`) reprend `client`, `title`, `period`, `description`, `tasks` et `tags`. Avec `isOngoing: true`, elle affiche "en cours" et elle est **ouverte par défaut** dans l'accordéon.

### Teintes des tags

`tag(fr, en, tone)` crée un tag bilingue. Les teintes viennent du design system Hacktion :

| Teinte | Usage |
|---|---|
| `blue` | Stratégie |
| `violet` | Management |
| `emerald` | Exécution & tech |
| `amber` | Domaine |
| `cyan` | Formation |
| `rose` | Entrepreneuriat, business |
| `gold` | Hacktion, conseil |
| `navy` | Neutre |

### `skills`

Blocs de compétences : un titre, une teinte (carré de couleur et tags) et une liste de libellés.

### `engagements`, `education`, `hobbies`, `spokenLanguages`

Lignes simples. Les engagements se classent du plus récent au plus ancien. Les lignes de Formation et d'En dehors du travail tiennent sur une ligne de titre et une ligne de détail, pour rester alignées.

### `pdf`

Un chemin commun ou un chemin par langue. Le fichier se place dans `public/cv/`. Sans PDF pour la langue courante, les boutons de téléchargement sont masqués.

### `theme`

`defaultMode` : `'light'`, `'dark'`, `'system'`, ou absent (selon l'heure). Le choix du visiteur est mémorisé.

### `labels`

Tous les libellés de l'interface (navigation, titres de section, boutons, textes d'accessibilité), en FR et EN.

## Design

Les tokens (couleurs clair/sombre, teintes, headerbar) sont des variables CSS dans `src/globals.css`. Les composants du design system sont dans `src/components/os/` (fenêtre, headerbar) et `src/components/ui/` (boutons, tags, eyebrows).
