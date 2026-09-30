import type { Metadata, Viewport } from 'next'
import { Heebo, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { site } from '@/lib/site'
import '../globals.css'

const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-heebo' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const description = `${site.name} – טלוויזיה ישראלית ובינלאומית דרך האינטרנט: ${site.channels}+ ערוצים, ${site.vod}+ סרטים וסדרות, איכות 4K ותמיכה בעברית. מנוי מ-₪55 לחודש, ללא התחייבות.`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – מנוי IPTV בישראל | ערוצים ישראליים, ספורט וסרטים ב-4K`,
    template: `%s | ${site.name}`,
  },
  description,
  openGraph: {
    description,
    type: 'website',
    locale: 'he_IL',
    siteName: site.name,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0038B8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased text-right">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
