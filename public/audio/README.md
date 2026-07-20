# Ambient audio

Place the ambient track here as:

    the-tenth-colour.mp3

Until it exists, the audio control stays visible but shows a calm
"No sound yet" state — it never throws repeated console errors, and the whole
story remains fully readable without sound.

## Guidance

- **Format**: MP3 is the safest single-file choice for broad browser support.
  AAC/`.m4a` also works well; if you use it, update `AUDIO.src` in `src/config.ts`.
- **Length**: a few minutes is plenty — it loops seamlessly.
- **Loudness**: keep it gentle. The player fades in to a low ceiling
  (`AUDIO.volume`, default `0.35`) so the prose stays dominant. Master the file
  around −18 to −20 LUFS rather than pushing it loud.
- **Size**: aim for well under ~4 MB. 96–128 kbps mono or joint-stereo is ample
  for ambient texture and keeps the first play responsive.
- **Content**: use only audio you have the right to publish. Do not embed
  copyrighted music.

## Changing the volume or fade

Edit `AUDIO` in `src/config.ts`:

    export const AUDIO = {
      src: 'audio/the-tenth-colour.mp3',
      volume: 0.35,        // ceiling the track fades up to (0–1)
      fadeDuration: 2500,  // fade in/out, milliseconds
      loop: true,
    }
