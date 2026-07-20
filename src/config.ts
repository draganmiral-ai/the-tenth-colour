/**
 * Central site configuration.
 *
 * Everything here is intended to be edited by hand without touching any
 * component. See README.md for the full replacement guide.
 */

/** Where "Return to Moon Confessions" points. Replace with the real URL. */
export const MOON_CONFESSIONS_URL = 'https://example.com/'

/** Imprint shown at the top of the opening screen and in the dedication. */
export const IMPRINT = {
  publication: 'Moon Confessions',
  volume: 'Volume 112',
} as const

export const SITE = {
  title: 'The Tenth Colour',
  subtitle: 'A final chapter from the Days of Wonder',
} as const

/**
 * Ambient audio settings.
 *
 * `volume` is the ceiling the track fades up to — deliberately low so the
 * prose stays dominant. `fadeDuration` is in milliseconds.
 */
export const AUDIO = {
  src: 'audio/the-tenth-colour.mp3',
  volume: 0.35,
  fadeDuration: 2500,
  loop: true,
} as const

/**
 * Resolves a path inside /public against Vite's configured base path, so the
 * same code works at `/` locally and `/the-tenth-colour/` on GitHub Pages.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL
  const clean = path.replace(/^\/+/, '')
  return `${base}${clean}`
}
