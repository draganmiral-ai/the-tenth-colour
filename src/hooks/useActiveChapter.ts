import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Observes the chapter sections and reports which one currently holds the
 * reader's attention.
 *
 * Uses a single IntersectionObserver across all sections — no scroll handler,
 * so there is nothing running on the main thread between intersections.
 * The chapter whose midpoint sits nearest the middle of the viewport wins,
 * which behaves sensibly for both short and very tall sections.
 */
export function useActiveChapter(count: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elements = useRef<(HTMLElement | null)[]>([])
  const ratios = useRef<number[]>(Array.from({ length: count }, () => 0))

  /** Ref callback handed to each chapter section. */
  const register = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      elements.current[index] = node
    },
    [],
  )

  useEffect(() => {
    const nodes = elements.current.filter((node): node is HTMLElement => node !== null)
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = elements.current.indexOf(entry.target as HTMLElement)
          if (index !== -1) ratios.current[index] = entry.intersectionRatio
        }

        let best = -1
        let bestRatio = 0
        for (let i = 0; i < ratios.current.length; i += 1) {
          if (ratios.current[i] > bestRatio) {
            bestRatio = ratios.current[i]
            best = i
          }
        }

        if (best !== -1 && bestRatio > 0.08) {
          setActiveIndex(best)
          setHasStarted(true)
        } else if (bestRatio === 0) {
          // Entirely above the first chapter — we are back in the opening.
          setHasStarted(false)
        }
      },
      {
        // A spread of thresholds gives smooth handover between long sections.
        threshold: [0, 0.08, 0.2, 0.35, 0.5, 0.7, 0.9],
        rootMargin: '-12% 0px -12% 0px',
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [count])

  return { activeIndex, hasStarted, register }
}

/**
 * Reveals an element once it first enters the viewport, then stops observing
 * it. Deliberately one-way: prose does not fade out again on scroll-up.
 */
export function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // If IntersectionObserver is unavailable, show the content immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
