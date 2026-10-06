import { useRef, useState } from 'react'
import samplePages from './content/journal-preview.json'

export const JOURNAL_URL = '/the-quiet-return/'
const AMAZON_URL = 'https://www.amazon.com/dp/B0HKDJK8BL'
const cover = '/media/journal/cover.jpg'
const coverAlt = 'Sage cover of The Quiet Return, Volume I: Beginning, by Dragan Andric'
const roomPhoto = '/media/journal/physical-book-room.png'
const beadsPhoto = '/media/journal/physical-book-beads.png'

function Arrow() { return <span aria-hidden="true">↗</span> }
function AmazonLink() {
  return <a className="journal-amazon" href={AMAZON_URL} target="_blank" rel="noopener noreferrer">View on Amazon <Arrow/><span className="sr-only"> (opens in a new tab)</span></a>
}

export function JournalFeature() {
  return <section className="journal-feature" id="quiet-return" aria-labelledby="journal-feature-heading">
    <div className="journal-feature-inner wrap">
      <a className="journal-feature-cover" href={JOURNAL_URL} aria-label="Explore The Quiet Return Journal">
        <img src={roomPhoto} alt="A physical copy of The Quiet Return standing on a textured green table in a warm living room" width="1086" height="1448" loading="lazy"/>
      </a>
      <div className="journal-feature-copy">
        <span className="eyebrow">THE QUIET RETURN JOURNAL · VOLUME I: BEGINNING</span>
        <h2 id="journal-feature-heading">A quiet place<br/> to <em>return.</em></h2>
        <p>Thirty gentle reflections, small moments of learning, and space for your own words. The Quiet Return is an undated journal for new Muslims, created to hold questions, gratitude, uncertainty, and hope, at your own pace.</p>
        <div className="journal-rhythm" aria-label="Reflect, learn and write"><span>Reflect</span><span>Learn</span><span>Write</span></div>
        <div className="journal-actions"><a className="text-link" href={JOURNAL_URL}>Explore the journal <Arrow/></a><AmazonLink/></div>
      </div>
    </div>
  </section>
}

function InteriorPreview() {
  const [selected, setSelected] = useState(0)
  const [textView, setTextView] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const current = samplePages[selected]
  return <section className="journal-interior wrap" id="inside" aria-labelledby="inside-heading">
    <div className="journal-section-heading">
      <div><span className="eyebrow">LOOK INSIDE</span><h2 id="inside-heading">Four pages.<br/> <em>Your own rhythm.</em></h2></div>
      <p>A reflection, a page for your words, one small thing to learn, and space to write again. This is the first complete entry.</p>
    </div>
    <div className="journal-sample-grid">
      {samplePages.map((page, i) => <figure key={page.number}>
        <button className="journal-page-button" onClick={() => { setSelected(i); setTextView(false); dialog.current?.showModal() }} aria-label={`Enlarge sample page ${i + 1}: ${page.label}`}>
          <img src={page.image} alt={page.label === 'Write' ? 'A lined writing page with a short thought at the top' : page.label === 'Reflect' ? 'You Are Already Allowed to Be Near: the first reflection, with Qur’an reference 2:186' : 'One thing to learn: Du’a, with the Arabic word and a gentle explanation'} width="1165" height="1800" loading="lazy"/>
          <span className="journal-enlarge" aria-hidden="true">Read page ↗</span>
        </button>
        <figcaption><span>0{i + 1}</span> {page.label}</figcaption>
      </figure>)}
    </div>
    <p className="journal-sample-note">The first four-page entry, shown as printed. Open any page to read it.</p>
    <details className="journal-transcript"><summary>Read the sample as text</summary><div>
      {samplePages.map((page, i) => <section key={page.number}><h3>0{i + 1} · {page.label}</h3><p dir="auto">{page.text}</p>{page.label === 'Write' && <p className="sample-writing-note">The rest of this page is lined space for your own writing.</p>}</section>)}
    </div></details>
    <dialog className="journal-preview-dialog" ref={dialog} aria-labelledby="sample-dialog-heading" onClick={e => { if (e.target === dialog.current) dialog.current?.close() }}>
      <div className="journal-preview-bar"><h2 id="sample-dialog-heading">Sample {selected + 1} of 4 · {current.label}</h2><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close sample preview">Close ×</button></div>
      <div className="journal-preview-controls"><button disabled={selected === 0} onClick={() => setSelected(selected - 1)}>← Previous page</button><span>Print page {current.number}</span><button disabled={selected === 3} onClick={() => setSelected(selected + 1)}>Next page →</button></div>
      <div className="journal-preview-mode"><button aria-pressed={textView} onClick={() => setTextView(!textView)}>{textView ? 'Show printed page' : 'Read in larger text'}</button></div>
      <div key={`${selected}-${textView}`} className={`journal-preview-sheet${textView ? ' journal-preview-text' : ''}`}>
        {textView ? <><p dir="auto">{current.text}</p>{current.label === 'Write' && <p className="sample-writing-note">The rest of this page is lined space for your own writing.</p>}</> : <img src={current.image} alt={`Print page ${current.number}: ${current.label}`} width="1165" height="1800"/>}
      </div>
    </dialog>
  </section>
}

