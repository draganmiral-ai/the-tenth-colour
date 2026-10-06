import { mkdir, readFile, writeFile } from 'node:fs/promises'

// Real HTML entry points make GitHub Pages deep links return 200, rather than 404.
const shell = await readFile('dist/index.html', 'utf8')
await writeFile('dist/404.html', shell)
for (const path of ['gateway', 'reflection']) {
  await mkdir(`dist/${path}`, { recursive: true })
  const title = path === 'reflection' ? 'A Year of Return' : 'The Tenth Colour | Collected works'
  const description = path === 'reflection' ? 'A Year of Return — 6 October 2026.' : 'A collection of personal stories, essays and experiences.'
  const url = `https://draganmiral-ai.github.io/the-tenth-colour/${path}/`
  let page = shell.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*("\s*\/?>)/g, `$1${description}$2`)
    .replace(/(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*("\s*\/?>)/g, `$1${title}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
  if (path === 'reflection') {
    // Shared essay links should identify the manuscript, not the storybook artwork.
    page = page.replace(/<meta\s+(?:property="og:image"|name="twitter:image")\s+content="[^"]*"\s*\/?>/g, '')
      .replace('content="summary_large_image"', 'content="summary"')
      .replace(/<noscript>[\s\S]*?<\/noscript>/, '<noscript><p>Please enable JavaScript to read A Year of Return.</p></noscript>')
  }
  await writeFile(`dist/${path}/index.html`, page)
}
