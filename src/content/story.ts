/**
 * The story, as data.
 *
 * All twelve chapters live here. Prose can be revised without touching a
 * single layout component — the renderer reads every field below.
 *
 * British spelling is intentional throughout (colour, colours, recognise,
 * realise). Please do not convert it.
 */

/** Which of the three acts a chapter belongs to. Drives the page palette. */
export type Act = 'one' | 'two' | 'three'

/** Layout treatment for the chapter's image and prose. */
export type ChapterLayout =
  | 'contained' // image held inside broad margins
  | 'prose-first' // prose, then image
  | 'full-bleed' // landscape image spanning the viewport
  | 'split' // side-by-side on desktop, stacked on mobile
  | 'immersive' // dark, near-full-viewport image
  | 'centre-piece' // image, deep silence, then dialogue
  | 'quiet-close' // narrow prose column, portrait image

/** Named atmosphere programme for a chapter. */
export type SpecialEffect =
  | 'dust'
  | 'ribbon'
  | 'colour-glow'
  | 'keyhole'
  | 'threshold'
  | 'dragonflies'
  | 'threads'
  | 'departure'
  | 'stillness'

export interface Chapter {
  /** Stable slug, used for DOM ids and the progress indicator. */
  id: string
  /** Chapter number, 1–12. */
  number: number
  /** Small label above the title. */
  eyebrow: string
  /** Chapter title. */
  title: string
  /** Body paragraphs, rendered in order. */
  paragraphs: string[]
  /** Optional line given its own space and weight. */
  featuredQuote?: string
  /** Optional second quotation, shown after a deliberate pause. */
  secondQuote?: string
  /** Optional intimate closing line (used once, in Chapter 12). */
  closingLine?: string
  /**
   * A word inside the featured quotation that receives the very subtle
   * spectrum treatment sampled from the earlier colour editions.
   */
  spectrumWord?: string
  /** Path inside /public. Resolved against the base path at render time. */
  image: string
  /** Meaningful alternative text. Never decorative. */
  imageAlt: string
  layout: ChapterLayout
  act: Act
  /** Intrinsic aspect ratio (width / height) — reserves space, avoids CLS. */
  aspectRatio: number
  /** CSS object-position, so focal points survive cropping. */
  imagePosition: string
  /** 0–1. Drives particle density, mist and colour bleed. */
  atmosphere: number
  /** 0–1. Relative loudness if the reader has enabled sound. */
  audioLevel: number
  specialEffect: SpecialEffect
  /** Whether pointer/touch shimmer is permitted in this chapter. */
  pointerMagic: boolean
}

