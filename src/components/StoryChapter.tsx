import type { ReactNode } from 'react'
import type { Chapter } from '../content/story'
import { Reveal } from './Reveal'
import { StoryImage } from './StoryImage'
import { StoryQuote } from './StoryQuote'

interface StoryChapterProps {
  chapter: Chapter
  /** Ref callback from useActiveChapter, so the section can be observed. */
  registerRef: (node: HTMLElement | null) => void
}

/**
 * Renders one chapter according to its `layout`.
 *
 * Every chapter shares the same typography and rhythm; only the arrangement
 * of image and prose changes, so the variation reads as intention rather than
 * inconsistency.
 */
export function StoryChapter({ chapter, registerRef }: StoryChapterProps) {
  const {
    id,
    number,
    eyebrow,
    title,
    paragraphs,
    featuredQuote,
    secondQuote,
    closingLine,
    spectrumWord,
    image,
    imageAlt,
    layout,
    act,
    aspectRatio,
    imagePosition,
  } = chapter

  const titleId = `${id}-title`

  const figure = (
    <Reveal className="chapter__figure" as="figure">
      <StoryImage
        src={image}
        alt={imageAlt}
        aspectRatio={aspectRatio}
        imagePosition={imagePosition}
        priority={number === 1}
      />
    </Reveal>
  )

  const heading = (
    <Reveal className="chapter__heading">
      <p className="chapter__eyebrow">{eyebrow}</p>
      <h2 className="chapter__title" id={titleId}>
        {title}
      </h2>
    </Reveal>
  )

  const prose = (
    <Reveal className="chapter__prose" delay={80}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Reveal>
  )

  /** Featured lines, the closing welcome, and the silence around them. */
  const coda = (
    <>
      {featuredQuote && (
        <Reveal delay={120}>
          <StoryQuote
            text={featuredQuote}
            spectrumWord={spectrumWord}
            isolated={featuredQuote.length < 24}
          />
        </Reveal>
      )}
      {secondQuote && (
        <Reveal delay={160}>
          <StoryQuote text={secondQuote} spectrumWord={spectrumWord} secondary />
        </Reveal>
      )}
      {closingLine && (
        <Reveal delay={200}>
          <p className="closing-line">{closingLine}</p>
        </Reveal>
      )}
    </>
  )

  /** The body arrangement — the only thing `layout` actually changes. */
  let body: ReactNode

  switch (layout) {
    case 'prose-first':
      body = (
        <>
          {heading}
          {prose}
          {figure}
        </>
      )
      break

    case 'split':
      body = (
        <>
          {heading}
          <div className="chapter__body">
            {figure}
            {prose}
          </div>
        </>
      )
      break

    case 'centre-piece':
      // Chapter 10: the image arrives first, then a long silence, then speech.
      body = (
        <>
          {figure}
          {heading}
          {prose}
        </>
      )
      break

    default:
      // contained, full-bleed, immersive, quiet-close
      body = (
        <>
          {heading}
          {figure}
          {prose}
        </>
      )
  }

  return (
    <section
      ref={registerRef}
      id={id}
      className={`chapter chapter--${layout}`}
      data-act={act}
      data-chapter={number}
      aria-labelledby={titleId}
    >
      <div className="chapter__inner">
        {body}
        {coda}
      </div>
    </section>
  )
}
