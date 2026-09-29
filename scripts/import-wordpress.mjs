// One-off importer: pulls every post from the old WordPress site into content/posts/*.json
// and downloads the images into public/blog-media/. Safe to re-run.
//
//   node scripts/import-wordpress.mjs

import fs from 'node:fs/promises'
import path from 'node:path'

const WP = 'https://israeliptv.co.il'
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const POSTS_DIR = path.join(ROOT, 'content', 'posts')
const MEDIA_DIR = path.join(ROOT, 'public', 'blog-media')
const UA = { 'User-Agent': 'Mozilla/5.0 (content migration)' }

const downloaded = new Map() // remote url -> local url

async function get(url, as = 'json') {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(encodeURI(decodeURI(url)), { headers: UA })
      if (res.status === 404) return null
      if (!res.ok) throw new Error(`${res.status} ${url}`)
      if (as === 'json') return res.json()
      if (as === 'text') return res.text()
      return Buffer.from(await res.arrayBuffer())
    } catch (e) {
      if (attempt === 3) throw e
      await new Promise((r) => setTimeout(r, 1000 * attempt))
    }
  }
}

const decode = (s) => {
  try { return decodeURIComponent(s) } catch { return s }
}

const decodeEntities = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')

// Download an uploads image, preferring the full-size original over a "-300x167" thumbnail.
async function localImage(remote) {
  const url = decode(remote)
  if (!url.includes('/wp-content/uploads/')) return remote
  if (downloaded.has(url)) return downloaded.get(url)

  const original = url.replace(/-\d+x\d+(\.\w+)$/, '$1')
  for (const candidate of [original, url]) {
    const rel = candidate.split('/wp-content/uploads/')[1]
    try {
      await fs.access(path.join(MEDIA_DIR, rel))
      const local = '/blog-media/' + rel.split('/').map(encodeURIComponent).join('/')
      downloaded.set(url, local)
      return local
    } catch {}
  }
  let buf = original !== url ? await get(original, 'buffer').catch(() => null) : null
  let chosen = buf ? original : url
  if (!buf) buf = await get(url, 'buffer').catch(() => null)
  if (!buf) {
    console.warn('  ! image missing', url)
    downloaded.set(url, remote)
    return remote
  }

  const rel = chosen.split('/wp-content/uploads/')[1] // e.g. 2026/05/foo.jpeg
  await fs.mkdir(path.join(MEDIA_DIR, path.dirname(rel)), { recursive: true })
  await fs.writeFile(path.join(MEDIA_DIR, rel), buf)
  const local = '/blog-media/' + rel.split('/').map(encodeURIComponent).join('/')
  downloaded.set(url, local)
  return local
}

// Old WordPress URLs -> new site URLs
// (lavender-viper-… is the old Hostinger staging domain, still linked from many posts)
const OWN_HOSTS = /^https?:\/\/(www\.)?(israeliptv\.co\.il|lavender-viper-950953\.hostingersite\.com)/i

function rewriteLink(href) {
  // Unwrap "https://www.google.com/search?q=https://our-site/..." links pasted from AI chats
  const wrapped = href.match(/^https?:\/\/www\.google\.com\/search\?q=(.+)$/)
  if (wrapped && OWN_HOSTS.test(decode(wrapped[1]))) href = decode(wrapped[1])
  if (!OWN_HOSTS.test(href)) return href
  const u = new URL(href)
  const p = decode(u.pathname).replace(/\/+$/, '')
  if (p === '' || p === '/home') return '/' + u.hash
  if (/^\/(product|shop|cart|checkout|my-account)(\/|$)/.test(p)) return '/#pricing'
  if (p.startsWith('/wp-content/')) return href
  return p + u.hash
}

async function cleanContent(html) {
  let out = html
    // Chat-export noise and responsive image attributes we don't need
    .replace(/\s(data-path-to-node|data-index-in-node|fetchpriority|decoding)="[^"]*"/g, '')
    .replace(/\s(srcset|sizes)="[^"]*"/g, '')
    .replace(/\sclass="wp-image-\d+ ?/g, ' class="')
    .replace(/\sclass=""/g, '')
    // WordPress post embeds (blockquote + iframe) -> plain link
    .replace(/<blockquote class="wp-embedded-content"[^>]*>([\s\S]*?)<\/blockquote>\s*<iframe[^>]*><\/iframe>/g, '<p>$1</p>')
    .replace(/<iframe[^>]*wp-embedded-content[^>]*>\s*<\/iframe>/g, '')
    .replace(/<p>(\s|&nbsp;)*<\/p>/g, '')

  const srcs = [...out.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1])
  for (const src of new Set(srcs)) {
    const local = await localImage(src)
    out = out.split(`src="${src}"`).join(`src="${local}" loading="lazy"`)
  }

  out = out.replace(/href="([^"]+)"/g, (_, href) => `href="${rewriteLink(href)}"`)
  return out.trim()
}

async function seoMeta(link) {
  const html = await get(link, 'text').catch(() => null)
  if (!html) return {}
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
  return {
    seoTitle: title ? decodeEntities(title).trim() : undefined,
    seoDescription: desc ? decodeEntities(desc).trim() : undefined,
  }
}

async function main() {
  await fs.mkdir(POSTS_DIR, { recursive: true })
  const posts = []
  for (let page = 1; ; page++) {
    const batch = await get(`${WP}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=wp:featuredmedia,wp:term`)
    if (!batch || batch.length === 0) break
    posts.push(...batch)
    if (batch.length < 100) break
  }
  console.log(`Found ${posts.length} posts`)

  for (const [i, p] of posts.entries()) {
    const slug = decode(p.slug)
    console.log(`[${i + 1}/${posts.length}] ${slug}`)

    const media = p._embedded?.['wp:featuredmedia']?.[0]
    const featuredImage = media?.source_url
      ? { src: await localImage(media.source_url), alt: decodeEntities(media.alt_text || '') }
      : null

    const categories = (p._embedded?.['wp:term'] ?? [])
      .flat()
      .filter((t) => t.taxonomy === 'category')
      .map((t) => ({ name: decodeEntities(t.name), slug: decode(t.slug) }))

    const post = {
      id: p.id,
      slug,
      title: decodeEntities(p.title.rendered),
      date: p.date,
      modified: p.modified,
      excerpt: decodeEntities(p.excerpt.rendered.replace(/<[^>]+>/g, '')).replace(/\s*\[&hellip;\]|\s*\[…\]/g, '…').trim(),
      content: await cleanContent(p.content.rendered),
      featuredImage,
      categories,
      ...(await seoMeta(p.link)),
    }
    await fs.writeFile(path.join(POSTS_DIR, `${p.id}.json`), JSON.stringify(post, null, 2) + '\n')
  }
  console.log(`Done. ${downloaded.size} images.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
