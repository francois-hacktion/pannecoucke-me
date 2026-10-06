import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erreur de rendu du CV :', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh items-center justify-center bg-desk p-8 font-sans">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-2xl font-bold text-ink">Oups, le CV n'a pas pu s'afficher</h1>
            <p className="text-body">
              Rechargez la page. Si le problème persiste, vérifiez le fichier{' '}
              <code className="rounded bg-sunken px-1.5 py-0.5 font-mono text-sm">resume-config.ts</code>.
            </p>
            {this.state.error && (
              <pre className="mt-4 overflow-auto rounded-lg border border-card-border bg-sunken p-4 text-left font-mono text-xs text-body">
                {this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 cursor-pointer rounded-[4px] border-2 border-black bg-gold px-5 py-2.5 text-sm font-bold text-[#0d1f2d]"
            >
              Recharger la page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
