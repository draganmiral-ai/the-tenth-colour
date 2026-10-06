import { useEffect } from 'react'
import { asset } from '../config'
import { reflection, paragraphPacing } from '../content/reflection'
import '../styles/literary.css'

export function Reflection() {
  const hasManuscript = reflection.blocks.length > 0
  useEffect(() => { document.title = reflection.title }, [])
  return (
    <div className="literary reflection" id="reflection-top">
      <a className="skip-link" href="#manuscript">Skip to the manuscript</a>
      <main>
        <article className="reflection-paper" aria-labelledby="reflection-title">
          <header className="reflection-opening">
            <h1 id="reflection-title">{reflection.title}</h1>
            <div className="reflection-rule" aria-hidden="true" />
          </header>
          <div className="reflection-manuscript" id="manuscript">
            {hasManuscript ? reflection.blocks.map((block, index) => {
              switch (block.type) {
                case 'heading': return <h2 key={index}>{block.text}</h2>
                case 'quote': return <blockquote key={index}><p>{block.text}</p></blockquote>
                case 'break': return <hr className="reflection-pause" key={index} />
                default: return <p className={paragraphPacing(block.text)} key={index}>{block.text}</p>
              }
            }) : <div className="reflection-pending"><p className="literary-eyebrow">THE MANUSCRIPT IS STILL TO COME</p><p>This reading space is prepared for the author’s full reflection.</p></div>}
          </div>
          {hasManuscript && <div className="reflection-signature">
            <p className="reflection-signature-name">{reflection.signature}</p>
            <time className="reflection-date" dateTime={reflection.dateISO}>{reflection.date}</time>
          </div>}
          <footer className="reflection-close"><a href={asset('')}>Return to The Tenth Colour</a></footer>
        </article>
      </main>
    </div>
  )
}
