import { site, plans } from '@/lib/site'
import type { Locale } from '@/lib/i18n'

// Plain server-rendered facts block: short, quotable answers for search engines and AI assistants.
export default function KeyFacts({ locale = 'he' }: { locale?: Locale }) {
  const monthly = plans.find((p) => p.months === 1)!.prices[1]
  const yearly = plans.find((p) => p.months === 12)!.prices[1]
  const updated = new Date(site.lastUpdated).toLocaleDateString(locale === 'en' ? 'en-GB' : 'he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const t =
    locale === 'en'
      ? {
          title: 'What is',
          p1: (
            <>
              <strong className="text-foreground">Israel IPTV</strong> is a subscription service for watching TV over
              the internet, built for viewers in Israel and Israelis abroad. Instead of cable, a satellite dish and a
              set-top box, you install a free app on a device you already own and get all the Israeli channels, sports
              and movie channels from around the world – in one subscription, with no contract.
            </>
          ),
          p2: 'Ordering is done on WhatsApp: choose a period and number of devices, pay through a secure link and receive your login details within minutes. You can start with a 1-day pass for ₪13 to test the service on your own device.',
          updatedLabel: 'Last updated',
          caption: 'Key facts',
          facts: [
            ['Service', 'Internet TV (IPTV) subscription'],
            ['Channels', `${site.channels}+ live, including Kan 11, Keshet 12, Reshet 13, Sport 5 and Sport 1`],
            ['Movies & series', `${site.vod}+ titles on demand (VOD)`],
            ['Quality', '4K / FHD / HD with a full TV guide (EPG)'],
            ['Price', `₪${monthly} per month, ₪${yearly} per year (1 device)`],
            ['Devices', 'Samsung, LG, Android TV, Fire Stick, MAG, iPhone, iPad, Apple TV, Windows, Mac'],
            ['Ordering & support', 'On WhatsApp, in Hebrew and English, 24/7'],
            ['Refund', `Within ${site.refundDays} days`],
          ],
        }
      : {
          title: 'מה זה',
          p1: (
            <>
              <strong className="text-foreground">Israel IPTV</strong> הוא שירות מנויים לצפייה בטלוויזיה דרך האינטרנט,
              שנבנה לצופים בישראל ולישראלים בחו״ל. במקום כבלים, צלחת וממיר, מתקינים אפליקציה חינמית במכשיר שכבר יש
              לכם ומקבלים את כל הערוצים הישראליים, ערוצי ספורט וסרטים מכל העולם – במנוי אחד, בלי התחייבות.
            </>
          ),
          p2: 'ההזמנה נעשית בוואטסאפ: בוחרים תקופה ומספר מכשירים, משלמים בקישור מאובטח ומקבלים פרטי התחברות תוך דקות. אפשר להתחיל ביום אחד ב-₪13 כדי לבדוק את השירות על המכשיר שלכם.',
          updatedLabel: 'עודכן לאחרונה',
          caption: 'עובדות עיקריות',
          facts: [
            ['שירות', 'מנוי טלוויזיה באינטרנט (IPTV)'],
            ['ערוצים', `${site.channels}+ בשידור חי, כולל כאן 11, קשת 12, רשת 13, ספורט 5 וספורט 1`],
            ['סרטים וסדרות', `${site.vod}+ כותרים לפי דרישה (VOD)`],
            ['איכות', '4K / FHD / HD עם מדריך שידורים (EPG)'],
            ['מחיר', `₪${monthly} לחודש, ₪${yearly} לשנה (מכשיר אחד)`],
            ['מכשירים', 'Samsung, LG, Android TV, Fire Stick, MAG, iPhone, iPad, Apple TV, Windows, Mac'],
            ['הזמנה ותמיכה', 'בוואטסאפ, בעברית, 24/7'],
            ['החזר כספי', `תוך ${site.refundDays} ימים`],
          ],
        }

  return (
    <section id="about-israel-iptv" className="relative px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t.title} <span dir="ltr" className="text-primary">Israel IPTV</span>?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.p1}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t.p2}</p>
          <p className="mt-6 text-xs text-muted-foreground">
            {t.updatedLabel}: <time dateTime={site.lastUpdated}>{updated}</time>
          </p>
        </div>

        <div className="glass overflow-hidden rounded-2xl">
          <table className="w-full text-sm">
            <caption className="border-b border-border/30 px-5 py-3 text-start font-semibold text-foreground">
              {t.caption}
            </caption>
            <tbody>
              {t.facts.map(([k, v]) => (
                <tr key={k} className="border-b border-border/10 last:border-0">
                  <th scope="row" className="w-36 px-5 py-3 text-start align-top font-medium text-muted-foreground">
                    {k}
                  </th>
                  <td className="px-5 py-3 text-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
