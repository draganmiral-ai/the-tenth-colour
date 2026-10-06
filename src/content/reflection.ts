import manuscript from './reflection.txt?raw'

/** The author’s original words, preserving every paragraph break. */
export type ReflectionBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'break' }

export const reflection = {
  title: 'A Year of Return', // Final, author-approved title.
  signature: 'Ibrahim',
  date: '6 October 2026',
  dateISO: '2026-10-06',
  blocks: manuscript.trim().split(/\n\s*\n/).map(text => ({ type: 'paragraph', text })) as ReflectionBlock[],
}

/** Quiet pauses preserve the manuscript's exact wording and paragraph breaks. */
export function paragraphPacing(text: string) {
  if (['I became grounded.', 'Belonging.'].includes(text)) return 'reflection-quiet-pause'
  if (text === 'Before anything and anyone,') return 'reflection-belonging-start'
  if (text === 'I belong.') return 'reflection-belonging-end'
  if (text === 'Alhamdulillah for the year that brought me here.') return 'reflection-gratitude-start'
  if (text === 'And Alhamdulillah for whatever comes next.') return 'reflection-gratitude-end'
  return undefined
}
