// Flat config. ESLint 9+ ignores .eslintrc, so `pnpm lint` had been failing
// before it linted anything. Same rule set as the old file: eslint recommended +
// typescript-eslint recommended + prettier. .svelte files were never linted and
// still are not (svelte-check covers them).
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier'

export default [
  { ignores: ['.svelte-kit/', 'build/', '.vercel/', 'node_modules/'] },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  prettier,
  { files: ['*.config.js'], languageOptions: { globals: { process: 'readonly' } } }
]
