import { lazy, Suspense } from 'react'
import { asset } from '../config'
import { Gateway } from './Gateway'
import { Reflection } from './Reflection'

const OriginalExperience = lazy(() => import('../App'))

export function ExperienceRouter() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const relativePath = decodeURI(window.location.pathname).slice(base.length).replace(/^\/+|\/+$/g, '')
  if (relativePath === '' || relativePath === 'index.html' || relativePath === 'gateway' || relativePath === 'gateway/index.html') return <Gateway />
  if (relativePath === 'reflection' || relativePath === 'reflection/index.html') return <Reflection />
  if (relativePath === 'original' || relativePath === 'original/index.html') {
    return <Suspense fallback={<main className="literary-loading" aria-busy="true">The Tenth Colour</main>}><OriginalExperience /></Suspense>
  }
  return <main className="literary literary-not-found"><h1>A page not yet written.</h1><a href={asset('gateway/')}>Return to The Tenth Colour</a></main>
}
