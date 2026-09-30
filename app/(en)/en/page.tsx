import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import KeyFacts from '@/components/key-facts'
import TrustMetrics from '@/components/trust-metrics'
import Pricing from '@/components/pricing'
import InstallationTabs from '@/components/installation-tabs'
import ComparisonTable from '@/components/comparison-table'
import ResellerCTA from '@/components/reseller-cta'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { site } from '@/lib/site'
import { graph, organization, website, service, faqPageFor, homeLanguages, WEBSITE_ID, SERVICE_ID } from '@/lib/schema'

const title = 'Israel IPTV – IPTV Subscription for Israeli TV, Sports & Movies in 4K'
const description = `Israel IPTV brings Israeli and international TV over the internet: ${site.channels}+ live Israeli and international channels, ${site.vod}+ movies and series, 4K quality. From ₪55/month, no contract.`

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/en', languages: homeLanguages },
  openGraph: {
    title,
    description,
    url: '/en',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['he_IL'],
    siteName: site.name,
    images: ['/opengraph-image'],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
}

const jsonLd = graph(
  organization,
  website,
  {
    '@type': 'WebPage',
    '@id': `${site.url}/en#webpage`,
    url: `${site.url}/en`,
    name: title,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SERVICE_ID },
    inLanguage: 'en',
    dateModified: site.lastUpdated,
  },
  service,
  faqPageFor('en'),
)

export default function EnglishHome() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar locale="en" />
      <Hero locale="en" />
      <KeyFacts locale="en" />
      <TrustMetrics locale="en" />
      <Pricing locale="en" />
      <InstallationTabs locale="en" />
      <ComparisonTable locale="en" />
      <ResellerCTA locale="en" />
      <FAQ locale="en" />
      <Footer locale="en" />
      <WhatsAppButton />
    </main>
  )
}
