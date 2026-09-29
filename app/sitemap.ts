import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latest = posts[0] ? new Date(posts[0].modified) : new Date()

  return [
    { url: site.url, lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/channels-list`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/blog`, lastModified: latest, changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((p) => ({
      url: `${site.url}/${encodeURIComponent(p.slug)}`,
      lastModified: new Date(p.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['terms', 'refund-policy', 'privacy-policy'].map((path) => ({
      url: `${site.url}/${path}`,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    })),
  ]
}
