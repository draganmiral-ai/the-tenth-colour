import content from './content/journeys.json'
import { MoonMark } from './components/MoonMark'
import type { Entry } from './content/collection'

export type Selection = {slug:string;label:string;deck:string;intro:string[];reading:{slug:string;note:string}[]}
export const stages = content.stages
export const pathways = content.paths
export const worlds = content.worlds
export const arrivals = content.arrivals
export const trust = content.trust
export const entryHref = (entry:Entry) => entry.slug === 'a-year-of-return' ? '/reflection/' : `/read/${entry.slug}/`
const groups = [{base:'tonight',items:pathways},{base:'journey',items:stages},{base:'worlds',items:worlds},{base:'from-instagram',items:arrivals}]
export function selectionAt(path:string){
  const [base,slug] = path.replace(/^\/+|\/+$/g,'').split('/')
  const group = groups.find(group=>group.base===base)
  const selection = group?.items.find(item=>item.slug===slug)
  return selection ? {selection,base,key:`${base}/${slug}`} : undefined
}
export function readingContext(slug:string){
  const from = new URLSearchParams(location.search).get('from')
  const context = from ? selectionAt(from) : undefined
  return context?.selection.reading.some(item=>item.slug===slug) ? context : undefined
}
function readingMinutes(entry:Entry){const extra=entry.slug==='before-you-read'?trust.sections.flatMap(s=>s.paragraphs).join(' '):'';return Math.max(1,Math.ceil((entry.paragraphs.join(' ')+' '+extra).trim().split(/\s+/).length/190))}
export function StageLinks(){return <nav className="stage-links" aria-label="Where you are in the journey">{stages.map(stage=><a className="moon-row" key={stage.slug} href={`/journey/${stage.slug}/`}>{stage.label}<MoonMark/></a>)}</nav>}
export function Tonight({standalone=false}:{standalone?:boolean}){
  return <section className={`tonight ${standalone?'tonight-full wrap':''}`} id="tonight" aria-labelledby="tonight-heading">
    <div className="tonight-heading"><span className="eyebrow">COME AS YOU ARE</span>{standalone?<h1 id="tonight-heading">What brings you<br/> here <em>tonight?</em></h1>:<h2 id="tonight-heading">What brings you<br/> here <em>tonight?</em></h2>}<p>Begin with what feels close. You do not have to choose a label.</p></div>
    <div><nav className="tonight-paths" aria-label="Find writing for how you feel">{pathways.map(path=><a className="moon-row" key={path.slug} href={`/tonight/${path.slug}/`}>{path.label}<MoonMark/></a>)}</nav><p className="stage-invitation">Or find company for this part of your journey.</p><StageLinks/><p className="stage-footnote">Places to begin, without an order to follow.</p></div>
  </section>
}
export function PathPage({selection,base,library}:{selection:Selection;base:string;library:Entry[]}){
  const key=`${base}/${selection.slug}`
  return <main id="main" className="path-page">
    <header className="path-opening wrap"><a className="back-link" href={base==='from-instagram'?'/from-instagram/':'/find-your-way/'}>{base==='from-instagram'?'From Instagram':'Find a place to begin'} <MoonMark/></a><span className="eyebrow">{base==='journey'?'WHERE YOU ARE':base==='worlds'?'WORDS TO RETURN TO':base==='from-instagram'?'COME IN':'WHAT BRINGS YOU HERE TONIGHT?'}</span><h1>{selection.label}</h1><p className="path-deck">{selection.deck}</p><div className="path-introduction">{selection.intro.map(p=><p key={p}>{p}</p>)}</div></header>
    <section className="path-reading wrap" aria-labelledby="path-reading-heading"><div className="path-reading-heading"><h2 id="path-reading-heading">A place to begin.</h2><p>Read one. Stay with another. Leave the rest for later.</p></div><div className="path-reading-list">{selection.reading.map(item=>{
      const entry=library.find(e=>e.slug===item.slug)!
      return <a className="path-piece moon-row" key={item.slug} href={`${entryHref(entry)}?from=${encodeURIComponent(key)}`} aria-labelledby={`piece-${item.slug}`} aria-describedby={`note-${item.slug}`}>{entry.image&&<img src={entry.image} alt="" loading="lazy"/>}<div><span className="eyebrow">{entry.format} · {readingMinutes(entry)} MIN READ</span><h3 id={`piece-${item.slug}`}>{entry.title}</h3><p id={`note-${item.slug}`}>{item.note}</p></div><MoonMark/></a>
    })}</div></section>
    <div className="path-afterword wrap">{base==='journey'&&<a className="text-link" href={`/collection/?stage=${selection.slug}`}>Explore more writing for this part of the journey <MoonMark/></a>}<p>There is room for you to read differently.</p><a className="text-link" href="/find-your-way/">Find another place to begin <MoonMark/></a><a className="text-link" href="/collection/">Browse all writing <MoonMark/></a></div>
  </main>
}
export function BackToPath({entry}:{entry:Entry}){
  const context=readingContext(entry.slug)
  return context?<a className="reader-path-context" href={`/${context.key}/`}>Reading with: {context.selection.label} <MoonMark/></a>:null
}
export function ContinuePath({entry,library}:{entry:Entry;library:Entry[]}){
  const context=readingContext(entry.slug)
  if(!context)return null
  const index=context.selection.reading.findIndex(item=>item.slug===entry.slug)
  const next=context.selection.reading[index+1]
  const nextEntry=next?library.find(e=>e.slug===next.slug):undefined
  return <aside className="continue-path wrap" aria-label="Continue your reading path"><span className="eyebrow">{context.selection.label}</span>{nextEntry?<><h2>A little further, if you wish.</h2><a className="text-link" href={`${entryHref(nextEntry)}?from=${encodeURIComponent(context.key)}`}>{nextEntry.title} <MoonMark/></a><p>{next.note}</p></>:<><h2>You can leave it here.</h2><p>There is no next step you have to take tonight.</p></>}<a className="text-link" href={`/${context.key}/`}>Return to this selection <MoonMark/></a></aside>
}
export function BeforeYouRead({entry,library}:{entry:Entry;library:Entry[]}){
  return <main id="main" className="trust-page"><header className="trust-opening wrap"><BackToPath entry={entry}/><span className="eyebrow">BEFORE YOU READ</span><h1>You are welcome here<br/> before you have everything<br/> <em>figured out.</em></h1><p>Every lesson was lived before it was written.</p></header><div className="trust-body wrap"><div className="trust-principles">{trust.sections.map(section=><section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}</div><article className="trust-original" aria-labelledby="original-introduction-heading"><span className="eyebrow">THE VOICE BEHIND THE WORDS</span><h2 id="original-introduction-heading">Still inside the journey.</h2>{entry.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</article></div><ContinuePath entry={entry} library={library}/><div className="trust-invitation wrap"><a className="text-link" href="/find-your-way/">Find a place to begin <MoonMark/></a><a className="text-link" href="/collection/">Explore the writing <MoonMark/></a></div></main>
}
export function InstagramArrival(){return <main id="main" className="instagram-arrival wrap"><header className="page-heading"><span className="eyebrow">FROM INSTAGRAM / COME IN</span><h1>If a sentence<br/> brought you <em>here.</em></h1><p>Stay with the thought a little longer.</p></header><div className="arrival-paths">{arrivals.map(arrival=><a className="moon-row" key={arrival.slug} href={`/from-instagram/${arrival.slug}/`} aria-labelledby={`arrival-${arrival.slug}`}><div><h2 id={`arrival-${arrival.slug}`}>{arrival.label}</h2><p>{arrival.deck}</p></div><MoonMark/></a>)}</div><a className="text-link" href="/find-your-way/">Something else brought me here <MoonMark/></a></main>}
