import { useEffect, useRef, useState } from 'react'
import { asset } from '../config'
import { ImagePlaceholder } from './ImagePlaceholder'

interface StoryImageProps {
  /** Path inside /public, e.g. images/01-awakening.jpg */
  src: string
  alt: string
  /** Intrinsic width / height. Reserves the box before the file loads. */
  aspectRatio: number
  /** CSS object-position, preserving the narrative focal point when cropped. */
  imagePosition: string
  /** Only the opening plate loads eagerly; everything below is lazy. */
  priority?: boolean
}

/**
 * A cinematic chapter plate.
 *
 * Reserves its space via aspect-ratio (no layout shift), fades in when
 * decoded, breathes almost imperceptibly while in view, and degrades to a
 * named placeholder — never a broken-image icon — if the file is absent.
 */
export function StoryImage({
  src,
  alt,
  aspectRatio,
  imagePosition,
  priority = false,
}: StoryImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [active, setActive] = useState(false)
  const frameRef = useRef<HTMLDivElement | null>(null)

  // Drive the gentle in-view scale without touching scroll handlers.
  useEffect(() => {
    const node = frameRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.25 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const resolved = asset(src)

  return (
    <div
      ref={frameRef}
      className={`figure__frame${active ? ' is-active' : ''}`}
      style={{ aspectRatio: String(aspectRatio) }}
    >
      {failed ? (
        <ImagePlaceholder file={src} />
      ) : (
        <img
          className={`figure__image${loaded ? ' is-loaded' : ''}`}
          src={resolved}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          style={{ objectPosition: imagePosition }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
