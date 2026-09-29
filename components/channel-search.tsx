"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import Link from "next/link"
import { site } from "@/lib/site"

const channels = [
  "כאן 11",
  "קשת 12",
  "רשת 13",
  "ערוץ 14",
  "i24NEWS",
  "ספורט 1",
  "ספורט 5",
  "ONE",
  "ערוץ הספורט",
  "yes Movies",
  "HOT Cinema",
  "beIN Sports",
  "Sky Sports",
  "Eurosport",
  "HBO",
  "National Geographic",
  "Discovery",
  "ניקלודיאון",
]

export default function ChannelSearch() {
  return (
    <section className="relative overflow-hidden px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-balance text-3xl font-bold text-foreground sm:text-4xl"
        >
          הערוצים הישראליים שאתם אוהבים, <span className="text-primary">ועוד {site.channels} מכל העולם</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-pretty text-muted-foreground"
        >
          חדשות, ריאליטי, ספורט ישראלי ואירופאי, ערוצי ילדים וסרטים – מסודרים לפי קטגוריות עם מדריך שידורים מלא.
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
            <span className="text-right text-sm text-muted-foreground">
              חפשו ערוץ ברשימה המלאה – ספורט, חדשות, סרטים...
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative mt-12 overflow-hidden" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-marquee gap-8">
          {[...channels, ...channels].map((channel, index) => (
            <div
              key={`${channel}-${index}`}
              className="glass flex shrink-0 items-center gap-2 rounded-xl px-6 py-3"
            >
              <div className="h-3 w-3 rounded-full bg-primary/50" />
              <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">{channel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
