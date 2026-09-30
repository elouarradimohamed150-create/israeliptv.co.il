"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Tv } from "lucide-react"
import type { Locale } from "@/lib/i18n"

const channels = {
  he: [
    { name: "חדשות", show: "המהדורה המרכזית – שידור חי" },
    { name: "ספורט", show: "כדורגל – שידור חי" },
    { name: "ריאליטי", show: "הפרק החדש הערב" },
    { name: "סרטים", show: "סרט הערב ב-4K" },
    { name: "ילדים", show: "סדרות לכל המשפחה" },
    { name: "דוקומנטרי", show: "טבע ומסעות" },
  ],
  en: [
    { name: "News", show: "Evening news – live" },
    { name: "Sports", show: "Football – live" },
    { name: "Reality", show: "Tonight's new episode" },
    { name: "Movies", show: "Movie of the night in 4K" },
    { name: "Kids", show: "Shows for the whole family" },
    { name: "Documentary", show: "Nature & travel" },
  ],
}

// A small "TV screen" that flips through content categories, so the hero feels live.
export default function LiveTv({ locale = "he" }: { locale?: Locale }) {
  const list = channels[locale]
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % list.length), 2600)
    return () => clearInterval(id)
  }, [list.length])

  const ch = list[i]
  return (
    <div className="glass mx-auto w-full max-w-md overflow-hidden rounded-2xl p-1.5" aria-hidden>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#163B8C] to-[#2D63D4] px-6 py-5 text-white">
        <div className="mb-4 flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1">
            <span className="live-dot h-2 w-2 rounded-full bg-red-600" />
            LIVE
          </span>
          <span className="flex items-center gap-1.5 text-white/70" dir="ltr">
            <Tv className="h-3.5 w-3.5" /> 4K · HD
          </span>
        </div>

        <div className="relative h-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <p className="text-2xl font-bold">{ch.name}</p>
              <p className="mt-1 text-sm text-white/75">{ch.show}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* channel progress */}
        <div className="mt-4 flex gap-1.5">
          {list.map((_, n) => (
            <div key={n} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
              {n === i && (
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.6, ease: "linear" }}
                />
              )}
              {n < i && <div className="h-full w-full bg-white/60" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
