# Story images

Drop the twelve final plates here, using these **exact** filenames. The site
renders an elegant placeholder for any that are missing, so it never breaks
while the folder is incomplete.

| Filename | Chapter |
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

Notes:

- **Formats**: JPEG, PNG, WebP or AVIF are all fine. If you change the extension,
  update the matching `image:` path in `src/content/story.ts`.
- **Dimensions**: landscape plates ~2400px wide; portrait plates ~1600–2000px wide.
- **Focal point**: adjust `imagePosition` per chapter in `src/content/story.ts`
  (e.g. `center 40%`) so cropping keeps the important part in frame.
- **Aspect ratio**: set `aspectRatio` per chapter to the image's real width÷height
  to avoid layout shift. Chapters 1–6 and 12 currently expect portrait; 7–11 expect
  landscape.

See the main `README.md` for image-optimisation guidance (WebP/AVIF export).
