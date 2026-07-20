import { MOON_CONFESSIONS_URL } from '../config'
import { dedication } from '../content/story'
import { Reveal } from './Reveal'

/**
 * The closing dedication. Generous space above it, then the imprint, the line
 * of dedication, and one restrained return link. No footer, no social row,
 * no copyright paragraph.
 */
export function FinalDedication() {
  return (
    <footer className="dedication">
      <Reveal>
        <p className="dedication__title">{dedication.title}</p>
        <p className="dedication__volume">{dedication.volume}</p>
        <p className="dedication__line">{dedication.line}</p>
      </Reveal>

      <Reveal delay={200}>
        <a className="dedication__link" href={MOON_CONFESSIONS_URL}>
          {dedication.linkLabel}
        </a>
      </Reveal>
    </footer>
  )
}
