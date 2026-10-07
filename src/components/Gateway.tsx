import { MoonMark } from './MoonMark'
import '../styles/moon-mark.css'
import { useEffect } from 'react'
import { asset, IMPRINT } from '../config'
import { destinations } from '../content/gateway'
import { reflection } from '../content/reflection'
import '../styles/literary.css'

export function Gateway() {
  useEffect(() => { document.title = 'The Tenth Colour | Collected works' }, [])
  return (
    <div className="literary gateway">
      <a className="skip-link" href="#gateway-paths">Skip to the collection</a>
      <header className="literary-masthead"><span>{IMPRINT.publication}</span><span>The Tenth Colour</span></header>
      <main className="gateway-main">
        <div className="gateway-opening">
          <p className="literary-eyebrow">COLLECTED WORKS</p>
          <h1>The Tenth <em>Colour</em></h1>
          <div className="gateway-colours" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <span key={i} />)}</div>
        </div>
        <nav className="gateway-paths" id="gateway-paths" aria-label="Collected works">
          {destinations.map(destination => (
            <a className={`gateway-path gateway-path--${destination.theme}`} href={asset(destination.path)} key={destination.id}>
              <span className="gateway-path-top"><span>{destination.number}</span><span>{destination.label}</span></span>
              <span className="gateway-path-title">{destination.id === 'reflection' ? reflection.title : destination.title}</span>
              <span className="gateway-path-description">{destination.description}</span>
              <span className="gateway-path-action">{destination.linkLabel}<MoonMark/></span>
            </a>
          ))}
        </nav>
      </main>
      <footer className="literary-footer"><span>{IMPRINT.publication}</span><span>Stories, and the spaces between.</span></footer>
    </div>
  )
}
