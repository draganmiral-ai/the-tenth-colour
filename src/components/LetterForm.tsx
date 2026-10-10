import { MoonMark } from './MoonMark'
import '../styles/letters.css'

// Owner-requested privacy pause. Do not reconnect signup or email delivery
// until subscriber-facing address details have been reviewed and approved.
export function LetterForm({ full = false }: { full?: boolean }) {
  return <section className={full ? 'letters full' : 'letters'} id="letters">
    <div className="letter-title"><span className="eyebrow">LETTERS TO YOU</span><h2>A quieter corner<br/> of your inbox.</h2></div>
    <div className="letter-form">
      <p>Subscriptions are paused for a little while.</p>
      <p>In the meantime, there is a quiet place for you in the writing.</p>
      <a className="text-link" href="/collection/">Stay with the writing <MoonMark/></a>
    </div>
  </section>
}

export function LettersConfirmed() {
  return <main id="main" className="letters-confirmed wrap">
    <span className="eyebrow">LETTERS TO YOU</span>
    <h1>You are allowed<br/> to <em>arrive slowly.</em></h1>
    <p>Letters are paused for now. You are welcome to keep reading.</p>
    <a className="text-link" href="/read/before-you-read/">Find a place to begin <MoonMark/></a>
  </main>
}
