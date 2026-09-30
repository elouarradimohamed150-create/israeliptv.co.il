"use client"

import { motion } from "framer-motion"
import { Briefcase, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { waReseller } from "@/lib/whatsapp"
import type { Locale } from "@/lib/i18n"

const copy = {
  he: {
    h2: <>הפכו ל<span className="text-primary">משווקים</span> שלנו</>,
    p: "מכרו מנויים תחת השם שלכם: קרדיטים במחיר סיטונאי, פאנל לניהול לקוחות ופתיחת מנויים בעצמכם, ותמיכה ישירה מהצוות שלנו.",
    cta: "לפרטים בוואטסאפ",
  },
  en: {
    h2: <>Become an Israel IPTV <span className="text-primary">reseller</span></>,
    p: "Sell subscriptions under your own name: credits at wholesale prices, a panel to manage customers and create subscriptions yourself, and direct support from our team.",
    cta: "Details on WhatsApp",
  },
}

export default function ResellerCTA({ locale = "he" }: { locale?: Locale }) {
  const t = copy[locale]
  const Arrow = locale === "en" ? ArrowRight : ArrowLeft
  return (
    <section id="reseller" className="relative scroll-mt-20 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-10 sm:p-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:text-start">
          <div className="flex-1">
            <div className="animate-float mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Briefcase className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              {t.h2}
            </h2>
            <p className="mt-3 max-w-lg text-pretty text-muted-foreground">
              {t.p}
            </p>
          </div>

          <Link
            href={waReseller()}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-glow shine group flex shrink-0 items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            {t.cta}
            <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
