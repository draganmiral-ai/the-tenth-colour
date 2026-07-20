import { IMPRINT, SITE } from '../config'
import { intro } from '../content/story'
import { Reveal } from './Reveal'

/**
 * The opening screen. No photograph — paper, a title, and an invitation.
 *
 * Nothing here blocks or delays scrolling; the pacing is a suggestion the
 * reader is free to ignore.
 */
export function SiteIntro() {
  return (
    <header className="intro">
      <Reveal as="p" className="intro__imprint">
        {IMPRINT.publication}
        <br />
        {IMPRINT.volume}
      </Reveal>

      <div className="intro__centre">
        <Reveal delay={400}>
          <h1 className="intro__title">{SITE.title}</h1>
          <p className="intro__subtitle">{SITE.subtitle}</p>
        </Reveal>

        <Reveal delay={1600}>
          <p className="intro__opening">{intro.openingLine}</p>
        </Reveal>
      </div>

      <Reveal delay={2600} className="intro__invitation">
        {intro.soundInvitation.map((line) => (
          <span key={line}>{line}</span>
        ))}
        {/* A loose silver ribbon, rather than a chevron. */}
        <span className="ribbon-marker" aria-hidden="true" />
      </Reveal>
    </header>
  )
}