export const chapters: Chapter[] = [
  {
    id: 'awakening',
    number: 1,
    eyebrow: 'Chapter One',
    title: 'The Awakening',
    paragraphs: [
      'I woke completely shrunk, standing on a coffee table in a room I did not recognise.',
      'Everything around me had become enormous.',
      'Everything except one thing I knew.',
      'The envelopes.',
      'And on top of them, the colour meant for the final day.',
    ],
    image: 'images/01-awakening.jpg',
    imageAlt:
      'A stack of coloured envelopes on a pale table, tied with a silver ribbon. The mint envelope on top is marked with a handwritten number twenty.',
    layout: 'contained',
    act: 'one',
    aspectRatio: 0.8,
    imagePosition: 'center 55%',
    atmosphere: 0.12,
    audioLevel: 0.45,
    specialEffect: 'dust',
    pointerMagic: false,
  },
  {
    id: 'invitation',
    number: 2,
    eyebrow: 'Chapter Two',
    title: 'The Invitation',
    paragraphs: ['At first, nothing moved.', 'Then the ribbon loosened.', 'It did not fall.'],
    featuredQuote: 'It reached for me.',
    image: 'images/02-invitation.jpg',
    imageAlt:
      'The silver ribbon has loosened from the envelopes and trails across the table, catching the morning light.',
    layout: 'prose-first',
    act: 'one',
    aspectRatio: 0.8,
    imagePosition: 'center 50%',
    atmosphere: 0.2,
    audioLevel: 0.5,
    specialEffect: 'ribbon',
    pointerMagic: false,
  },
  {
    id: 'colours-remember',
    number: 3,
    eyebrow: 'Chapter Three',
    title: 'The Colours Remember',
    paragraphs: [
      'As I followed it closer, the envelopes beneath Mint began to glow.',
      'Blue breathed mist.',
      'Maroon held fire.',
      'Pink remembered sparkle.',
      'Onyx carried embers.',
      'Periwinkle released a single petal.',
      'Every colour I had visited was still there.',
      'Quietly waiting beneath the last.',
    ],
    image: 'images/03-colours-remember.jpg',
    imageAlt:
      'Light glows from between the stacked envelopes, each colour showing a trace of its own — mist, fire, sparkle, embers.',
    layout: 'split',
    act: 'one',
    aspectRatio: 0.8,
    imagePosition: 'center 50%',
    atmosphere: 0.32,
    audioLevel: 0.55,
    specialEffect: 'colour-glow',
    pointerMagic: false,
  },
  {
    id: 'keyhole',
    number: 4,
    eyebrow: 'Chapter Four',
    title: 'The Hidden Entrance',
    paragraphs: [
      'The number on the envelope changed beneath the light.',
      'Day twenty remained written on the paper.',
      'But inside it, something else appeared.',
    ],
    featuredQuote: 'A keyhole.',
    image: 'images/04-keyhole.jpg',
    imageAlt:
      'A small golden keyhole glows within the handwritten number twenty on the mint envelope.',
    layout: 'contained',
    act: 'one',
    aspectRatio: 0.8,
    imagePosition: 'center 55%',
    atmosphere: 0.38,
    audioLevel: 0.6,
    specialEffect: 'keyhole',
    pointerMagic: false,
  },
  {
    id: 'door',
    number: 5,
    eyebrow: 'Chapter Five',
    title: 'The Door',
    paragraphs: [
      'The ribbon had not only guided me.',
      'It had been the key all along.',
      'And the tenth colour was not an ending.',
    ],
    featuredQuote: 'It was a door.',
    image: 'images/05-door.jpg',
    imageAlt:
      'An ornate golden key rests on the mint envelope beside a small open door, through which a sunlit garden path is visible.',
    layout: 'prose-first',
    act: 'one',
    aspectRatio: 0.8,
    imagePosition: 'center 50%',
    atmosphere: 0.46,
    audioLevel: 0.65,
    specialEffect: 'threshold',
    pointerMagic: false,
  },
  {
    id: 'crossing',
    number: 6,
    eyebrow: 'Chapter Six',
    title: 'Crossing',
    paragraphs: [
      'I had spent ten days opening colours.',
      'On the final day, one of them opened for me.',
    ],
    image: 'images/06-crossing.jpg',
    imageAlt:
      'A miniature figure steps through the small golden doorway standing open on the stack of envelopes.',
    layout: 'immersive',
    act: 'one',
    aspectRatio: 0.78,
    imagePosition: 'center 50%',
    atmosphere: 0.55,
    audioLevel: 0.7,
    specialEffect: 'threshold',
    pointerMagic: false,
  },
  {
    id: 'wonderland',
    number: 7,
    eyebrow: 'Chapter Seven',
    title: 'Wonderland',
    paragraphs: [
      'From inside Wonderland, I could finally see what I had missed.',
      'The colours had never been separate stories.',
      'They had always belonged to the same world.',
    ],
    image: 'images/07-wonderland.jpg',
    imageAlt:
      'A figure stands on a path above a vast green valley at sunrise, with waterfalls, ribbons of light and enormous flowers.',
    layout: 'full-bleed',
    act: 'two',
    aspectRatio: 1.75,
    imagePosition: 'center 50%',
    atmosphere: 0.68,
    audioLevel: 0.8,
    specialEffect: 'dragonflies',
    pointerMagic: true,
  },
  {
    id: 'gathering',
    number: 8,
    eyebrow: 'Chapter Eight',
    title: 'The Gathering',
    paragraphs: [
      'At the end of the maroon path, I found a place already set for me.',
      'A table made from letters.',
      'An empty chair.',
      'And a parliament of dragonflies who seemed unsurprised that I had arrived.',
    ],
    image: 'images/08-dragonfly-parliament.jpg',
    imageAlt:
      'A table built from folded letters stands in a glowing forest clearing, an empty chair at its head, dragonflies gathered above it.',
    layout: 'full-bleed',
    act: 'two',
    aspectRatio: 1.75,
    imagePosition: 'center 50%',
    atmosphere: 0.78,
    audioLevel: 0.85,
    specialEffect: 'dragonflies',
    pointerMagic: true,
  },
  {
    id: 'colours-rise',
    number: 9,
    eyebrow: 'Chapter Nine',
    title: 'The Colours Rise',
    paragraphs: [
      'The letter opened before I touched it.',
      'One by one, the colours rose from the paper.',
      'They did not come to show me what I had made.',
      'They came to show me who had taught me to see.',
    ],
    image: 'images/09-colours-rise.jpg',
    imageAlt:
      'Ribbons of coloured light spiral upward from an open letter on the table, forming a luminous shape in the dark forest air.',
    layout: 'immersive',
    act: 'two',
    aspectRatio: 1.75,
    imagePosition: 'center 45%',
    atmosphere: 0.88,
    audioLevel: 0.92,
    specialEffect: 'threads',
    pointerMagic: true,
  },
  {
    id: 'tinkerbell',
    number: 10,
    eyebrow: 'Chapter Ten',
    title: 'Tinkerbell',
    paragraphs: [
      '“Why did you bring me here?” I asked.',
      'The light around her softened.',
      '“I didn’t,” she said.',
      '“You arrived here one colour at a time.”',
      'The dragonflies gathered around us, each carrying a shade from the days before.',
      'Then she said:',
    ],
    featuredQuote:
      '“You thought you were creating colours to hold the days. But love was teaching you how to see them.”',
    secondQuote: '“I only gave you the colours. You gave them somewhere to live.”',
    spectrumWord: 'colours',
    image: 'images/10-tinkerbell.jpg',
    imageAlt:
      'A luminous winged figure made entirely of coloured light stands above the table of letters, one hand extended.',
    layout: 'centre-piece',
    act: 'two',
    aspectRatio: 1.75,
    imagePosition: 'center 45%',
    atmosphere: 1,
    audioLevel: 1,
    specialEffect: 'threads',
    pointerMagic: true,
  },
  {
    id: 'farewell',
    number: 11,
    eyebrow: 'Chapter Eleven',
    title: 'The Farewell',
    paragraphs: [
      'She did not vanish.',
      'She became wings.',
      'One by one, the colours loosened from her shape and returned to the air.',
      'A single dragonfly remained before me, carrying every shade at once.',
      'Then it turned toward the doorway.',
      'And I understood.',
      'She had not asked me to remain in Wonderland.',
      'She had only asked me to return differently.',
    ],
    image: 'images/11-farewell.jpg',
    imageAlt:
      'The luminous figure dissolves into many dragonflies that scatter into the dark, while a warm doorway glows at the edge of the clearing.',
    layout: 'full-bleed',
    act: 'three',
    aspectRatio: 1.75,
    imagePosition: 'center 50%',
    atmosphere: 0.5,
    audioLevel: 0.6,
    specialEffect: 'departure',
    pointerMagic: false,
  },
  {
    id: 'home',
    number: 12,
    eyebrow: 'Chapter Twelve',
    title: 'Home',
    paragraphs: [
      'I woke where the story had begun.',
      'The room was quiet.',
      'The ribbon was still.',
      'The tenth colour waited beneath the morning light.',
      'For a moment, I wondered whether I had dreamed it all.',
      'Then something moved beside the number.',
      'A pair of wings caught every colour at once.',
      'And I remembered.',
    ],
    featuredQuote:
      'You thought you were creating colours to hold the days. But love was teaching you how to see them.',
    secondQuote: 'I only gave you the colours. You gave them somewhere to live.',
    closingLine: 'Welcome home, Mr. D.',
    spectrumWord: 'colours',
    image: 'images/12-home.jpg',
    imageAlt:
      'The mint envelope in the quiet morning light, its handwritten number twenty beside a single resting dragonfly.',
    layout: 'quiet-close',
    act: 'three',
    aspectRatio: 0.6,
    imagePosition: 'center 50%',
    atmosphere: 0.06,
    audioLevel: 0.3,
    specialEffect: 'stillness',
    pointerMagic: false,
  },
]

/** Copy for the opening screen, kept beside the chapters for easy editing. */
export const intro = {
  openingLine: 'On the twentieth morning, I woke somewhere I had never been before.',
  soundInvitation: ['Turn on the sound.', 'Then follow the ribbon.'],
} as const

/** Copy for the closing dedication. */
export const dedication = {
  title: 'The Tenth Colour',
  volume: 'Volume 112',
  line: 'For the one who gave me the assignment.',
  linkLabel: 'Return to Moon Confessions',
} as const
