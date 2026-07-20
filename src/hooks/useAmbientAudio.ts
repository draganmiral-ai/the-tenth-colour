import { useCallback, useEffect, useRef, useState } from 'react'

export type AudioState = 'off' | 'loading' | 'on' | 'error' | 'unavailable'

interface AmbientAudioOptions {
  /** Path to the track, already resolved against the base path. */
  src: string
  /** Ceiling volume, 0–1. The track fades up to this, never past it. */
  volume?: number
  /** Fade length in milliseconds, applied in both directions. */
  fadeDuration?: number
  loop?: boolean
}

const STORAGE_KEY = 'the-tenth-colour:audio'

/**
 * Ambient audio controller.
 *
 * Deliberate behaviours:
 * - Never autoplays. The reader must ask for sound.
 * - Fades in and out over `fadeDuration`; never snaps on or off.
 * - Probes the file once up front, so a missing track becomes a calm
 *   "unavailable" state rather than a stream of console errors.
 * - Remembers the choice for the session only.
 */
export function useAmbientAudio({
  src,
  volume = 0.35,
  fadeDuration = 2500,
  loop = true,
}: AmbientAudioOptions) {
  const [state, setState] = useState<AudioState>('off')

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const frameRef = useRef<number | null>(null)
  /** Chapter-driven multiplier applied on top of the ceiling volume. */
  const levelRef = useRef(1)
  const ceilingRef = useRef(volume)

  ceilingRef.current = volume

  /** Cancels any fade currently in flight. */
  const stopFade = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [])

  /** Ramps volume to `target`, then optionally pauses. */
  const fadeTo = useCallback(
    (target: number, onComplete?: () => void) => {
      const audio = audioRef.current
      if (!audio) return

      stopFade()
      const from = audio.volume
      const start = performance.now()

      const step = (now: number) => {
        const progress = fadeDuration <= 0 ? 1 : Math.min((now - start) / fadeDuration, 1)
        // Ease-in-out, so the arrival is as soft as the departure.
        const eased = progress < 0.5 ? 2 * progress * progress : 1 - (2 - 2 * progress) ** 2 / 2
        audio.volume = Math.max(0, Math.min(1, from + (target - from) * eased))

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step)
        } else {
          frameRef.current = null
          onComplete?.()
        }
      }

      frameRef.current = requestAnimationFrame(step)
    },
    [fadeDuration, stopFade],
  )

  // Probe the asset once. A missing file is a normal, expected condition here.
  //
  // We check the content-type as well as response.ok: a dev server (and some
  // hosts) answer a missing asset with a 200 HTML fallback rather than a 404,
  // so "ok but not audio" must also count as unavailable.
  useEffect(() => {
    let cancelled = false

    fetch(src, { method: 'HEAD' })
      .then((response) => {
        if (cancelled) return
        const type = response.headers.get('content-type') ?? ''
        const looksLikeAudio = type === '' || type.startsWith('audio/') || type.includes('octet-stream')
        if (!response.ok || !looksLikeAudio) setState('unavailable')
      })
      .catch(() => {
        if (!cancelled) setState('unavailable')
      })

    return () => {
      cancelled = true
    }
  }, [src])

  // Create the element lazily, and tear it down properly.
  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'none'
    audio.loop = loop
    audio.volume = 0
    audio.src = src
    audioRef.current = audio

    return () => {
      stopFade()
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src, loop, stopFade])

  const enable = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false

    setState('loading')
    try {
      audio.volume = 0
      await audio.play()
      fadeTo(ceilingRef.current * levelRef.current)
      setState('on')
      sessionStorage.setItem(STORAGE_KEY, 'on')
      return true
    } catch {
      // Blocked by the browser, or the file cannot be decoded.
      setState((current) => (current === 'unavailable' ? current : 'error'))
      return false
    }
  }, [fadeTo])

  const disable = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setState('off')
    sessionStorage.setItem(STORAGE_KEY, 'off')
    fadeTo(0, () => audio.pause())
  }, [fadeTo])

  const toggle = useCallback(() => {
    if (state === 'on') disable()
    else if (state !== 'unavailable' && state !== 'loading') void enable()
  }, [state, enable, disable])

  /**
   * Restore a previous "on" choice within the same session.
   *
   * This is not autoplay: it only succeeds if the browser already considers
   * the page to have been interacted with. If it is refused, we fail silently
   * back to off rather than showing the reader an error they did not cause.
   */
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) !== 'on') return
    const audio = audioRef.current
    if (!audio) return

    let cancelled = false
    audio
      .play()
      .then(() => {
        if (cancelled) return
        fadeTo(ceilingRef.current * levelRef.current)
        setState('on')
      })
      .catch(() => {
        /* Gesture required. Stay off, quietly. */
      })

    return () => {
      cancelled = true
    }
  }, [fadeTo])

  /**
   * Chapter-driven intensity. One file, so this is a gentle volume curve —
   * not a pretence of separate musical movements.
   */
  const setLevel = useCallback((level: number) => {
    levelRef.current = Math.max(0, Math.min(1, level))
    const audio = audioRef.current
    // Only nudge while playing and not mid-fade, to avoid fighting the ramp.
    if (audio && frameRef.current === null && !audio.paused) {
      const target = ceilingRef.current * levelRef.current
      audio.volume = Math.max(0, Math.min(1, target))
    }
  }, [])

  // Pause the track if the reader leaves the tab, resume when they return.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current
      if (!audio || state !== 'on') return
      if (document.hidden) audio.pause()
      else void audio.play().catch(() => undefined)
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [state])

  return { state, toggle, enable, disable, setLevel }
}
