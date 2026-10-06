# The Tenth Colour

*A final chapter from the Days of Wonder — Moon Confessions, Volume 112.*

An immersive, single-page editorial storybook. On the twentieth morning of a
twenty-day creative assignment, the narrator wakes shrunk beside ten colours —
and the tenth and final colour, **Mint**, turns out to be not an ending but a
door. The page begins as a quiet ivory room, gradually enters a botanical
Wonderland, reaches a still emotional centre, and returns home quieter than it
began.

> Days 1–10 were wonder tasks. Days 11–20 were the ten colours. Day twenty is
> the final day; Mint is the **tenth** colour. (The story never calls it the
> twentieth colour.)

---

## Table of contents

- [Technical stack](#technical-stack)
- [Local development](#local-development)
- [Production build & preview](#production-build--preview)
- [Project structure](#project-structure)
- [Adding the images](#adding-the-images)
- [Adding the audio](#adding-the-audio)
- [Configuration](#configuration) — return link, audio volume, focal points
- [Editing the story text](#editing-the-story-text)
- [Atmosphere & effects](#atmosphere--effects)
- [GitHub Pages deployment](#github-pages-deployment)
- [Custom domain](#custom-domain)
- [Accessibility](#accessibility)
- [Performance & image optimisation](#performance--image-optimisation)
- [Missing-asset behaviour](#missing-asset-behaviour)
- [Asset checklist](#asset-checklist)

---

## Technical stack

- **React 19** + **TypeScript**
- **Vite 7** (static build; no server, database, or analytics)
- Plain, structured CSS (three files: tokens/layout, typography, atmosphere)
- No animation or particle libraries — every effect is CSS + a few DOM nodes
  driven by `IntersectionObserver` and `requestAnimationFrame`.

### A note on the build toolchain

`package.json` pins Rollup to its WebAssembly build via an `overrides` entry:

```json
"overrides": { "rollup": "npm:@rollup/wasm-node@^4" }
```

This lets the project build in environments that cannot load Rollup's native
binary. On a normal machine you may remove that block to use native Rollup
(slightly faster builds); everything else is unaffected.

---

## Local development

Requires **Node 20.19+** (or 22.12+) and npm.

```bash
npm install
npm run dev        # http://localhost:5173/the-tenth-colour/
```

The dev URL includes the `/the-tenth-colour/` base path — that is expected (see
[deployment](#github-pages-deployment)).

## Production build & preview

```bash
npm run build      # type-checks, builds to dist/, copies index.html → 404.html
npm run preview    # serves the built dist/ at http://localhost:4173/the-tenth-colour/
```

`npm run build` runs `tsc -b` first, so any type error fails the build.

---

## Project structure

```
the-tenth-colour/
├─ index.html                 # metadata, Open Graph, fonts, no-JS fallback
├─ vite.config.ts             # base path (VITE_BASE)
├─ .github/workflows/deploy.yml
├─ public/
│  ├─ favicon.svg
│  ├─ images/                 # ← your 12 plates + og image go here
│  └─ audio/                  # ← your ambient track goes here
└─ src/
   ├─ config.ts               # return URL, audio settings, asset() helper
   ├─ content/story.ts        # ALL chapter text & per-chapter settings
   ├─ components/
   │  ├─ SiteIntro.tsx        AmbientAudio.tsx      AtmosphereLayer.tsx
   │  ├─ StoryChapter.tsx     StoryImage.tsx        StoryQuote.tsx
   │  ├─ Dragonfly.tsx        RibbonTrail.tsx       ChapterProgress.tsx
   │  ├─ FinalDedication.tsx  ImagePlaceholder.tsx  Reveal.tsx
   ├─ hooks/
   │  ├─ useAmbientAudio.ts   useActiveChapter.ts   useReducedMotion.ts
   ├─ styles/
   │  ├─ global.css           typography.css        atmosphere.css
   └─ main.tsx  App.tsx
```

---

## Adding the images

Drop twelve files into `public/images/` using these **exact** names. Until a
file exists, the site shows an elegant placeholder naming the missing file — it
never shows a broken-image icon and never shifts layout when you add the file.

| File | Chapter |
| --- | --- |
| `01-awakening.jpg` | 1 · The Awakening |
| `02-invitation.jpg` | 2 · The Invitation |
| `03-colours-remember.jpg` | 3 · The Colours Remember |
| `04-keyhole.jpg` | 4 · The Hidden Entrance |
| `05-door.jpg` | 5 · The Door |
| `06-crossing.jpg` | 6 · Crossing |
| `07-wonderland.jpg` | 7 · Wonderland |
| `08-dragonfly-parliament.jpg` | 8 · The Gathering |
| `09-colours-rise.jpg` | 9 · The Colours Rise |
| `10-tinkerbell.jpg` | 10 · Tinkerbell |
| `11-farewell.jpg` | 11 · The Farewell |
| `12-home.jpg` | 12 · Home |
| `og-the-tenth-colour.jpg` | Social preview (1200×630) |

Formats: **JPEG, PNG, WebP or AVIF** all work. If you use a different extension,
update that chapter's `image:` path in `src/content/story.ts`.

## Adding the audio

Place the ambient track at `public/audio/the-tenth-colour.mp3`. It is **off by
default and never autoplays** — the reader enables it with the control at the
bottom of the screen, and it fades in over ~2.5 s. See
`public/audio/README.md` for format and loudness guidance. Use only audio you
have the right to publish.

---

## Configuration

Everything editable-by-hand lives in **`src/config.ts`** and
**`src/content/story.ts`**.

### Moon Confessions return link

`src/config.ts`:

```ts
export const MOON_CONFESSIONS_URL = 'https://example.com/'   // ← replace
```

### Audio volume & fade

`src/config.ts`:

```ts
export const AUDIO = {
  src: 'audio/the-tenth-colour.mp3',
  volume: 0.35,        // ceiling volume the track fades up to (0–1)
  fadeDuration: 2500,  // fade in/out, milliseconds
  loop: true,
}
```

### Image focal points & aspect ratios

Each chapter in `src/content/story.ts` carries:

```ts
aspectRatio: 1.75,             // real width ÷ height — reserves space, no layout shift
imagePosition: 'center 45%',   // CSS object-position — keeps the focal point in frame
```

Set `aspectRatio` to your image's true ratio, and nudge `imagePosition`
(e.g. `center 30%`) so the important part survives cropping on narrow screens.

---

## Editing the story text

All prose is in **`src/content/story.ts`** — you never touch a layout component
to change wording. Each chapter object has `eyebrow`, `title`, `paragraphs[]`,
and optional `featuredQuote`, `secondQuote`, `closingLine`. The opening screen
and the dedication are the `intro` and `dedication` exports at the bottom.

British spelling is intentional (colour, recognise, realise). Please keep it.

The word given the subtle multi-colour treatment in Chapters 10 and 12 is set
per chapter via `spectrumWord: 'colours'`.

---

## Atmosphere & effects

All decorative effects live in `src/components/AtmosphereLayer.tsx` and
`src/styles/atmosphere.css`, and are chosen per chapter by the `specialEffect`,
`atmosphere` (0–1 intensity) and `pointerMagic` fields in `story.ts`.

To **disable an individual effect**, either lower a chapter's `atmosphere` /
set its `specialEffect` to `'stillness'`, or remove the relevant block in
`AtmosphereLayer.tsx` (each is clearly commented: wash, mist, motes, threads,
dragonflies, shimmer, glint). The pointer/touch trail is `RibbonTrail.tsx`; gate
it off by setting `pointerMagic: false` on chapters.

### Testing reduced motion

All movement is suppressed under `prefers-reduced-motion: reduce` (only gentle
opacity fades and the single final glint remain).

- **macOS**: System Settings → Accessibility → Display → Reduce motion.
- **Chrome DevTools**: Rendering panel → *Emulate CSS `prefers-reduced-motion`*.

Decorative animation also pauses automatically when the tab is hidden.

---

## GitHub Pages deployment

The base path is `/the-tenth-colour/`, set in `vite.config.ts`. It matches a
repository named `the-tenth-colour` served at
`https://<username>.github.io/the-tenth-colour/`.

A workflow is included at `.github/workflows/deploy.yml`. To use it:

1. Push the repository to GitHub (named `the-tenth-colour`).
2. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and deploys automatically. A single-page `404.html`
   (a copy of `index.html`) is emitted so deep links resolve.

You can also deploy the `dist/` folder by any static method you prefer.

## Custom domain

To serve from a custom domain (or a user/organisation root site) where the app
lives at `/`:

- Set the base to `/` — either edit `vite.config.ts` or build with
  `VITE_BASE=/ npm run build` (the workflow has a commented `env` example).
- Add your domain in **Settings → Pages → Custom domain** (this commits a
  `CNAME` file), and update the `<link rel="canonical">` and the absolute
  `og:image` URL in `index.html`.

---

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav`) and a correct heading
  order (one `h1`, chapters as `h2`); a skip link to the story.
- Every image has meaningful alt text; **no essential story text lives inside an
  image**, and the whole story is readable with sound off and with JavaScript
  disabled (a no-JS summary is provided).
- The audio control is a real `<button>`: keyboard operable, `aria-pressed`,
  descriptive `aria-label`s, a polite live-region status, and a visible focus
  ring. When the track is missing it is disabled, not hidden.
- Meaning is never carried by colour alone; the progress marks and audio states
  each have text equivalents.
- `prefers-reduced-motion` is fully respected.

## Performance & image optimisation

- Only the first plate loads eagerly; all others are `loading="lazy"`.
- Images reserve their box via `aspect-ratio` (no layout shift).
- One persistent `IntersectionObserver` tracks the active chapter; the pointer
  trail uses a single throttled `rAF` loop; offscreen and hidden-tab animation
  is paused.
- The JS bundle is ~68 KB gzipped; imagery is served from `/public`, not bundled.

**Recommended image export**

- Landscape plates ~2400px wide; portrait plates ~1600–2000px wide.
- Provide **WebP or AVIF** for meaningfully smaller files at equal quality, e.g.:

  ```bash
  # WebP (quality 82)
  cwebp -q 82 07-wonderland.png -o 07-wonderland.webp
  # AVIF via ffmpeg
  ffmpeg -i 07-wonderland.png -c:v libaom-av1 -crf 30 -still-picture 1 07-wonderland.avif
  ```

  Then point the chapter's `image:` field at the new file. Compress sensibly —
  don't crush quality; these are the centre of the experience.

## Missing-asset behaviour

- **Missing image** → elegant placeholder that names the file and preserves the
  aspect ratio. No broken icon, no layout shift, no console spam.
- **Missing audio** → the control stays visible but disabled, showing an
  accessible "No sound yet" state. The story is fully understandable without it.

---

## Asset checklist

- [ ] `public/images/01-awakening.jpg`
- [ ] `public/images/02-invitation.jpg`
- [ ] `public/images/03-colours-remember.jpg`
- [ ] `public/images/04-keyhole.jpg`
- [ ] `public/images/05-door.jpg`
- [ ] `public/images/06-crossing.jpg`
- [ ] `public/images/07-wonderland.jpg`
- [ ] `public/images/08-dragonfly-parliament.jpg`
- [ ] `public/images/09-colours-rise.jpg`
- [ ] `public/images/10-tinkerbell.jpg`
- [ ] `public/images/11-farewell.jpg`
- [ ] `public/images/12-home.jpg`
- [ ] `public/images/og-the-tenth-colour.jpg`
- [ ] `public/audio/the-tenth-colour.mp3`

---

*For the one who gave me the assignment.*

## Gateway and anniversary reflection

The collection is the domain home; the original story lives at `/original/`. Two separate entry points extend
the experience:

- `/the-tenth-colour/gateway/`: the collection home, with the original story and anniversary essay.
- `/the-tenth-colour/reflection/`: the complete anniversary manuscript.

The final essay title is “A Year of Return”; no explanatory subtitle is used.
The writing date is 6 October 2026. Title, date and paragraph-pacing rules live in
`src/content/reflection.ts`. The gateway uses that same title automatically.
The author's wording and paragraph breaks are stored in
`src/content/reflection.txt`; blank lines separate paragraphs.
Add future gateway destinations through `src/content/gateway.ts`.

The new pages use scoped styles in `src/styles/literary.css`, including mobile,
keyboard-focus, reduced-motion and print layouts. `scripts/build-pages.mjs`
creates real HTML entry points after Vite builds, so direct GitHub Pages links
to the gateway and reflection work without relying on a 404 fallback.
