import type { CSSProperties } from 'react'

interface DragonflyProps {
  /** Pixel width. */
  size: number
  /** 0–1. */
  opacity: number
  /** Flight duration in seconds. */
  duration: number
  /** Start delay in seconds. */
  delay: number
  /** Tint applied to the silhouette. */
  colour: string
  /** Start position, as CSS top/left percentages. */
  top: string
  left: string
}

/**
 * An original dragonfly silhouette — four translucent wings and a slender
 * body, drawn from scratch. No character reference of any kind.
 *
 * Purely decorative, so it is hidden from assistive technology. Its drift and
 * wing-beat live in atmosphere.css and are silenced by reduced motion.
 */
export function Dragonfly({ size, opacity, duration, delay, colour, top, left }: DragonflyProps) {
  const style = {
    top,
    left,
    '--df-size': `${size}px`,
    '--df-opacity': opacity,
    '--df-duration': `${duration}s`,
    '--df-delay': `${delay}s`,
    '--df-colour': colour,
  } as CSSProperties

  return (
    <span className="dragonfly" style={style} aria-hidden="true">
      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <line x1="50" y1="8" x2="50" y2="54" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="50" cy="9" r="2.4" fill="currentColor" />
        {/* Wings — grouped so the pair beats together */}
        <g className="dragonfly__wing" opacity="0.62">
          <ellipse cx="30" cy="22" rx="20" ry="5.5" fill="currentColor" transform="rotate(-16 30 22)" />
          <ellipse cx="70" cy="22" rx="20" ry="5.5" fill="currentColor" transform="rotate(16 70 22)" />
          <ellipse cx="32" cy="32" rx="17" ry="4.6" fill="currentColor" transform="rotate(-8 32 32)" />
          <ellipse cx="68" cy="32" rx="17" ry="4.6" fill="currentColor" transform="rotate(8 68 32)" />
        </g>
      </svg>
    </span>
  )
}
