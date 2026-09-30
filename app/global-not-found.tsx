import type { Metadata } from 'next'
import Link from 'next/link'
import { Heebo } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MotionProvider } from '@/components/motion'
import './globals.css'

const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-heebo' })

export const metadata: Metadata = {
  title: 'הדף לא נמצא | Israel IPTV',
  robots: { index: false },
}

// Site-wide 404 (the site has separate Hebrew and English root layouts)
export default function GlobalNotFound() {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans antialiased text-right">
        <MotionProvider>
          <Navbar />
          <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
            <p className="text-7xl font-extrabold text-primary">404</p>
            <h1 className="mt-3 text-2xl font-bold">הדף שחיפשתם לא נמצא</h1>
            <p className="mt-2 text-muted-foreground" lang="en" dir="ltr">
              This page could not be found.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="neon-glow shine rounded-xl bg-primary px-7 py-3 font-bold text-primary-foreground">
                לדף הבית
              </Link>
              <Link href="/blog" className="rounded-xl border border-border px-7 py-3 font-bold hover:border-primary/50">
                לבלוג
              </Link>
              <Link href="/en" className="rounded-xl border border-border px-7 py-3 font-bold hover:border-primary/50" lang="en">
                English
              </Link>
            </div>
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
