import { Fragment } from 'react'
import type { Entry, EssayPhoto } from '../content/collection'
import '../styles/photo-essay.css'

export function EssayFigure({ images, caption, opening = false }: { images: EssayPhoto[]; caption?: string; opening?: boolean }) {
  return <figure className={`essay-photographs ${opening ? 'essay-photographs-opening' : images.length > 1 ? 'essay-photographs-pair' : 'essay-photographs-return'}`}>
    <div>{images.map(photo => <img key={photo.src} src={photo.src} alt={photo.alt}
      width={photo.width} height={photo.height} loading={opening ? 'eager' : 'lazy'}
      fetchPriority={opening ? 'high' : undefined} decoding="async" />)}</div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
}

export function PhotoEssayBody({ entry }: { entry: Entry }) {
  return <>{entry.paragraphs.map((paragraph, index) => {
    const pause = entry.photoEssay?.breaks.find(item => item.afterParagraph === paragraph)
    const emphasis = paragraph === 'The sky does not wait for us to finish worrying before it turns gold.'
    return <Fragment key={index}>
      <p className={emphasis ? 'essay-emphasis' : paragraph.length < 35 ? 'quiet-line' : undefined}>{paragraph}</p>
      {pause && <EssayFigure images={pause.images} caption={pause.caption} />}
    </Fragment>
  })}</>
}
