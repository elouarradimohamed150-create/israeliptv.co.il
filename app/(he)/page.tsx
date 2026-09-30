import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import TrustMetrics from '@/components/trust-metrics'
import KeyFacts from '@/components/key-facts'
import Pricing from '@/components/pricing'
import InstallationTabs from '@/components/installation-tabs'
import ComparisonTable from '@/components/comparison-table'
import ResellerCTA from '@/components/reseller-cta'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { site } from '@/lib/site'
import { graph, organization, website, service, faqPage, homeLanguages, WEBSITE_ID, SERVICE_ID } from '@/lib/schema'

export const metadata = {
  alternates: { canonical: '/', languages: homeLanguages },
  openGraph: { url: '/' },
}

const jsonLd = graph(
  organization,
  website,
  {
    '@type': 'WebPage',
    '@id': `${site.url}/#webpage`,
    url: site.url,
    name: `${site.name} – מנוי IPTV לערוצים ישראליים, ספורט וסרטים ב-4K`,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SERVICE_ID },
    inLanguage: 'he-IL',
    dateModified: site.lastUpdated,
  },
  service,
  faqPage,
)

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <Hero />
      <KeyFacts />
      <TrustMetrics />
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
