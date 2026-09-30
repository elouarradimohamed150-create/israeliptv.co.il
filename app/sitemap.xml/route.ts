import { getAllPosts } from '@/lib/posts'
import { site } from '@/lib/site'

// Sitemap for search engines (plain XML is what Google expects).
// People get the readable version at /site-map.
export const dynamic = 'force-static'

type Entry = {
  url: string
  lastModified?: string
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  priority: number
  languages?: Record<string, string>
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const iso = (d: string) => new Date(d).toISOString()

export function GET() {
  const posts = getAllPosts()
  const latest = posts.reduce((m, p) => (p.modified > m ? p.modified : m), site.lastUpdated)
  const homeLangs = { 'he-IL': site.url, en: `${site.url}/en` }

  const entries: Entry[] = [
    { url: site.url, lastModified: iso(site.lastUpdated), changeFrequency: 'weekly', priority: 1, languages: homeLangs },
    { url: `${site.url}/en`, lastModified: iso(site.lastUpdated), changeFrequency: 'weekly', priority: 0.9, languages: homeLangs },
    { url: `${site.url}/about`, lastModified: iso(site.lastUpdated), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/blog`, lastModified: iso(latest), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/site-map`, lastModified: iso(latest), changeFrequency: 'weekly', priority: 0.3 },
    ...posts.map((p) => ({
      url: `${site.url}/${encodeURIComponent(p.slug)}`,
      lastModified: iso(p.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['terms', 'refund-policy', 'privacy-policy'].map((path) => ({
      url: `${site.url}/${path}`,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    })),
  ]

  const body = entries
    .map((e) =>
      [
        '<url>',
        `<loc>${esc(e.url)}</loc>`,
        ...Object.entries(e.languages ?? {}).map(
          ([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${esc(href)}" />`,
        ),
        e.lastModified ? `<lastmod>${e.lastModified}</lastmod>` : '',
        `<changefreq>${e.changeFrequency}</changefreq>`,
        `<priority>${e.priority}</priority>`,
        '</url>',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
