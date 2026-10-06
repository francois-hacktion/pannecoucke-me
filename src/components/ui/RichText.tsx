import { Fragment } from 'react'

/**
 * Rend un texte de la config en interprétant **gras** (seule syntaxe supportée).
 * Le gras prend la couleur "encre" des titres, comme dans la maquette.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
