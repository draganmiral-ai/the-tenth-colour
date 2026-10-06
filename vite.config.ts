import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Base path configuration.
 *
 * GitHub Pages serves project sites from a sub-path, so the production build
 * must be told where it lives. For a repository named `the-tenth-colour`
 * published at https://<user>.github.io/the-tenth-colour/ the base is
 * `/the-tenth-colour/`.
 *
 * To move to a custom domain later (e.g. https://thetenthcolour.com), set
 * VITE_BASE to `/` — either in `.env.production` or as a CI variable — and no
 * other file in the project needs to change.
 */
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  cacheDir: ".cache/vite",
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: { input: { main: 'index.html', original: 'original/index.html' } },
    assetsDir: 'assets',
    // Story imagery is served from /public, so the JS bundle stays small.
    chunkSizeWarningLimit: 600,
  },
})
