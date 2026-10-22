import { build } from 'esbuild'
import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)

await build({
  entryPoints: [fileURLToPath(new URL('./index.js', import.meta.url))],
  outfile: fileURLToPath(new URL('../dist/click-to-component.js', import.meta.url)),
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: 'es2020',
  minify: true,
  define: { 'process.env.NODE_ENV': '"development"' },
  // Keep htm, Floating UI and the entry on the same React/renderer pair.
  alias: {
    react: dirname(require.resolve('react/package.json')),
    'react-dom': dirname(require.resolve('react-dom/package.json')),
  },
  logLevel: 'info',
})
