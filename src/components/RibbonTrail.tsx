import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks/useReducedMotion'

interface RibbonTrailProps {
  /** True only while a chapter that permits pointer magic is active. */
  active: boolean
}

const DOT_COUNT = 12

/**
 * An extremely faint silver trace that follows the pointer, but only inside
 * the Wonderland chapters, only on fine-pointer devices, and never under
 * reduced motion.
 *
 * A fixed pool of DOM dots is positioned along the recent pointer path on a
 * single rAF loop. There is no per-move state update and no allocation in the
 * hot path, so it stays cheap. The loop only runs while `active`.
 */
export function RibbonTrail({ active }: RibbonTrailProps) {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const layerRef = useRef<HTMLDivElement | null>(null)
  const enabled = active && finePointer && !reducedMotion

  useEffect(() => {
    const layer = layerRef.current
    if (!layer || !enabled) return

    const dots: HTMLSpanElement[] = []
    for (let i = 0; i < DOT_COUNT; i += 1) {
      const dot = document.createElement('span')
      dot.className = 'trail__dot'
      dot.style.opacity = '0'
      layer.appendChild(dot)
      dots.push(dot)
    }

    // A short ring buffer of recent pointer samples.
    const points = Array.from({ length: DOT_COUNT }, () => ({ x: -100, y: -100 }))
    let head = 0
    let moved = false
    let frame = 0

    const onMove = (event: PointerEvent) => {
      head = (head + 1) % DOT_COUNT
      points[head] = { x: event.clientX, y: event.clientY }
      moved = true
    }

    const render = () => {
      if (moved) {
        for (let i = 0; i < DOT_COUNT; i += 1) {
          const point = points[(head - i + DOT_COUNT) % DOT_COUNT]
          const dot = dots[i]
          const fade = 1 - i / DOT_COUNT
          dot.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${fade})`
          dot.style.opacity = String(fade * 0.5)
        }
      }
      frame = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
      dots.forEach((dot) => dot.remove())
    }
  }, [enabled])

  if (!enabled) return null
  return <div className="trail" ref={layerRef} aria-hidden="true" />
}

/**
 * A rare, restrained shimmer where a finger touches — Wonderland chapters
 * only, coarse-pointer devices only, and throttled so repeated taps do not
 * become a continuous effect.
 */
export function TouchShimmer({ active }: RibbonTrailProps) {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const lastRef = useRef(0)
  const enabled = active && !finePointer && !reducedMotion

  useEffect(() => {
    if (!enabled) return

    const onTouch = (event: TouchEvent) => {
      const now = performance.now()
      // At most one spark per second — restraint, not fireworks.
      if (now - lastRef.current < 1000) return
      lastRef.current = now

      const touch = event.touches[0]
      if (!touch) return

      const spark = document.createElement('span')
      spark.className = 'touch-spark'
      spark.style.left = `${touch.clientX}px`
      spark.style.top = `${touch.clientY}px`
      document.body.appendChild(spark)
      spark.addEventListener('animationend', () => spark.remove(), { once: true })
    }

    window.addEventListener('touchstart', onTouch, { passive: true })
    return () => window.removeEventListener('touchstart', onTouch)
  }, [enabled])

  return null
}
