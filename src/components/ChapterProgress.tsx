import type { Chapter } from '../content/story'

interface ChapterProgressProps {
  chapters: Chapter[]
  activeIndex: number
  /** Hidden until the reader has actually entered the story. */
  visible: boolean
}

/**
 * A column of twelve small marks — like loose paper folds — that lengthens at
 * the current chapter. No numbers, no percentage, no slideshow controls.
 *
 * It is a genuine navigation aid, so it is a <nav> of anchor links; each mark
 * carries a screen-reader label. It is hidden entirely on phones via CSS.
 */
export function ChapterProgress({ chapters, activeIndex, visible }: ChapterProgressProps) {
  return (
    <nav
      className={`progress${visible ? ' is-visible' : ''}`}
      aria-label="Chapter progress"
    >
      {chapters.map((chapter, index) => {
        const state = index === activeIndex ? 'current' : index < activeIndex ? 'read' : 'unread'
        return (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className="progress__mark"
            data-state={state}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <span className="visually-hidden">
              {chapter.title}
              {index === activeIndex ? ' — current' : ''}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
