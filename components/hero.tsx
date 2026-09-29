"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Timer, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { waBuy, waTrial } from "@/lib/whatsapp"
import { site } from "@/lib/site"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
        >
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            החזר כספי מלא תוך {site.refundDays} ימים · בלי התחייבות
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span dir="ltr" className="text-primary">Israel IPTV</span>
          <br />
          כל הטלוויזיה הישראלית, בלי כבלים ובלי צלחת
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl"
        >
          <strong className="text-foreground">Israel IPTV</strong> הוא שירות טלוויזיה באינטרנט שמביא לכם את כאן 11, קשת 12, רשת 13, ערוצי הספורט והסרטים – יחד עם{" "}
          {site.channels}+ ערוצים מכל העולם ו-{site.vod}+ סרטים וסדרות. עובד על הטלוויזיה, הטלפון
          והמחשב, מ-₪55 לחודש.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={waBuy()}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-glow flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            <ShoppingCart className="h-5 w-5" />
            הזמינו עכשיו
          </Link>

          <Link
            href={waTrial()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
          >
            <Timer className="h-5 w-5" />
            נסו יום אחד ב-₪13
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
        >
          {["Samsung / LG", "Android TV", "Fire Stick", "iPhone / iPad", "MAG", "Windows / Mac"].map((device) => (
            <span
              key={device}
              className="flex items-center gap-2 rounded-full border border-border/50 px-4 py-2"
            >
              <span className="h-2 w-2 rounded-full bg-primary/60" />
              {device}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
