import { site, plans } from '@/lib/site'

// Plain server-rendered facts block: short, quotable answers for search engines and AI assistants.
export default function KeyFacts() {
  const monthly = plans.find((p) => p.months === 1)!.prices[1]
  const yearly = plans.find((p) => p.months === 12)!.prices[1]
  const updated = new Date(site.lastUpdated).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const facts = [
    ['שירות', 'מנוי טלוויזיה באינטרנט (IPTV)'],
    ['ערוצים', `${site.channels}+ בשידור חי, כולל כאן 11, קשת 12, רשת 13, ספורט 5 וספורט 1`],
    ['סרטים וסדרות', `${site.vod}+ כותרים לפי דרישה (VOD)`],
    ['איכות', '4K / FHD / HD עם מדריך שידורים (EPG)'],
    ['מחיר', `₪${monthly} לחודש, ₪${yearly} לשנה (מכשיר אחד)`],
    ['מכשירים', 'Samsung, LG, Android TV, Fire Stick, MAG, iPhone, iPad, Apple TV, Windows, Mac'],
    ['הזמנה ותמיכה', 'בוואטסאפ, בעברית, 24/7'],
    ['החזר כספי', `תוך ${site.refundDays} ימים`],
  ]

  return (
    <section id="about-israel-iptv" className="relative px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            מה זה <span dir="ltr" className="text-primary">Israel IPTV</span>?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Israel IPTV</strong> הוא שירות מנויים לצפייה בטלוויזיה דרך
            האינטרנט, שנבנה לצופים בישראל ולישראלים בחו״ל. במקום כבלים, צלחת וממיר, מתקינים אפליקציה
            חינמית במכשיר שכבר יש לכם ומקבלים את כל הערוצים הישראליים, ערוצי ספורט וסרטים מכל העולם –
            במנוי אחד, בלי התחייבות.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            ההזמנה נעשית בוואטסאפ: בוחרים תקופה ומספר מכשירים, משלמים בקישור מאובטח ומקבלים פרטי
            התחברות תוך דקות. אפשר להתחיל ביום אחד ב-₪13 כדי לבדוק את השירות על המכשיר שלכם.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            עודכן לאחרונה: <time dateTime={site.lastUpdated}>{updated}</time>
          </p>
        </div>

        <div className="glass overflow-hidden rounded-2xl">
          <table className="w-full text-sm">
            <caption className="border-b border-border/30 px-5 py-3 text-right font-semibold text-foreground">
              עובדות עיקריות
            </caption>
            <tbody>
              {facts.map(([k, v]) => (
                <tr key={k} className="border-b border-border/10 last:border-0">
                  <th scope="row" className="w-32 px-5 py-3 text-right align-top font-medium text-muted-foreground">
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
