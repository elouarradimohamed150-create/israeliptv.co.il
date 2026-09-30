"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import Link from "next/link"
import { site } from "@/lib/site"
import type { Locale } from "@/lib/i18n"

const channels = {
  he: ["כאן 11", "קשת 12", "רשת 13", "ערוץ 14", "i24NEWS", "ספורט 1", "ספורט 5", "ONE", "ערוץ הספורט", "yes Movies", "HOT Cinema", "beIN Sports", "Sky Sports", "Eurosport", "HBO", "National Geographic", "Discovery", "ניקלודיאון"],
  en: ["Kan 11", "Keshet 12", "Reshet 13", "Channel 14", "i24NEWS", "Sport 1", "Sport 5", "ONE", "Sport Channel", "yes Movies", "HOT Cinema", "beIN Sports", "Sky Sports", "Eurosport", "HBO", "National Geographic", "Discovery", "Nickelodeon"],
}

const copy = {
  he: {
    h2: <>ערוצי <span className="text-primary">Israel IPTV</span>: כל הערוצים הישראליים ועוד {site.channels} מכל העולם</>,
    p: "חדשות, ריאליטי, ספורט ישראלי ואירופאי, ערוצי ילדים וסרטים – מסודרים לפי קטגוריות עם מדריך שידורים מלא.",
    search: "חפשו ערוץ ברשימה המלאה – ספורט, חדשות, סרטים...",
  },
  en: {
    h2: <><span className="text-primary">Israel IPTV</span> channels: every Israeli channel, plus {site.channels} from around the world</>,
    p: "News, reality, Israeli and European sports, kids' channels and movies – organised by category with a full TV guide.",
    search: "Search the full channel list – sports, news, movies...",
  },
}

export default function ChannelSearch({ locale = "he" }: { locale?: Locale }) {
  const t = copy[locale]
  return (
    <section className="relative overflow-hidden px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-balance text-3xl font-bold text-foreground sm:text-4xl"
        >
          {t.h2}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-pretty text-muted-foreground"
        >
          {t.p}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/channels-list"
            className="glass mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-2xl px-5 py-4 transition-colors hover:border-primary/40"
          >
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <span className="text-start text-sm text-muted-foreground">{t.search}</span>
          </Link>
        </motion.div>
      </div>

      {/* Marquee: two rows moving in opposite directions */}
      <div className="marquee-pause relative mt-12 flex flex-col gap-4 overflow-hidden" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        {[channels[locale], [...channels[locale]].reverse()].map((row, r) => (
          <div key={r} className={`flex w-max gap-6 ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}>
            {[...row, ...row].map((channel, index) => (
              <div
                key={`${channel}-${index}`}
                className="glass flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 transition-colors hover:border-primary/50"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">{channel}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