export function QuietReturn() {
  return <main id="main" className="journal-page">
    <section className="journal-hero wrap" aria-labelledby="journal-title">
      <div className="journal-hero-copy">
        <span className="eyebrow">AN UNDATED JOURNAL FOR NEW MUSLIMS</span>
        <h1 id="journal-title">The Quiet<br/> <em>Return.</em></h1>
        <p className="journal-volume">Volume I: Beginning</p>
        <p className="journal-introduction">Thirty gentle reflections, small moments of learning, and space for your own words.</p>
        <p className="journal-audience">For new Muslims, reverts, and anyone exploring Islam at their own pace. A personal companion for questions, gratitude, uncertainty, and hope.</p>
        <div className="journal-actions"><AmazonLink/><a className="text-link" href="#inside">Look inside <span aria-hidden="true">↓</span></a></div>
        <p className="journal-edition">First edition, 2026</p>
      </div>
      <figure className="journal-hero-cover"><img src={beadsPhoto} alt="The physical Quiet Return journal resting on a green table beside a strand of coloured beads" width="1086" height="1448" fetchPriority="high"/><figcaption>A quiet companion, within reach.</figcaption></figure>
    </section>
    <section className="journal-companionship" aria-labelledby="journal-pace-heading"><div className="wrap">
      <div><span className="eyebrow">UNDATED, BY DESIGN</span><h2 id="journal-pace-heading">Nothing to<br/> <em>catch up on.</em></h2></div>
      <div><blockquote>If you write today and return three weeks from now, simply turn the page. Nothing has been missed. You were never late.</blockquote><p>There are no deadlines, tests, or required daily entries. Begin where you are, and return when you are ready.</p></div>
    </div></section>
    <section className="journal-features wrap" aria-label="Reflect, learn and write">
      <article><span className="eyebrow">01</span><h2>Reflect.</h2><p>A gentle reflection connected to a Qur’anic reference, with room to notice what it brings up for you.</p></article>
      <article><span className="eyebrow">02</span><h2>Learn.</h2><p>One small lesson or Arabic term, offered as a quiet introduction to something that may be new.</p></article>
      <article><span className="eyebrow">03</span><h2>Write.</h2><p>Two dedicated writing pages in each four-page entry. Space for gratitude, questions, or whatever needs somewhere to go.</p></article>
    </section>
    <InteriorPreview/>
    <section className="journal-details wrap" aria-labelledby="journal-details-heading">
      <figure className="journal-room-photo"><img src={roomPhoto} alt="The Quiet Return hardcover standing open slightly, with its pages visible, photographed at home" width="1086" height="1448" loading="lazy"/><figcaption>The journal, photographed at home.</figcaption></figure>
      <div className="journal-details-copy"><span className="eyebrow">THE JOURNAL</span><h2 id="journal-details-heading">A little structure.<br/> <em>Room to be yourself.</em></h2><p>Written from lived experience, The Quiet Return is a personal companion rather than religious instruction.</p>
        <dl><div><dt>Entries</dt><dd>30, undated</dd></div><div><dt>Each entry</dt><dd>Four pages</dd></div><div><dt>Length</dt><dd>154 pages</dd></div><div><dt>Format</dt><dd>5.5 × 8.5 inches</dd></div><div><dt>Volume</dt><dd>I: Beginning</dd></div><div><dt>Edition</dt><dd>First edition, 2026</dd></div></dl>
        <figure className="journal-published-cover"><img src={cover} alt={coverAlt} width="1650" height="2550" loading="lazy"/><figcaption><span>THE PUBLISHED COVER</span>The Quiet Return<br/>Volume I: Beginning</figcaption></figure>
      </div>
    </section>
    <section className="journal-closing"><span className="eyebrow">THE QUIET RETURN</span><h2>Begin wherever<br/> <em>you are.</em></h2><AmazonLink/><p>Find the journal and current purchase options on Amazon.</p></section>
  </main>
}
