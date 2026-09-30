"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Timer, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { waBuy, waTrial } from "@/lib/whatsapp"
import { site } from "@/lib/site"
import type { Locale } from "@/lib/i18n"
import HeroVisual from "@/components/hero-visual"

const copy = {
  he: {
    badge: `החזר כספי מלא תוך ${site.refundDays} ימים · בלי התחייבות`,
    h1: "כל הטלוויזיה הישראלית, בלי כבלים ובלי צלחת",
    intro: (
      <>
        <strong className="text-foreground">Israel IPTV</strong> הוא שירות טלוויזיה באינטרנט שמביא לכם את הערוצים
        הישראליים, ספורט, חדשות וסרטים – יחד עם {site.channels}+ ערוצים מכל העולם ו-{site.vod}+ סרטים וסדרות. עובד על
        הטלוויזיה, הטלפון והמחשב, מ-₪55 לחודש.
      </>
    ),
    order: "הזמינו עכשיו",
    trial: "נסו יום אחד ב-₪13",
  },
  en: {
    badge: `${site.refundDays}-day money-back guarantee · No contract`,
    h1: "Israeli TV anywhere – no cable, no satellite dish",
    intro: (
      <>
        <strong className="text-foreground">Israel IPTV</strong> is an internet TV service that brings you Israeli
        channels, sports, news and movies – together with {site.channels}+ channels from around
        the world and {site.vod}+ movies and series. Watch on your TV, phone or computer, from ₪55 per month.
      </>
    ),
    order: "Order now",
    trial: "Try 1 day for ₪13",
  },
}

export default function Hero({ locale = "he" }: { locale?: Locale }) {
  const t = copy[locale]
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-28 pt-36 sm:px-6 lg:px-8"
    >
      {/* Flag stripes */}
      <div className="flag-stripe flag-stripe-animated pointer-events-none absolute inset-x-0 top-24" aria-hidden />
      <div className="flag-stripe flag-stripe-animated pointer-events-none absolute inset-x-0 bottom-10" aria-hidden />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-drift absolute left-[10%] top-[15%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[110px]" />
        <div className="animate-drift-slow absolute bottom-[10%] right-[5%] h-[380px] w-[380px] rounded-full bg-[#3B6FE0]/10 blur-[100px]" />
      </div>

      {/* Two columns: text on the left, illustration on the right (same on Hebrew and English pages) */}
      <div dir="ltr" className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div dir={locale === "he" ? "rtl" : "ltr"} className="text-center lg:text-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl xl:text-6xl"
          >
            <span dir="ltr" className="text-primary">Israel IPTV</span>
            <br />
            {t.h1.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
                {"\u00A0"}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0"
          >
            {t.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href={waBuy()}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-glow shine flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <ShoppingCart className="h-5 w-5" />
              {t.order}
            </Link>

            <Link
              href={waTrial()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              <Timer className="h-5 w-5" />
              {t.trial}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground lg:justify-start"
          >
            {["Samsung / LG", "Android TV", "Fire Stick", "iPhone / iPad", "MAG", "Windows / Mac"].map((device) => (
              <span
                key={device}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                {device}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="px-6 sm:px-10 lg:px-4"
        >
          <HeroVisual locale={locale} />
        </motion.div>
      </div>
    </section>
  )
}
