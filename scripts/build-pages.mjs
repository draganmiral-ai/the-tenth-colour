import { mkdir, readFile, writeFile } from 'node:fs/promises'
const shell=await readFile('dist/index.html','utf8')
const src=await readFile('src/content/collection.ts','utf8')
const entries=JSON.parse(src.slice(src.indexOf('= [')+2).trim().replace(/;\s*$/,''))
const manuscript=await readFile('src/content/reflection.txt','utf8')
const pages=[{path:'',title:'Moon Confessions',description:'Every lesson was lived before it was written. Faith, healing, love and belonging.'},{path:'collection',title:'The Writing',description:'Essays, poems and small confessions. Begin wherever something feels familiar.'},{path:'the-quiet-return',title:'The Quiet Return Journal',description:'Thirty gentle reflections, small moments of learning, and space for your own words. An undated journal for new Muslims.',image:'/media/journal/cover.jpg',externalHref:'https://www.amazon.com/dp/B0HKDJK8BL'},{path:'films',title:'Quiet films',description:'Small films to sit with. Press play when you are ready.'},{...entries.find(e=>e.slug==='before-you-read'),path:'about',description:entries.find(e=>e.slug==='before-you-read').excerpt},{path:'letters',title:'Letters to you',description:'A quieter corner of your inbox.'},{path:'privacy',title:'Privacy',description:'Your quiet is yours.'},{path:'reflection',title:'A Year of Return',description:'365 days. On gratitude, accountability, and finding a place to return to.',paragraphs:manuscript.trim().split(/\n\s*\n/),image:'/media/return.jpg'},...entries.map(e=>({...e,path:`read/${e.slug}`,description:e.excerpt}))]
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
for(const p of pages){
 await mkdir(`dist/${p.path}`,{recursive:true})
 const title=p.title==='Moon Confessions'?'Moon Confessions | Faith, healing, love and belonging':`${p.title} | Moon Confessions`
 const image=p.image||(!p.paragraphs?'/media/return.jpg':null)
 const url=`https://moonconfessions.com/${p.path==='about'?'read/before-you-read/':p.path?p.path+'/':''}`
 let html=shell.replace(/<title>.*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?>/,`<meta name="description" content="${esc(p.description)}"/>`)
 html=html.replace('</head>',`<link rel="canonical" href="${url}"/><meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(p.description)}"/><meta property="og:url" content="${url}"/><meta property="og:type" content="${p.paragraphs?'article':'website'}"/>${image?`<meta property="og:image" content="https://moonconfessions.com${image}"/>`:``}</head>`)
 const words=p.paragraphs?`<h1>${esc(p.title)}</h1>${p.paragraphs.map(t=>`<p>${esc(t).replaceAll('\n','<br/>')}</p>`).join('')}`:`<h1>${esc(p.title)}</h1><p>${esc(p.description)}</p>`
 html=html.replace(/<noscript>[\s\S]*?<\/noscript>/,`<noscript><article style="max-width:640px;margin:60px auto;padding:20px;font:20px/1.7 Georgia,serif">${words}${p.externalHref?`<p><a href="${esc(p.externalHref)}">View on Amazon</a></p>`:``}<a href="/">Moon Confessions</a></article></noscript>`)
 await writeFile(`dist/${p.path}/index.html`,html)
}
await mkdir('dist/gateway',{recursive:true});await writeFile('dist/gateway/index.html',await readFile('dist/index.html','utf8'))
await writeFile('dist/404.html',shell.replace('content="index,follow"','content="noindex,follow"'))
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: https://moonconfessions.com/sitemap.xml\n')
const paths=pages.filter(p=>p.path!=='about').map(p=>p.path).concat('original')
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>https://moonconfessions.com/${path?path+'/':''}</loc></url>`).join('')}</urlset>`)
console.log(`Prepared ${pages.length} static routes; plus the preserved original experience; ready for publication.`)
