import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
import { Clock, ArrowRight, CalendarDays } from 'lucide-react'
import { getAllPosts, getPostBySlug, readingTime } from '@/lib/posts'
import { waTrial } from '@/lib/whatsapp'
import { site } from '@/lib/site'
import { graph, organization, website, ORG_ID, WEBSITE_ID } from '@/lib/schema'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

interface Props {
  params: Promise<{ slug: string }>
}

// Only the imported posts exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const description = post.seoDescription || post.excerpt.slice(0, 160)
  return {
    title: { absolute: post.seoTitle || `${post.title} | ${site.name}` },
    description,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      url: `/${post.slug}`,
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featuredImage ? [{ url: post.featuredImage.src }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const minutes = readingTime(post.content)
  const category = post.categories[0]
  // Many posts repeat the title as an <h1> at the top of the body
  const content = post.content.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/, '')

  const url = `${site.url}/${encodeURIComponent(post.slug)}`
  const articleJsonLd = graph(organization, website, {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.featuredImage ? `${site.url}${post.featuredImage.src}` : undefined,
    mainEntityOfPage: url,
    inLanguage: 'he-IL',
    isPartOf: { '@id': WEBSITE_ID },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  }, {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
      { '@type': 'ListItem', position: 2, name: 'בלוג', item: `${site.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  })

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-[#0B0F13] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      {/* ── Hero ── */}
      <div className="relative w-full pt-16">
        {post.featuredImage ? (
          <>
            <div className="relative h-[50vh] min-h-[340px] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage.src}
                alt={post.featuredImage.alt || post.title}
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F13] via-[#0B0F13]/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
                {category && (
                  <span className="mb-4 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    {category.name}
                  </span>
                )}
                <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">{post.title}</h1>
              </div>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-3xl px-4 pb-6 pt-16 sm:px-6">
            {category && (
              <span className="mb-4 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                {category.name}
              </span>
            )}
            <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">{post.title}</h1>
          </div>
        )}
      </div>

      {/* ── Article body ── */}
      <main className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <nav aria-label="breadcrumb" className="mt-6 text-sm text-[#94A3B8]">
          <Link href="/" className="hover:text-[#10B981]">Israel IPTV</Link>
          <span aria-hidden> › </span>
          <Link href="/blog" className="hover:text-[#10B981]">בלוג</Link>
        </nav>
        <div className="mb-8 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#1E293B] pb-6 text-sm text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-[#10B981]" />
            {format(new Date(post.date), 'd בMMMM yyyy', { locale: he })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#10B981]" />
            {minutes} דק׳ קריאה
          </span>
        </div>

        <div className="wp-content" dangerouslySetInnerHTML={{ __html: content }} />

        {/* ── Brand box ── */}
        <aside className="mt-16 rounded-2xl border border-[#1E293B] bg-[#151B23] p-6 text-sm leading-relaxed text-[#94A3B8]">
          <p>
            המאמר נכתב על ידי צוות{' '}
            <Link href="/" className="font-semibold text-[#10B981] hover:underline">
              Israel IPTV
            </Link>{' '}
            – שירות IPTV לצופים בישראל עם {site.channels}+ ערוצים, תמיכה בעברית 24/7 והחזר כספי תוך{' '}
            {site.refundDays} ימים.{' '}
            <Link href="/about" className="text-[#10B981] hover:underline">
              עוד על Israel IPTV
            </Link>
          </p>
        </aside>

        {/* ── CTA ── */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#10B981]/20 bg-gradient-to-br from-[#0d1f1a] to-[#0B0F13]">
          <div className="p-8 text-center sm:p-10">
            <span className="mb-3 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              רוצים לנסות?
            </span>
            <h3 className="mb-3 text-2xl font-black">
              מנוי ליום אחד ב-<span className="text-[#10B981]">₪13 בלבד</span>
            </h3>
            <p className="mx-auto mb-8 max-w-sm text-[#94A3B8]">
              בדקו את איכות השידור במכשיר שלכם לפני שאתם מתחייבים למנוי ארוך.
            </p>
            <Link
              href={waTrial()}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-glow inline-block rounded-xl bg-[#10B981] px-10 py-3.5 font-bold text-[#0B0F13] transition-all hover:brightness-110"
            >
              הזמינו בוואטסאפ
            </Link>
          </div>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-bold">מאמרים נוספים</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="glass rounded-xl p-4 text-sm font-semibold leading-snug transition-colors hover:text-[#10B981]"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 border-t border-[#1E293B] pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#10B981]"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה לבלוג
          </Link>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
