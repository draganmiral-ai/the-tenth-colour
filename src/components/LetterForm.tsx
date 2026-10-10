import { useEffect } from 'react'
import { MoonMark } from './MoonMark'
import '../styles/letters.css'

// Public settings copied from Kit's published HTML embed; no API credentials.
const kitOptions = {
  "settings": {
    "after_subscribe": {
      "action": "message",
      "success_message": "A quiet hello is on its way. Check your inbox and confirm your email to receive the letters. If it isn’t there, have a look in spam or promotions.",
      "redirect_url": ""
    },
    "analytics": {
      "google": null,
      "fathom": null,
      "facebook": null,
      "segment": null,
      "pinterest": null,
      "sparkloop": null,
      "googletagmanager": null
    },
    "modal": {
      "trigger": "timer",
      "scroll_percentage": null,
      "timer": 5,
      "devices": "all",
      "show_once_every": 15
    },
    "powered_by": {
      "show": true,
      "url": "https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"
    },
    "recaptcha": {
      "enabled": false
    },
    "return_visitor": {
      "action": "show",
      "custom_content": ""
    },
    "slide_in": {
      "display_in": "bottom_right",
      "trigger": "timer",
      "scroll_percentage": null,
      "timer": 5,
      "devices": "all",
      "show_once_every": 15
    },
    "sticky_bar": {
      "display_in": "top",
      "trigger": "timer",
      "scroll_percentage": null,
      "timer": 5,
      "devices": "all",
      "show_once_every": 15
    }
  },
  "version": "5"
}

export function LetterForm({ full = false }: { full?: boolean }) {
  useEffect(() => {
    if (document.getElementById('kit-form-script')) return
    const script = document.createElement('script')
    script.id = 'kit-form-script'
    script.src = 'https://f.convertkit.com/ckjs/ck.5.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return <section className={full ? 'letters full' : 'letters'} id="letters">
    <div className="letter-title"><span className="eyebrow">LETTERS TO YOU</span><h2>A quieter corner<br/> of your inbox.</h2></div>
    <div className="letter-form">
      <p>A reflection, a poem, a small thought that stayed with me. About once a month, when there is something to share.</p>
      <form action="https://app.kit.com/forms/10027427/subscriptions" method="post"
        className="seva-form formkit-form" data-sv-form="10027427" data-uid="996acf570c"
        data-format="inline" data-version="5" data-options={JSON.stringify(kitOptions)}>
        <div data-style="clean" aria-live="polite">
          <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert" role="alert" />
          <div data-element="fields" className="seva-fields formkit-fields">
            <div className="formkit-field">
              <label htmlFor="letter-email">Your email address</label>
              <input id="letter-email" className="formkit-input" name="email_address" type="email"
                autoComplete="email" placeholder="A place for your letters" required aria-describedby="letter-consent" />
            </div>
            <p className="fine" id="letter-consent">By subscribing, you agree to receive Letters to you from Moon Confessions by email. Confirm through the welcome email; unsubscribe whenever you need to. <a href="/privacy/">A note on privacy</a>.</p>
            <button type="submit" data-element="submit" className="letter-submit formkit-submit">
              <span>Send me the letters</span><MoonMark/>
            </button>
          </div>
          <p className="fine kit-credit"><a data-element="powered-by" href="https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic" target="_blank" rel="nofollow noopener">Built with Kit</a></p>
        </div>
      </form>
    </div>
  </section>
}

export function LettersConfirmed() {
  return <main id="main" className="letters-confirmed wrap">
    <span className="eyebrow">LETTERS TO YOU</span>
    <h1>You are allowed<br/> to <em>arrive slowly.</em></h1>
    <p>Your email address is confirmed. The next letter will find you here, about once a month. Until then, make yourself at home in the writing.</p>
    <a className="text-link" href="/read/before-you-read/">Find a place to begin <MoonMark/></a>
  </main>
}
