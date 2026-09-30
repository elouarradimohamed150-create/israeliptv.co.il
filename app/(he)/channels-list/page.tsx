import type { Metadata } from 'next'
import ClientChannelSearch from './client-channel-search'
import { getChannels, searchChannels } from '@/lib/channels'
import { site } from '@/lib/site'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export const metadata: Metadata = {
  title: 'רשימת ערוצים מלאה',
  description: `חפשו בכל ${site.channels}+ הערוצים של ${site.name}: ערוצים ישראליים, ספורט, סרטים, ילדים וחדשות מכל העולם.`,
  alternates: { canonical: '/channels-list' },
}

export default function ChannelsPage() {
  const total = getChannels().length
  const first = searchChannels('', 0, 60)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-28">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-black tracking-tight text-foreground md:text-6xl">
            רשימת הערוצים של <span className="text-primary">{site.name}</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground">
            {total.toLocaleString('en-US')} ערוצים בשידור חי, מסודרים לפי מדינות וקטגוריות. חפשו לפי שם ערוץ או
            קטגוריה – למשל <span className="font-bold text-foreground">Israel</span>,{' '}
            <span className="font-bold text-foreground">Sport</span> או{' '}
            <span className="font-bold text-foreground">4K</span>.
          </p>
        </div>

        <ClientChannelSearch initial={first} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
