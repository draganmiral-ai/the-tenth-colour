import { Fragment, type ReactNode } from 'react'

interface StoryQuoteProps {
  text: string
  /** A word given the restrained spectrum treatment, e.g. "colours". */
  spectrumWord?: string
  /** Extra silence around the line (used for "A keyhole."). */
  isolated?: boolean
  /** The quieter second quotation. */
  secondary?: boolean
}

/**
 * Wraps every occurrence of `word` in a span carrying the spectrum gradient.
 * Matching is case-insensitive and respects word boundaries, so "coloured"
 * is left alone. The word remains ordinary selectable text.
 */
function withSpectrum(text: string, word?: string): ReactNode {
  if (!word) return text

  const pattern = new RegExp(`\\b(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi')
  const pieces = text.split(pattern)

  return pieces.map((piece, index) =>
    piece.toLowerCase() === word.toLowerCase() ? (
      <span className="spectrum" key={index}>
        {piece}
      </span>
    ) : (
      <Fragment key={index}>{piece}</Fragment>
    ),
  )
}

/**
 * A featured line, given space and silence rather than emphasis.
 */
export function StoryQuote({ text, spectrumWord, isolated, secondary }: StoryQuoteProps) {
  const className = [
    'quote',
    isolated ? 'quote--isolated' : '',
    secondary ? 'quote--second' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <blockquote className={className}>
      <p className="quote__text">{withSpectrum(text, spectrumWord)}</p>
    </blockquote>
  )
}
