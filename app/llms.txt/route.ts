import { site, plans } from '@/lib/site'
import { faqsEn } from '@/lib/faq'
import { getAllPosts } from '@/lib/posts'

// llms.txt: a plain-text summary of Israel IPTV for AI assistants and answer engines (https://llmstxt.org)
export const dynamic = 'force-static'

export function GET() {
  const posts = getAllPosts()
  const price = (p: (typeof plans)[number]) =>
    `- ${p.labelEn}: ${p.prices[1]} ILS (1 device), ${p.prices[2]} ILS (2 devices), ${p.prices[3]} ILS (3 devices)`

  const body = `# Israel IPTV

> Israel IPTV (${site.domain}) is an IPTV subscription service for viewers in Israel and Israelis abroad. It streams ${site.channels}+ live TV channels – Israeli and international channels, sports, news, movies and kids – plus ${site.vod}+ movies and series on demand, in up to 4K. No cable, satellite dish, technician or contract is needed.

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

${faqsEn.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')}

## Pages

- [Israel IPTV – home (Hebrew)](${site.url}/): overview, prices, installation, FAQ
- [Israel IPTV – home (English)](${site.url}/en): the same overview in English
- [About Israel IPTV](${site.url}/about): who we are and how the service works
- [Blog](${site.url}/blog): installation guides and IPTV articles in Hebrew
- [Terms](${site.url}/terms), [Refund policy](${site.url}/refund-policy), [Privacy policy](${site.url}/privacy-policy)

## Guides (Hebrew)

${posts.map((p) => `- [${p.title}](${site.url}/${encodeURIComponent(p.slug)})`).join('\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
