import type { Metadata } from 'next'
import Link from 'next/link'
import { site, plans } from '@/lib/site'
import { graph, organization, website, service, ORG_ID, WEBSITE_ID } from '@/lib/schema'
import { waContact } from '@/lib/whatsapp'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { Reveal } from '@/components/motion'

export const metadata: Metadata = {
  title: { absolute: `אודות Israel IPTV – מי אנחנו ואיך השירות עובד` },
  description: `Israel IPTV הוא שירות IPTV לצופים בישראל ולישראלים בחו״ל: ${site.channels}+ ערוצים, תמיכה בעברית 24/7 והחזר כספי תוך ${site.refundDays} ימים. כך השירות עובד.`,
  alternates: { canonical: '/about' },
  openGraph: { url: '/about', images: ['/opengraph-image'] },
}

const jsonLd = graph(organization, website, service, {
  '@type': 'AboutPage',
  '@id': `${site.url}/about#webpage`,
  url: `${site.url}/about`,
  name: 'אודות Israel IPTV',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
  inLanguage: 'he-IL',
  dateModified: site.lastUpdated,
})

const sections = [
  {
    title: 'מה זה Israel IPTV',
    body: `Israel IPTV הוא שירות מנויים לטלוויזיה דרך האינטרנט. השירות נבנה סביב מה שצופה ישראלי מחפש: הערוצים הישראליים, ערוצי ספורט, חדשות וסרטים, ולצידם ${site.channels}+ ערוצים מכל העולם ו-${site.vod}+ סרטים וסדרות לפי דרישה.`,
  },
  {
    title: 'למי השירות מתאים',
    body: 'למשפחות שרוצות להפסיק לשלם מאות שקלים בחודש לחברת כבלים או לוויין, לישראלים שגרים או מטיילים בחו״ל ורוצים להמשיך לצפות בערוצים מהבית, ולאוהדי ספורט שרוצים ליגות ישראליות ואירופאיות במנוי אחד.',
  },
  {
    title: 'איך Israel IPTV עובד',
    body: 'בוחרים חבילה לפי תקופה ומספר מכשירים, ומזמינים בוואטסאפ. אחרי התשלום נשלחים פרטי התחברות, ומזינים אותם באפליקציית נגן חינמית בטלוויזיה החכמה, ב-Fire Stick, בטלפון או במחשב. אין צורך בטכנאי, בממיר או בחוזה.',
  },
  {
    title: 'המחויבות שלנו',
    body: `אין חיוב אוטומטי ואין התחייבות. אם השירות לא מתאים לכם, יש החזר כספי מלא תוך ${site.refundDays} ימים ממועד ההפעלה. התמיכה זמינה בוואטסאפ בעברית 24 שעות ביממה, כולל עזרה בהתקנה.`,
  },
]

export default function AboutPage() {
  const from = Math.min(...plans.filter((p) => p.months).map((p) => p.prices[1]))
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Israel IPTV</Link> <span aria-hidden>›</span> אודות
        </nav>
        <h1 className="text-4xl font-black md:text-5xl">
          אודות <span dir="ltr" className="text-primary">Israel IPTV</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/80">
          <strong className="text-foreground">Israel IPTV</strong> ({site.domain}) הוא שירות IPTV שמביא את הטלוויזיה הישראלית
          והבינלאומית לכל מכשיר, במחיר שמתחיל ב-₪{from} לחודש.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <section>
                <h2 className="mb-3 text-2xl font-bold">{s.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{s.body}</p>
              </section>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link href="/#pricing" className="neon-glow shine rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground">
            למחירי Israel IPTV
          </Link>
          <Link
            href={waContact}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border px-8 py-3.5 font-bold hover:border-primary"
          >
            דברו איתנו בוואטסאפ
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
