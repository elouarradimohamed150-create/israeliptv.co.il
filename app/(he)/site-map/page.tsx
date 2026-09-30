import type { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
import { getAllPosts } from '@/lib/posts'
import { site } from '@/lib/site'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export const metadata: Metadata = {
  title: 'מפת האתר',
  description: `כל הדפים והמדריכים של ${site.name} במקום אחד: מחירים, התקנה, שאלות נפוצות ו-${getAllPosts().length} מאמרים על IPTV.`,
  alternates: { canonical: '/site-map' },
}

const pages = [
  { href: '/', label: 'דף הבית – Israel IPTV' },
  { href: '/#pricing', label: 'מחירים וחבילות' },
  { href: '/#installation', label: 'מדריך התקנה' },
  { href: '/about', label: 'אודות Israel IPTV' },
  { href: '/blog', label: 'בלוג ומדריכים' },
  { href: '/en', label: 'Israel IPTV in English' },
  { href: '/terms', label: 'תנאי שימוש' },
  { href: '/refund-policy', label: 'מדיניות החזרים וביטולים' },
  { href: '/privacy-policy', label: 'מדיניות פרטיות' },
]

// Human-readable site map (search engines use /sitemap.xml)
export default function SiteMapPage() {
  const posts = [...getAllPosts()].sort((a, b) => a.title.localeCompare(b.title, 'he'))
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6">
        <h1 className="text-4xl font-black">
          מפת האתר של <span dir="ltr" className="text-primary">Israel IPTV</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          כל הדפים ו-{posts.length} המדריכים באתר. גרסה למנועי חיפוש:{' '}
          <a href="/sitemap.xml" className="text-primary hover:underline" dir="ltr">sitemap.xml</a>
        </p>

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold">דפים ראשיים</h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="glass block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold">מדריכים ומאמרים ({posts.length})</h2>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {posts.map((p) => (
              <li key={p.slug} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                <Link href={`/${p.slug}`} className="text-sm font-medium hover:text-primary">
                  {p.title}
                </Link>
                <span className="shrink-0 text-xs text-muted-foreground">
                  עודכן {format(new Date(p.modified), 'd בMMM yyyy', { locale: he })}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
