import { useEffect, useMemo, type CSSProperties } from 'react'
import type { Act, Chapter, SpecialEffect } from '../content/story'
import { Dragonfly } from './Dragonfly'

interface AtmosphereLayerProps {
  chapter: Chapter | null
  /** True once the reader has scrolled past the opening. */
  hasStarted: boolean
  reducedMotion: boolean
  documentVisible: boolean
}

/** Deterministic pseudo-random in [0,1) — stable across renders, no flicker. */
function seeded(index: number, salt: number): number {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

const MOTE_COUNT = 14
const THREAD_COLOURS = ['var(--periwinkle)', 'var(--saffron)', 'var(--soft-pink)', 'var(--blue-mist)']
const DRAGONFLY_COLOURS = [
  'var(--mint-light)',
  'var(--periwinkle)',
  'var(--blue-mist)',
  'var(--saffron)',
]

/** Which effects each named programme switches on. */
function effectFlags(effect: SpecialEffect) {
  return {
    wash: effect === 'colour-glow' || effect === 'dragonflies' || effect === 'threads',
    mist: effect === 'dragonflies' || effect === 'threads' || effect === 'departure',
    threads: effect === 'threads',
    shimmer: effect === 'ribbon' || effect === 'keyhole' || effect === 'threshold',
    departing: effect === 'departure',
    glint: effect === 'stillness',
  }
}

/**
 * The single fixed atmosphere layer for the whole page.
 *
 * It reads only the active chapter and cross-fades its effects, so there is
 * one set of decorative elements the browser can cheaply keep — never a
 * per-chapter pile-up. When motion is reduced, the tab is hidden, or the
 * reader has not yet begun, moving effects are suppressed; the calm colour
 * wash may remain because it does not move.
 */
export function AtmosphereLayer({
  chapter,
  hasStarted,
  reducedMotion,
  documentVisible,
}: AtmosphereLayerProps) {
  const act = chapter?.act ?? 'one'
  const intensity = hasStarted ? chapter?.atmosphere ?? 0.12 : 0.12
  const effect = chapter?.specialEffect ?? 'dust'
  const flags = effectFlags(effect)

  // Movement is allowed only when the reader can actually benefit from it.
  const animate = hasStarted && !reducedMotion && documentVisible

  // Keep the <body> in step, so the page background, ink and paper tooth shift
  // with the acts.
  //
  // Two mechanisms, on purpose:
  //   1. `data-act` drives the CSS `body[data-act='…']` rules, which set the
  //      inherited custom properties (--ink-soft, --rule, …). Descendants that
  //      read those via var() have no transition of their own, so they repaint
  //      correctly on the attribute change.
  //   2. The body's OWN background-color and colour are set as *literal* values
  //      here. They must not come from a `var()`, because Chromium will not fire
  //      a transition when the change is only to a referenced custom property —
  //      the transitioned longhand then sticks at its old value. A literal
  //      inline change transitions normally.
  useEffect(() => {
    document.body.dataset.act = act
    const palette: Record<Act, { surface: string; ink: string }> = {
      one: { surface: '#f7f2e8', ink: '#29272a' },
      two: { surface: '#07130f', ink: '#f7f2e8' },
      three: { surface: '#edf4df', ink: '#29272a' },
    }
    const { surface, ink } = palette[act]
    document.body.style.backgroundColor = surface
    document.body.style.color = ink
  }, [act])

  // Dust motes — a stable set, positioned once.
  const motes = useMemo(
    () =>
      Array.from({ length: MOTE_COUNT }, (_, i) => {
        const size = 1.5 + seeded(i, 1) * 3
        return {
          key: i,
          style: {
            left: `${seeded(i, 2) * 100}%`,
            top: `${60 + seeded(i, 3) * 45}%`,
            width: `${size}px`,
            height: `${size}px`,
            '--mote-duration': `${20 + seeded(i, 4) * 22}s`,
            '--mote-delay': `${-seeded(i, 5) * 30}s`,
            '--mote-drift': `${(seeded(i, 6) - 0.5) * 12}vw`,
            '--mote-opacity': 0.28 + seeded(i, 7) * 0.4,
          } as CSSProperties,
        }
      }),
    [],
  )

  // Luminous threads — Chapters 9 and 10.
  const threads = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        key: i,
        style: {
          left: `${12 + seeded(i, 11) * 76}%`,
          top: `${18 + seeded(i, 12) * 30}%`,
          '--thread-colour': THREAD_COLOURS[i % THREAD_COLOURS.length],
          '--thread-duration': `${16 + seeded(i, 13) * 12}s`,
          '--thread-delay': `${-seeded(i, 14) * 10}s`,
        } as CSSProperties,
      })),
    [],
  )

  // Dragonflies — count scales gently with intensity, capped low.
  const dragonflyCount = useMemo(() => {
    if (!chapter) return 0
    if (effect === 'departure') return 5
    if (effect === 'threads') return 5
    if (effect === 'dragonflies') return chapter.number >= 8 ? 4 : 3
    return 0
  }, [chapter, effect])

  const dragonflies = useMemo(
    () =>
      Array.from({ length: dragonflyCount }, (_, i) => ({
        key: i,
        size: 34 + seeded(i, 21) * 34,
        opacity: 0.32 + seeded(i, 22) * 0.32,
        duration: 26 + seeded(i, 23) * 20,
        delay: -seeded(i, 24) * 26,
        colour: DRAGONFLY_COLOURS[i % DRAGONFLY_COLOURS.length],
        top: `${30 + seeded(i, 25) * 55}%`,
        left: `${10 + seeded(i, 26) * 80}%`,
      })),
    [dragonflyCount],
  )

  return (
    <div className="atmosphere" data-act={act} aria-hidden="true">
      {/* Calm colour traces at the margins — allowed to remain when still. */}
      <div
        className="atmosphere__wash"
        style={{ opacity: flags.wash ? 0.55 * intensity : 0 }}
      />

      <div
        className="atmosphere__mist"
        style={{ opacity: animate && flags.mist ? 0.7 * intensity : 0 }}
      />

      <div className="atmosphere__motes" style={{ opacity: animate ? Math.min(intensity + 0.15, 1) : 0 }}>
        {animate && motes.map((mote) => <span key={mote.key} className="mote" style={mote.style} />)}
      </div>

      <div className="atmosphere__threads" style={{ opacity: animate && flags.threads ? 1 : 0 }}>
        {animate &&
          flags.threads &&
          threads.map((thread) => <span key={thread.key} className="thread" style={thread.style} />)}
      </div>

      <div
        className="dragonflies"
        data-departing={flags.departing ? 'true' : 'false'}
        style={{ opacity: animate && dragonflyCount > 0 ? 1 : 0 }}
      >
        {animate &&
          dragonflies.map((d) => (
            <Dragonfly
              key={d.key}
              size={d.size}
              opacity={d.opacity}
              duration={d.duration}
              delay={d.delay}
              colour={d.colour}
              top={d.top}
              left={d.left}
            />
          ))}
      </div>

      <div
        className="atmosphere__shimmer"
        style={{ opacity: animate && flags.shimmer ? 0.8 : 0 }}
      />

      {/* Chapter 12: one static glint, present even under reduced motion. */}
      <div className="atmosphere__glint" style={{ opacity: flags.glint ? 0.9 : 0 }} />
    </div>
  )
}
