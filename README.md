# Moon Confessions

Essays, reflections and quiet films on faith, love and belonging.

Published at https://moonconfessions.com/ through the existing GitHub Pages workflow.

## Local development

Use Node 22.12 or later. Run `npm ci`, then `npm run dev`. Run `npm run build` to produce a noindex review build in `dist/`, including static deep-link pages and social metadata. Use `MC_PUBLISH=1 npm run build` for a publication build with public indexing and sitemap enabled.

## Content and design

- `src/MoonSite.tsx`: homepage, writing collection, reader, films and shared navigation.
- `src/QuietReturn.tsx`: The Quiet Return journal and its four-page sample.
- `src/Journeys.tsx` and `src/content/journeys.json`: emotional pathways, audience stages, Before You Read, and Instagram entry journeys.
- `src/content/audience-map.json`: optional stage and emotional discovery across the complete writing collection.
- `src/components/MoonMark.tsx` and `src/styles/moon-mark.css`: Moonrise, the official interaction mark. Reuse the moon above a still horizon instead of arrows or chevrons; retain whole-row links, accessible labels, keyboard focus and reduced-motion support.
- `src/content/collection.ts` and `src/content/reflection.txt`: approved original writing.
- `public/media/`: approved website artwork and films.
- `original/index.html` and `src/original.tsx`: the preserved Tenth Colour experience at `/original/`, with its own typography, effects, imagery and optional soundtrack. The main navigation calls it The Tenth Color.

Email subscriptions are not open yet. No email collection or analytics integration is enabled. Kept pieces are stored only in the visitor’s browser. Private working notes, full manuscripts beyond the approved public writing, and review archives are excluded from deployment.

## Deployment

Pushes to `main` build with `MC_PUBLISH=1` and deploy only `dist/` to the existing GitHub Pages site and custom domain. The previous Moon Confessions release is preserved in Git history at `3d73cf64d02fca5135c2d9a6951029ac7767e721`.
