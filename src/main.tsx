import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/ErrorBoundary'
import { initTheme } from '@/lib/theme'
import { languageFromPath } from '@/lib/resume'
import App from './App'
import './globals.css'

initTheme()

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <ErrorBoundary>
      <App initialLanguage={languageFromPath(window.location.pathname)} />
    </ErrorBoundary>
  </StrictMode>
)

// En production, le HTML est pré-rendu (scripts/prerender.mjs) : React s'y attache.
// En développement, la racine est vide : rendu classique.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
