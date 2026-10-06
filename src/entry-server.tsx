import { renderToString } from 'react-dom/server'
import { resumeConfig } from '@/data/resume-config'
import { pagePath } from '@/lib/resume'
import { buildHead } from '@/lib/seo'
import App from './App'

/**
 * Point d'entrée du pré-rendu (vite build --ssr), utilisé par scripts/prerender.mjs :
 * une page HTML complète par langue, que le client hydrate ensuite.
 */
export function renderPages() {
  return resumeConfig.languages.available.map((language) => ({
    language,
    path: pagePath(language),
    head: buildHead(language),
    html: renderToString(<App initialLanguage={language} />),
  }))
}
