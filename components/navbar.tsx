"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe } from "lucide-react"
import Link from "next/link"
import { waBuy } from "@/lib/whatsapp"
import type { Locale } from "@/lib/i18n"

const copy = {
  he: {
    links: [
      { label: "ראשי", href: "/" },
      { label: "מחירים", href: "/#pricing" },
      { label: "רשימת ערוצים", href: "/channels-list" },
      { label: "מדריך התקנה", href: "/#installation" },
      { label: "בלוג", href: "/blog" },
      { label: "משווקים", href: "/#reseller" },
    ],
    order: "הזמינו עכשיו",
    menu: "פתיחת תפריט",
    switchLabel: "English",
    switchHref: "/en",
    switchLang: "en",
  },
  en: {
    links: [
      { label: "Home", href: "/en" },
      { label: "Pricing", href: "/en#pricing" },
      { label: "Channels", href: "/channels-list" },
      { label: "Setup", href: "/en#installation" },
      { label: "FAQ", href: "/en#faq" },
      { label: "Resellers", href: "/en#reseller" },
    ],
    order: "Order now",
    menu: "Open menu",
    switchLabel: "עברית",
    switchHref: "/",
    switchLang: "he",
  },
}

export default function Navbar({ locale = "he" }: { locale?: Locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = copy[locale]

  const langSwitch = (
    <Link
      href={t.switchHref}
      hrefLang={t.switchLang}
      lang={t.switchLang}
      className="flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <Globe className="h-4 w-4" />
      {t.switchLabel}
    </Link>
  )

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={locale === "en" ? "/en" : "/"} className="flex items-center gap-2 text-xl font-bold tracking-tight" dir="ltr">
            <span className="text-foreground">Israel</span>
            <span className="text-primary">IPTV</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {t.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {langSwitch}
            <Link
              href={waBuy()}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-glow rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              {t.order}
            </Link>
          </div>

          <button
            className="text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t.menu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t border-border/30 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {t.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 px-3">{langSwitch}</div>
              <Link
                href={waBuy()}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-glow mt-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                {t.order}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
