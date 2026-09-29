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
