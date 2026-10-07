import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Fichiers .astro : vérifiés par astro check (npm run build)
export default defineConfig([
  globalIgnores(['dist', '.astro']),
  {
    files: ['**/*.{ts,mjs,js}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
  },
])
