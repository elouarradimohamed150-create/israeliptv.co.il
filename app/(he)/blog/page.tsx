import type { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
import { Clock, Rss } from 'lucide-react'
import { getAllPosts, readingTime, type Post } from '@/lib/posts'
import { site } from '@/lib/site'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

const PER_PAGE = 12

interface Props {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = Number((await searchParams).page) || 1
  return {
    title: page > 1 ? `בלוג – עמוד ${page} | ${site.name}` : `בלוג ומדריכי IPTV | ${site.name}`,
    description: 'מדריכי התקנה, השוואות ונגנים מומלצים – כל מה שצריך לדעת על IPTV בישראל, במקום אחד.',
    alternates: { canonical: page > 1 ? `/blog?page=${page}` : '/blog' },
  }
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="glass group flex flex-col overflow-hidden rounded-2xl transition-all hover:border-primary/30"
    >
      {post.featuredImage && (
        <div className="relative h-44 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featuredImage.src}
            alt={post.featuredImage.alt || post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="mb-3 flex-1 text-lg font-bold leading-snug transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mb-5 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{format(new Date(post.date), 'd בMMM yyyy', { locale: he })}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {readingTime(post.content)} דק׳
          </span>
        </div>
      </div>
    </Link>
  )
}

export default async function BlogPage({ searchParams }: Props) {
  const posts = getAllPosts()
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
  const page = Math.min(Math.max(1, Number((await searchParams).page) || 1), totalPages)
  const pagePosts = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-bold text-primary">
            <Rss className="h-3 w-3" /> {posts.length} מאמרים
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">מרכז הידע של {site.name}</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            מדריכי התקנה צעד אחר צעד, השוואת נגנים ותשובות לשאלות שהלקוחות שלנו שואלים הכי הרבה.
          </p>
        </div>

        {pagePosts.length === 0 ? (
          <p className="text-center text-muted-foreground">אין מאמרים כרגע. חזרו בקרוב.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="עמודים" className="mt-14 flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={n === 1 ? '/blog' : `/blog?page=${n}`}
                aria-current={n === page ? 'page' : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  n === page ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                {n}
              </Link>
            ))}
          </nav>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
