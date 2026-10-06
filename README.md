# Moon Confessions

Essays, reflections and quiet films on faith, love and belonging.

Published at https://moonconfessions.com/ through the existing GitHub Pages workflow.

## Local development

Use Node 22.12 or later. Run `npm ci`, then `npm run dev`. Run `npm run build` to produce `dist/`, including static deep-link pages, social metadata and a sitemap.

## Content and design

- `src/MoonSite.tsx`: homepage, writing collection, reader, films and shared navigation.
- `src/QuietReturn.tsx`: The Quiet Return journal and its four-page sample.
- `src/content/collection.ts` and `src/content/reflection.txt`: approved original writing.
- `public/media/`: approved website artwork and films.
- `original/index.html` and `src/original.tsx`: the preserved Tenth Colour experience at `/original/`, with its own typography, effects, imagery and optional soundtrack. The main navigation calls it The Tenth Color.

Email subscriptions are not open yet. No email collection or analytics integration is enabled. Kept pieces are stored only in the visitor’s browser. Private working notes, full manuscripts beyond the approved public writing, and review archives are excluded from deployment.

## Deployment

Pushes to `main` build and deploy `dist/` to the existing GitHub Pages site and custom domain. The previous public site is preserved in Git history at `b7879dfae813e817adfe370836c6b84837b8989e`.
