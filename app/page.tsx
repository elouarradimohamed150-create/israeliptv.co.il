import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import TrustMetrics from '@/components/trust-metrics'
import ChannelSearch from '@/components/channel-search'
import Pricing from '@/components/pricing'
import InstallationTabs from '@/components/installation-tabs'
import ComparisonTable from '@/components/comparison-table'
import ResellerCTA from '@/components/reseller-cta'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { site, plans } from '@/lib/site'
import { faqs } from '@/lib/faq'

export const metadata = {
  alternates: { canonical: '/' },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${site.whatsappNumber}`,
      contactType: 'customer service',
      availableLanguage: ['Hebrew', 'English', 'Arabic'],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: 'he-IL',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `מנוי ${site.name}`,
    description: `${site.channels}+ ערוצים בשידור חי ו-${site.vod}+ סרטים וסדרות באיכות עד 4K.`,
    brand: { '@type': 'Brand', name: site.name },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'ILS',
      lowPrice: Math.min(...plans.map((p) => p.prices[1])),
      highPrice: Math.max(...plans.map((p) => p.prices[3])),
      offerCount: plans.length * 3,
      availability: 'https://schema.org/InStock',
    },
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <Hero />
      <TrustMetrics />
      <ChannelSearch />
      <Pricing />
      <InstallationTabs />
      <ComparisonTable />
      <ResellerCTA />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
