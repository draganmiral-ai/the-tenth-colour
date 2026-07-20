import type { ElementType, ReactNode } from 'react'
import { useRevealOnce } from '../hooks/useActiveChapter'

interface RevealProps {
  children: ReactNode
  /** Milliseconds of delay, for staggering sibling blocks. */
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Fades a block up once, the first time it enters the viewport.
 *
 * Under `prefers-reduced-motion` the CSS neutralises the transform and
 * transition entirely, so the content is simply present.
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: RevealProps) {
  const { ref, visible } = useRevealOnce<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
