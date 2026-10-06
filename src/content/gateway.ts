/** Add another destination here when another experience is ready. */
export const destinations = [
  {
    id: 'original',
    number: '01',
    label: 'THE ORIGINAL EXPERIENCE',
    title: 'The Tenth Colour',
    description: 'A final chapter from the Days of Wonder.',
    linkLabel: 'Enter the story',
    path: '',
    theme: 'wonder',
  },
  {
    id: 'reflection',
    number: '02',
    label: 'A PERSONAL ESSAY',
    description: 'On one year since reverting to Islam.',
    linkLabel: 'Open the essay',
    path: 'reflection/',
    theme: 'return',
  },
] as const
