/**
 * Domaine unique (Cloudflare Pages Function, exécutée avant les fichiers statiques).
 *
 * - Toute requête qui n'arrive pas sur pannecoucke.me (alias pannecoucke-me.pages.dev,
 *   www.pannecoucke.me…) est redirigée en 301 vers le même chemin sur le domaine canonique.
 * - Les aperçus de déploiement (<branche ou version>.pannecoucke-me.pages.dev) restent
 *   accessibles pour relire les PR ; ils sont servis en noindex (cf. public/_headers).
 * - Les anciens liens ?lang=fr|en sont redirigés vers la page de la langue (/ ou /en/).
 *
 * Les routes qui invoquent cette fonction sont limitées par public/_routes.json :
 * les assets, polices et images restent des requêtes statiques, gratuites et illimitées.
 */
const CANONICAL_HOST = 'pannecoucke.me'
const PREVIEW_HOST_SUFFIX = '.pannecoucke-me.pages.dev'
const LANGUAGE_PATHS: Record<string, string> = { fr: '/', en: '/en/' }

interface PagesContext {
  request: Request
  next: () => Promise<Response>
}

export async function onRequest({ request, next }: PagesContext): Promise<Response> {
  const url = new URL(request.url)
  const { hostname } = url
  const isAllowedHost =
    hostname === CANONICAL_HOST ||
    hostname.endsWith(PREVIEW_HOST_SUFFIX) ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1'

  const target = new URL(url)
  if (!isAllowedHost) {
    target.protocol = 'https:'
    target.hostname = CANONICAL_HOST
    target.port = ''
  }

  const language = url.searchParams.get('lang')
  if (language && language in LANGUAGE_PATHS && (url.pathname === '/' || url.pathname === '/en/')) {
    target.pathname = LANGUAGE_PATHS[language]
    target.searchParams.delete('lang')
  }

  return target.href === url.href ? next() : Response.redirect(target.href, 301)
}
