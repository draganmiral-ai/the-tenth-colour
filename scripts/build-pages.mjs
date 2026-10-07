import { mkdir, readFile, writeFile } from 'node:fs/promises'
const publishing=process.env.MC_PUBLISH==='1'
const shell=(await readFile('dist/index.html','utf8')).replace(/<meta name="robots" content="[^"]*"\s*\/?>/,`<meta name="robots" content="${publishing?'index,follow':'noindex,nofollow'}"/>`)
const src=await readFile('src/content/collection.ts','utf8')
const entries=JSON.parse(src.slice(src.indexOf('= [')+2).trim().replace(/;\s*$/,''))
const manuscript=await readFile('src/content/reflection.txt','utf8')
const journeys=JSON.parse(await readFile('src/content/journeys.json','utf8'))
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const before=entries.find(e=>e.slug==='before-you-read')
const entryHref=slug=>slug==='a-year-of-return'?'/reflection/':`/read/${slug}/`
const trustBody=`<h1>${esc(journeys.trust.title)}</h1><p>${esc(journeys.trust.deck)}</p>${journeys.trust.sections.map(s=>`<h2>${esc(s.title)}</h2>${s.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}`).join('')}<h2>The voice behind the words</h2>${before.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}`
const pages=[
 {path:'',title:'Moon Confessions',description:'A quieter place to return. Lived reflections for people exploring Islam, finding their way toward Allah, or learning how to live within faith.'},
 {path:'collection',title:'The Writing',description:'Essays, poems and small confessions. Begin wherever something feels familiar.'},
 {path:'the-quiet-return',title:'The Quiet Return Journal',description:'Thirty gentle reflections, small moments of learning, and space for your own words. An undated journal for new Muslims.',image:'/media/journal/cover.jpg',externalHref:'https://www.amazon.com/dp/B0HKDJK8BL'},
 {path:'films',title:'Quiet films',description:'Small films to sit with. Press play when you are ready.'},
 {...before,path:'about',description:journeys.trust.deck,body:trustBody},
 {path:'letters',title:'Letters to you',description:'A quieter corner of your inbox. Email subscriptions are not open yet.'},
 {path:'privacy',title:'Privacy',description:'Your quiet is yours.'},
 {path:'reflection',title:'A Year of Return',description:'365 days. On gratitude, accountability, and finding a place to return to.',paragraphs:manuscript.trim().split(/\n\s*\n/),image:'/media/return.jpg'},
 ...entries.map(e=>({...e,path:`read/${e.slug}`,description:e.slug==='before-you-read'?journeys.trust.deck:e.excerpt,...e.slug==='before-you-read'?{body:trustBody}:{}})),
 {path:'find-your-way',title:'What brings you here tonight?',description:'Begin with what feels close. You do not have to choose a label.',links:journeys.paths.map(p=>({href:`/tonight/${p.slug}/`,label:p.label})).concat(journeys.stages.map(p=>({href:`/journey/${p.slug}/`,label:p.label})))},
 {path:'from-instagram',title:'Come in',description:'If a sentence brought you here, stay with the thought a little longer.',links:journeys.arrivals.map(p=>({href:`/from-instagram/${p.slug}/`,label:p.label}))},
 ...[{base:'tonight',items:journeys.paths},{base:'journey',items:journeys.stages},{base:'worlds',items:journeys.worlds},{base:'from-instagram',items:journeys.arrivals}].flatMap(group=>group.items.map(p=>({path:`${group.base}/${p.slug}`,title:p.label,description:p.deck,paragraphs:p.intro,links:p.reading.map(r=>({href:entryHref(r.slug),label:r.slug==='a-year-of-return'?'A Year of Return':entries.find(e=>e.slug===r.slug).title,note:r.note}))})))
]
for(const p of pages){
 await mkdir(`dist/${p.path}`,{recursive:true})
 const title=p.title==='Moon Confessions'?'Moon Confessions | A quieter place to return':`${p.title} | Moon Confessions`
 const image=p.image||(!p.paragraphs?'/media/return.jpg':null)
 const url=`https://moonconfessions.com/${p.path==='about'?'read/before-you-read/':p.path?p.path+'/':''}`
 let html=shell.replace(/<title>.*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?>/,`<meta name="description" content="${esc(p.description)}"/>`)
 html=html.replace('</head>',`<link rel="canonical" href="${url}"/><meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(p.description)}"/><meta property="og:url" content="${url}"/><meta property="og:type" content="${p.paragraphs?'article':'website'}"/>${image?`<meta property="og:image" content="https://moonconfessions.com${image}"/>`:``}</head>`)
 const words=p.body||(p.paragraphs?`<h1>${esc(p.title)}</h1>${p.paragraphs.map(t=>`<p>${esc(t).replaceAll('\n','<br/>')}</p>`).join('')}`:`<h1>${esc(p.title)}</h1><p>${esc(p.description)}</p>`)
 const links=(p.links||[]).map(link=>`<p><a href="${esc(link.href)}">${esc(link.label)}</a>${link.note?` — ${esc(link.note)}`:''}</p>`).join('')
 html=html.replace(/<noscript>[\s\S]*?<\/noscript>/,`<noscript><article style="max-width:640px;margin:60px auto;padding:20px;font:20px/1.7 Georgia,serif">${words}${links}${p.externalHref?`<p><a href="${esc(p.externalHref)}">View on Amazon</a></p>`:``}<a href="/">Moon Confessions</a></article></noscript>`)
 await writeFile(`dist/${p.path}/index.html`,html)
}
await mkdir('dist/gateway',{recursive:true});await writeFile('dist/gateway/index.html',await readFile('dist/index.html','utf8'))
await writeFile('dist/404.html',shell.replace('content="index,follow"','content="noindex,follow"'))
if(!publishing){const original=await readFile('dist/original/index.html','utf8');await writeFile('dist/original/index.html',original.replace('</head>','<meta name="robots" content="noindex,nofollow"/></head>'))}
await writeFile('dist/robots.txt',publishing?'User-agent: *\nAllow: /\nSitemap: https://moonconfessions.com/sitemap.xml\n':'User-agent: *\nDisallow: /\n')
const paths=pages.filter(p=>p.path!=='about').map(p=>p.path).concat('original')
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>https://moonconfessions.com/${path?path+'/':''}</loc></url>`).join('')}</urlset>`)
console.log(`Prepared ${pages.length} static routes plus the preserved original experience; ${publishing?'publication build':'local review only, noindex'}.`)
