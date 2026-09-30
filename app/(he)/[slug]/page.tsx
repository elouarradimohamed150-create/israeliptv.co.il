import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
import { Clock, ArrowRight, CalendarDays, RefreshCw, ListChecks, ListTree } from 'lucide-react'
import { getAllPosts, getPostBySlug, readingTime, withHeadingIds, relatedPosts } from '@/lib/posts'
import { waTrial } from '@/lib/whatsapp'
import { site } from '@/lib/site'
import { graph, organization, website, ORG_ID, WEBSITE_ID } from '@/lib/schema'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import OfferPopup from '@/components/offer-popup'
import { Reveal } from '@/components/motion'

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
      images: post.featuredImage ? [{ url: post.featuredImage.src }] : ['/opengraph-image'],
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
  const { html: content, toc } = withHeadingIds(post.content.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/, ''))
  const updated = post.modified.slice(0, 10) !== post.date.slice(0, 10)
  const faq = post.faq ?? []

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
    ...(post.summary?.length ? { abstract: post.summary.join(' ') } : {}),
  }, ...(faq.length ? [{
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: 'he-IL',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }] : []), {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
      { '@type': 'ListItem', position: 2, name: 'בלוג', item: `${site.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  })

  const related = relatedPosts(post)

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <div className="absolute inset-0 bg-gradient-to-t from-background from-15% via-background/85 via-45% to-background/20" />
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
                {category && (
                  <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {category.name}
                  </span>
                )}
                <h1 className="text-3xl font-black leading-tight text-foreground md:text-5xl">{post.title}</h1>
              </div>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-3xl px-4 pb-6 pt-16 sm:px-6">
            {category && (
              <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {category.name}
              </span>
            )}
            <h1 className="text-3xl font-black leading-tight text-foreground md:text-5xl">{post.title}</h1>
          </div>
        )}
      </div>

      {/* ── Article body ── */}
      <main className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <nav aria-label="breadcrumb" className="mt-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Israel IPTV</Link>
          <span aria-hidden> › </span>
          <Link href="/blog" className="hover:text-primary">בלוג</Link>
        </nav>
        <div className="mb-8 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-primary" />
            פורסם: <time dateTime={post.date}>{format(new Date(post.date), 'd בMMMM yyyy', { locale: he })}</time>
          </span>
          {updated && (
            <span className="flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4 text-primary" />
              עודכן: <time dateTime={post.modified}>{format(new Date(post.modified), 'd בMMMM yyyy', { locale: he })}</time>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            {minutes} דק׳ קריאה
          </span>
        </div>

        {/* ── In brief (answer-first summary for readers and AI search) ── */}
        {post.summary && post.summary.length > 0 && (
          <section aria-labelledby="in-brief" className="mb-8 scroll-mt-24 rounded-2xl border border-primary/30 bg-primary/10 p-6">
            <h2 id="in-brief" className="mb-3 scroll-mt-24 flex items-center gap-2 text-lg font-bold text-foreground">
              <ListChecks className="h-5 w-5 text-primary" /> בקצרה
            </h2>
            <ul className="space-y-2 text-[0.97rem] leading-relaxed text-foreground/90">
              {post.summary.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Table of contents ── */}
        {toc.length > 2 && (
          <details className="group mb-10 rounded-2xl border border-border bg-muted/60 p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-bold text-foreground">
              <ListTree className="h-5 w-5 text-primary" />
              תוכן העניינים
              <span className="ms-auto text-sm font-normal text-muted-foreground group-open:hidden">הצגה</span>
              <span className="ms-auto hidden text-sm font-normal text-muted-foreground group-open:inline">הסתרה</span>
            </summary>
            <ol className="mt-4 list-decimal space-y-1.5 ps-6 text-sm text-muted-foreground marker:text-primary">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="hover:text-primary">{h.text}</a>
                </li>
              ))}
            </ol>
          </details>
        )}

        <div className="wp-content" dangerouslySetInnerHTML={{ __html: content }} />

        {/* ── FAQ (only when the article body doesn't already contain one) ── */}
        {faq.length > 0 && !post.faqInContent && (
          <section aria-labelledby="faq-title" className="mt-14 scroll-mt-24">
            <h2 id="faq-title" className="mb-5 scroll-mt-24 text-2xl font-extrabold">שאלות נפוצות</h2>
            <div className="space-y-3">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-muted/60 px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                    <h3 className="text-base">{f.q}</h3>
                    <span className="text-primary transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── Brand box ── */}
        <aside className="mt-16 rounded-2xl border border-border bg-muted p-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            המאמר נכתב על ידי צוות{' '}
            <Link href="/" className="font-semibold text-primary hover:underline">
              Israel IPTV
            </Link>{' '}
            – שירות IPTV לצופים בישראל עם {site.channels}+ ערוצים, תמיכה בעברית 24/7 והחזר כספי תוך{' '}
            {site.refundDays} ימים.{' '}
            <Link href="/about" className="text-primary hover:underline">
              עוד על Israel IPTV
            </Link>
          </p>
        </aside>

        {/* ── CTA ── */}
        <Reveal className="mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-secondary to-background">
          <div className="p-8 text-center sm:p-10">
            <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              רוצים לנסות?
            </span>
            <h3 className="mb-3 text-2xl font-black">
              מנוי ליום אחד ב-<span className="text-primary">₪13 בלבד</span>
            </h3>
            <p className="mx-auto mb-8 max-w-sm text-muted-foreground">
              בדקו את איכות השידור במכשיר שלכם לפני שאתם מתחייבים למנוי ארוך.
            </p>
            <Link
              href={waTrial()}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-glow shine inline-block rounded-xl bg-primary px-10 py-3.5 font-bold text-primary-foreground transition-all hover:brightness-110"
            >
              הזמינו עכשיו
            </Link>
          </div>
        </Reveal>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-bold">מאמרים נוספים</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="glass lift rounded-xl p-4 text-sm font-semibold leading-snug transition-colors hover:text-primary"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 border-t border-border pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה לבלוג
          </Link>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <OfferPopup />
    </div>
  )
}
