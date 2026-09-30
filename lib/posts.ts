import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'

// Blog posts imported from the old WordPress site (see scripts/import-wordpress.mjs).
// Add a new post by dropping another JSON file with the same shape into content/posts/.

export interface Post {
  id: number
  slug: string
  title: string
  date: string
  modified: string
  excerpt: string
  content: string
  featuredImage: { src: string; alt: string } | null
  categories: { name: string; slug: string }[]
  seoTitle?: string
  seoDescription?: string
  summary?: string[] // "בקצרה" key points shown at the top of the article
  faq?: { q: string; a: string }[]
  faqInContent?: boolean // the Q&A already appears in the article body
}

// Adds ids to <h2> headings (for the table of contents) and returns the list
export function withHeadingIds(html: string) {
  const toc: { id: string; text: string }[] = []
  const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/&[^;\s]+;/g, ' ').replace(/\s+/g, ' ').trim()
    if (!text) return `<h2${attrs}>${inner}</h2>`
    const id = `section-${toc.length + 1}`
    toc.push({ id, text })
    return `<h2${attrs.replace(/\sid="[^"]*"/, '')} id="${id}">${inner}</h2>`
  })
  return { html: out, toc }
}

// Related posts by shared title words (falls back to the newest)
export function relatedPosts(post: Post, count = 3): Post[] {
  const words = (t: string) =>
    new Set(t.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, ' ').split(/\s+/).filter((w) => w.length > 2 && w !== 'iptv'))
  const mine = words(post.title)
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: [...words(p.title)].filter((w) => mine.has(w)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.p)
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')) as Post)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

export function getPostBySlug(slug: string): Post | null {
  let decoded = slug
  try {
    decoded = decodeURIComponent(slug)
  } catch {}
  return getAllPosts().find((p) => p.slug === decoded) ?? null
}

// Strip HTML tags to get plain text
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&[^;\s]+;/g, ' ').replace(/\s+/g, ' ').trim()
}

// Estimate reading time (words / 200 wpm)
export function readingTime(html: string): number {
  const words = stripHtml(html).split(' ').length
  return Math.max(1, Math.round(words / 200))
}
