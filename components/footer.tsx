import Link from "next/link"
import { waContact, waBuy } from "@/lib/whatsapp"
import { site } from "@/lib/site"

const columns = [
  {
    title: "ניווט",
    links: [
      { label: "אודות Israel IPTV", href: "/about" },
      { label: "מחירים וחבילות", href: "/#pricing" },
      { label: "רשימת ערוצים", href: "/channels-list" },
      { label: "מדריך התקנה", href: "/#installation" },
      { label: "תוכנית משווקים", href: "/#reseller" },
      { label: "בלוג ומדריכים", href: "/blog" },
    ],
  },
  {
    title: "מידע משפטי",
    links: [
      { label: "תנאי שימוש", href: "/terms" },
      { label: "מדיניות החזרים וביטולים", href: "/refund-policy" },
      { label: "מדיניות פרטיות", href: "/privacy-policy" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/30 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-xl font-bold tracking-tight" dir="ltr">
              <span className="text-white">Israel</span> <span className="text-primary">IPTV</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              טלוויזיה ישראלית ובינלאומית דרך האינטרנט – {site.channels}+ ערוצים ו-{site.vod}+ סרטים וסדרות, על כל
              מכשיר ובלי התחייבות.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">צרו קשר</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href={waContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  וואטסאפ: <span dir="ltr">{site.whatsappDisplay}</span>
                </Link>
              </li>
              <li>מענה בעברית 24/7</li>
              <li>
                <Link href={waBuy()} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  להזמנת מנוי ←
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/30 pt-6">
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. כל הזכויות שמורות. שמות הערוצים והסימנים המסחריים שייכים לבעליהם
            ומוזכרים לצורך זיהוי בלבד.
          </p>
        </div>
      </div>
    </footer>
  )
}
