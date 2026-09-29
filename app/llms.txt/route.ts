import { site, plans } from '@/lib/site'
import { faqs } from '@/lib/faq'
import { getAllPosts } from '@/lib/posts'

// llms.txt: a plain-text summary of Israel IPTV for AI assistants and answer engines (https://llmstxt.org)
export const dynamic = 'force-static'

export function GET() {
  const posts = getAllPosts()
  const price = (p: (typeof plans)[number]) =>
    `- ${p.labelEn}: ${p.prices[1]} ILS (1 device), ${p.prices[2]} ILS (2 devices), ${p.prices[3]} ILS (3 devices)`

  const body = `# Israel IPTV

> Israel IPTV (${site.domain}) is an IPTV subscription service for viewers in Israel and Israelis abroad. It streams ${site.channels}+ live TV channels – including Kan 11, Keshet 12, Reshet 13, Channel 14, Sport 5, Sport 1 and ONE – plus ${site.vod}+ movies and series on demand, in up to 4K. No cable, satellite dish, technician or contract is needed.

## Key facts

- Service: Israel IPTV – internet TV (IPTV) subscription
- Website: ${site.url}
- Live channels: ${site.channels}+ (Israeli and international)
- Video on demand: ${site.vod}+ movies and series
- Quality: 4K / FHD / HD, with EPG (TV guide)
- Devices: Samsung and LG Smart TV, Android TV, Amazon Fire Stick, MAG, iPhone, iPad, Apple TV, Android phones, Windows, Mac
- Ordering: via WhatsApp (+${site.whatsappNumber}); payment by secure link
- Support: Hebrew and English, 24/7, via WhatsApp
- Refund: full refund within ${site.refundDays} days of activation
- Contract: none; no automatic renewal
- Last updated: ${site.lastUpdated}

## Prices (Israeli shekels)

${plans.map(price).join('\n')}

## Frequently asked questions

${faqs.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')}

## Pages

- [Israel IPTV – home](${site.url}/): overview, prices, installation, FAQ
- [About Israel IPTV](${site.url}/about): who we are and how the service works
- [Channel list](${site.url}/channels-list): searchable list of all live channels
- [Blog](${site.url}/blog): installation guides and IPTV articles in Hebrew
- [Terms](${site.url}/terms), [Refund policy](${site.url}/refund-policy), [Privacy policy](${site.url}/privacy-policy)

## Guides (Hebrew)

${posts.map((p) => `- [${p.title}](${site.url}/${encodeURIComponent(p.slug)})`).join('\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
