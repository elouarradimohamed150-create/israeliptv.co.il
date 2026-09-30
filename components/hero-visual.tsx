"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Newspaper, Trophy, Sparkles, Clapperboard, Baby, Mountain, Play, Wifi } from "lucide-react"
import { site } from "@/lib/site"
import type { Locale } from "@/lib/i18n"

const categories = {
  he: [
    { name: "חדשות", show: "המהדורה המרכזית – שידור חי", icon: Newspaper },
    { name: "ספורט", show: "כדורגל – שידור חי", icon: Trophy },
    { name: "ריאליטי", show: "הפרק החדש הערב", icon: Sparkles },
    { name: "סרטים", show: "סרט הערב ב-4K", icon: Clapperboard },
    { name: "ילדים", show: "סדרות לכל המשפחה", icon: Baby },
    { name: "דוקומנטרי", show: "טבע ומסעות", icon: Mountain },
  ],
  en: [
    { name: "News", show: "Evening news – live", icon: Newspaper },
    { name: "Sports", show: "Football – live", icon: Trophy },
    { name: "Reality", show: "Tonight's new episode", icon: Sparkles },
    { name: "Movies", show: "Movie of the night in 4K", icon: Clapperboard },
    { name: "Kids", show: "Shows for the whole family", icon: Baby },
    { name: "Documentary", show: "Nature & travel", icon: Mountain },
  ],
}

const labels = {
  he: { channels: "ערוצים בשידור חי", vod: "סרטים וסדרות", phone: "גם בנייד" },
  en: { channels: "live channels", vod: "movies & series", phone: "On your phone" },
}

// Illustrated TV + phone for the hero: no photos, no channel logos, animated "live" screen.
export default function HeroVisual({ locale = "he" }: { locale?: Locale }) {
  const list = categories[locale]
  const t = labels[locale]
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % list.length), 2800)
    return () => clearInterval(id)
  }, [list.length])

  const current = list[i]
  const Icon = current.icon

  return (
    <div className="relative mx-auto w-full max-w-xl" aria-hidden>
      {/* glow behind the TV */}
      <div className="animate-drift pointer-events-none absolute -inset-8 rounded-full bg-primary/25 blur-3xl" />

      {/* TV */}
      <div className="relative rounded-[1.6rem] border border-white/10 bg-[#050D22] p-2.5 shadow-[0_30px_80px_rgba(2,8,24,0.65)]">
        <div className="relative flex aspect-video flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#163B8C] via-[#1F4DB0] to-[#2D63D4] px-4 py-3 text-white sm:px-5 sm:py-4">
          {/* screen sheen */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />

          {/* top bar */}
          <div className="relative flex items-center justify-between text-[10px] font-semibold sm:text-[11px]">
            <span className="flex items-center gap-2 rounded-full bg-black/25 px-2.5 py-1">
              <span className="live-dot h-2 w-2 rounded-full bg-red-600" />
              LIVE
            </span>
            <span className="rounded-full bg-black/25 px-2.5 py-1">4K · HDR</span>
          </div>

          {/* now playing */}
          <div className="relative flex flex-1 items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <span className="mb-2 hidden h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur sm:flex">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-xl font-bold sm:text-3xl">{current.name}</p>
                <p className="mt-0.5 text-[11px] text-white/75 sm:text-sm">{current.show}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* category tiles + progress */}
          <div className="relative">
            <div className="mb-2.5 hidden grid-cols-6 gap-2 sm:grid">
              {list.map((c, n) => {
                const TileIcon = c.icon
                return (
                  <div
                    key={c.name}
                    className={`flex h-9 items-center justify-center rounded-lg transition-all duration-300 ${
                      n === i ? "scale-105 bg-white text-[#163B8C] shadow-lg" : "bg-white/12 text-white/80"
                    }`}
                  >
                    <TileIcon className="h-4 w-4" />
                  </div>
                )
              })}
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/15">
              <motion.div
                key={i}
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* stand */}
      <div className="relative mx-auto h-6 w-16 bg-gradient-to-b from-[#050D22] to-[#0B1B3F]" />
      <div className="relative mx-auto h-2.5 w-44 rounded-full bg-[#050D22] shadow-[0_10px_30px_rgba(2,8,24,0.6)]" />

      {/* floating stat: channels */}
      <div className="glass animate-float absolute -top-14 right-4 hidden rounded-2xl px-4 py-3 sm:block" style={{ animationDelay: "0.3s" }}>
        <p className="text-lg font-extrabold text-primary" dir="ltr">{site.channels}+</p>
        <p className="text-[11px] text-muted-foreground">{t.channels}</p>
      </div>

      {/* floating stat: VOD */}
      <div className="glass animate-float absolute -bottom-2 right-0 hidden rounded-2xl px-4 py-3 sm:block lg:-right-6" style={{ animationDelay: "1.1s" }}>
        <p className="text-lg font-extrabold text-primary" dir="ltr">{site.vod}+</p>
        <p className="text-[11px] text-muted-foreground">{t.vod}</p>
      </div>

      {/* phone */}
      <div className="animate-float absolute -bottom-6 -left-4 hidden w-24 sm:block lg:-left-10 lg:w-28" style={{ animationDelay: "0.7s" }}>
        <div className="rounded-[1.4rem] border-[5px] border-[#050D22] bg-gradient-to-b from-[#2D63D4] to-[#163B8C] p-2 shadow-[0_20px_50px_rgba(2,8,24,0.6)]">
          <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-black/40" />
          <div className="flex aspect-[9/14] flex-col items-center justify-center gap-2 rounded-xl bg-black/20 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Play className="h-4 w-4 fill-white" />
            </span>
            <span className="flex items-center gap-1 text-[9px] font-semibold text-white/80">
              <Wifi className="h-3 w-3" /> {t.phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
