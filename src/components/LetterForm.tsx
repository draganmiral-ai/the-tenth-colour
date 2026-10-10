import { useEffect, useRef, useState } from 'react'
import { MoonMark } from './MoonMark'
import '../styles/letters.css'

const shareUrl = 'https://preview.mailerlite.io/forms/2700474/200924511652021868/share'
const submitUrl = 'https://assets.mailerlite.com/jsonp/2700474/forms/200924511652021868/subscribe'
const scriptUrl = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519'
let providerReady: Promise<void> | undefined

function loadFormHandler() {
  if (!providerReady) providerReady = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = scriptUrl
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => { providerReady = undefined; script.remove(); reject(new Error('Form unavailable')) }
    document.body.appendChild(script)
  })
  return providerReady
}

type FormWindow = Window & { ml_webform_success_46964656?: () => void }

export function LetterForm({ full = false }: { full?: boolean }) {
  const [ready, setReady] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const [success, setSuccess] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [slow, setSlow] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const response = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    let current = true
    const formWindow = window as FormWindow
    const onSuccess = () => {
      clearTimeout(timer.current)
      setSlow(false)
      setSuccess(true)
    }
    // MailerLite's public HTML embed calls this only after a successful submission.
    formWindow.ml_webform_success_46964656 = onSuccess
    loadFormHandler().then(() => { if (current) setReady(true) }).catch(() => { if (current) setUnavailable(true) })
    return () => {
      current = false
      clearTimeout(timer.current)
      if (formWindow.ml_webform_success_46964656 === onSuccess) delete formWindow.ml_webform_success_46964656
    }
  }, [])

  useEffect(() => { if (success) response.current?.focus() }, [success])

  return <section className={full ? 'letters full' : 'letters'} id="letters">
    <div className="letter-title"><span className="eyebrow">LETTERS TO YOU</span><h2>A quieter corner<br/> of your inbox.</h2></div>
    <div className="letter-form">
      <p>Occasional letters on faith, love and finding your way. Read them when you have a little space.</p>
      <div id="mlb2-46964656" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-46964656">
        {success ? <div className="letter-response" role="status">
          <h3 ref={response} tabIndex={-1}>One small step.</h3>
          <p>Check your inbox for a confirmation email. Follow the link inside to receive the letters.</p>
          <p className="fine">If it hasn’t arrived, check your spam folder too.</p>
        </div> : <div className="ml-form-embedWrapper">
          <div className="ml-form-embedBody row-form">
            <form className="ml-block-form" action={submitUrl} method="post" target="_blank" data-code="" onSubmit={event => {
              if (!ready) { event.preventDefault(); return }
              setSlow(false)
              clearTimeout(timer.current)
              timer.current = setTimeout(() => setSlow(true), 25000)
            }}>
              <div className="ml-form-fieldRow"><div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                <label htmlFor="letter-email">Your email address</label>
                <input id="letter-email" type="email" name="fields[email]" autoComplete="email" required aria-describedby={invalid ? 'letter-error letter-consent' : 'letter-consent'} aria-invalid={invalid} onInvalid={() => setInvalid(true)} onChange={() => setInvalid(false)} placeholder="you@example.com"/>
                {invalid && <p className="fine" id="letter-error" role="alert">Please enter a valid email address.</p>}
              </div></div>
              <p className="fine" id="letter-consent">By subscribing, you agree to receive letters from Moon Confessions. Unsubscribe whenever you need to. <a href="/privacy/">A note on privacy</a>.</p>
              <input type="hidden" name="ml-submit" value="1"/>
              <input type="hidden" name="anticsrf" value="true"/>
              <div className="ml-form-embedSubmit">
                <button className="primary text-link letter-submit" type="submit" disabled={!ready}>Send me the letters <MoonMark/></button>
                <button className="loading letter-loading" type="button" disabled style={{ display: 'none' }}>Sending your request…</button>
              </div>
            </form>
          </div>
        </div>}
      </div>
      {unavailable && <p className="fine" role="status">The form could not load. <a href={shareUrl} target="_blank" rel="noreferrer">Open the signup form <MoonMark/></a>.</p>}
      {slow && <p className="fine" role="status">This is taking a little longer. Check your inbox before trying again, or <a href={shareUrl} target="_blank" rel="noreferrer">open the signup form <MoonMark/></a>.</p>}
    </div>
  </section>
}

export function LettersConfirmed() {
  return <main id="main" className="letters-confirmed wrap">
    <span className="eyebrow">YOU ARE HERE</span>
    <h1>You are allowed<br/> to <em>arrive slowly.</em></h1>
    <p>Your email address is confirmed. A quiet hello is on its way to your inbox.</p>
    <a className="text-link" href="/read/before-you-read/">Find a place to begin <MoonMark/></a>
  </main>
}
