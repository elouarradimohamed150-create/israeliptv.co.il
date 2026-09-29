import Link from "next/link"
import { waContact, waBuy } from "@/lib/whatsapp"
import { site } from "@/lib/site"
import type { Locale } from "@/lib/i18n"

const copy = {
  he: {
    about: `טלוויזיה ישראלית ובינלאומית דרך האינטרנט – ${site.channels}+ ערוצים ו-${site.vod}+ סרטים וסדרות, על כל מכשיר ובלי התחייבות.`,
    columns: [
      {
        title: "ניווט",
        links: [
          { label: "אודות Israel IPTV", href: "/about" },
          { label: "מחירים וחבילות", href: "/#pricing" },
          { label: "רשימת ערוצים", href: "/channels-list" },
          { label: "מדריך התקנה", href: "/#installation" },
          { label: "תוכנית משווקים", href: "/#reseller" },
          { label: "בלוג ומדריכים", href: "/blog" },
          { label: "Israel IPTV in English", href: "/en" },
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
    ],
    contact: "צרו קשר",
    whatsapp: "וואטסאפ",
    support: "מענה בעברית 24/7",
    order: "להזמנת מנוי ←",
    rights: "כל הזכויות שמורות. שמות הערוצים והסימנים המסחריים שייכים לבעליהם ומוזכרים לצורך זיהוי בלבד.",
  },
  en: {
    about: `Israeli and international TV over the internet – ${site.channels}+ channels and ${site.vod}+ movies and series, on any device, with no contract.`,
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Pricing", href: "/en#pricing" },
          { label: "Channel list", href: "/channels-list" },
          { label: "Setup guide", href: "/en#installation" },
          { label: "Reseller program", href: "/en#reseller" },
          { label: "Blog (Hebrew)", href: "/blog" },
          { label: "Israel IPTV בעברית", href: "/" },
        ],
      },
      {
        title: "Legal (Hebrew)",
        links: [
          { label: "Terms of use", href: "/terms" },
          { label: "Refund policy", href: "/refund-policy" },
          { label: "Privacy policy", href: "/privacy-policy" },
        ],
      },
    ],
    contact: "Contact",
    whatsapp: "WhatsApp",
    support: "24/7 support in Hebrew and English",
    order: "Order a subscription →",
    rights: "All rights reserved. Channel names and trademarks belong to their owners and are mentioned for identification only.",
  },
}

export default function Footer({ locale = "he" }: { locale?: Locale }) {
  const t = copy[locale]
  return (
    <footer className="border-t border-border/30 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-xl font-bold tracking-tight" dir="ltr">
              <span className="text-white">Israel</span> <span className="text-primary">IPTV</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.about}</p>
          </div>

          {t.columns.map((col) => (
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
            <h4 className="mb-4 text-sm font-semibold text-foreground">{t.contact}</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href={waContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  {t.whatsapp}: <span dir="ltr">{site.whatsappDisplay}</span>
                </Link>
              </li>
              <li>{t.support}</li>
              <li>
                <Link href={waBuy()} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {t.order}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/30 pt-6">
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
