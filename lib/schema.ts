import { site, plans } from '@/lib/site'
import { faqs } from '@/lib/faq'

// Stable @ids so every page points at the same "Israel IPTV" entity
export const ORG_ID = `${site.url}/#organization`
export const WEBSITE_ID = `${site.url}/#website`
export const SERVICE_ID = `${site.url}/#service`

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.name,
  url: site.url,
  logo: { '@type': 'ImageObject', url: `${site.url}/icon.svg` },
  description: `${site.name} is an IPTV subscription service for viewers in Israel and Israelis abroad: ${site.channels}+ live channels and ${site.vod}+ movies and series in up to 4K.`,
  areaServed: { '@type': 'Country', name: 'Israel' },
  knowsLanguage: ['he', 'en'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+${site.whatsappNumber}`,
    contactType: 'customer service',
    availableLanguage: ['Hebrew', 'English'],
    hoursAvailable: 'Mo-Su 00:00-23:59',
  },
}

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: site.name,
  url: site.url,
  inLanguage: 'he-IL',
  publisher: { '@id': ORG_ID },
}

export const service = {
  '@type': 'Service',
  '@id': SERVICE_ID,
  name: site.name,
  serviceType: 'IPTV subscription',
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'Israel' },
  description: `${site.name}: ${site.channels}+ live TV channels including Kan 11, Keshet 12, Reshet 13 and sports channels, plus ${site.vod}+ VOD titles. Works on Smart TV, Fire Stick, Android, iOS, MAG and PC.`,
  offers: plans.map((p) => ({
    '@type': 'Offer',
    name: `${site.name} – ${p.labelEn} (1 device)`,
    price: p.prices[1],
    priceCurrency: 'ILS',
    availability: 'https://schema.org/InStock',
    url: `${site.url}/#pricing`,
  })),
}

export const faqPage = {
  '@type': 'FAQPage',
  '@id': `${site.url}/#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
