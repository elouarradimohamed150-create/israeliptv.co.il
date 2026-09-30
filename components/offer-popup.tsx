"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, X, Gift } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { plans } from "@/lib/site"
import { waBuyPlan } from "@/lib/whatsapp"
import { LogoMark } from "@/components/logo"
import type { Locale } from "@/lib/i18n"

const STORAGE_KEY = "offer-1y-dismissed-at"
const SNOOZE_DAYS = 3
const DELAY_MS = 15000

const yearly = plans.find((p) => p.months === 12)!
const monthly = plans.find((p) => p.months === 1)!
const price = yearly.prices[1]
const regular = monthly.prices[1] * 12
const saving = Math.round((1 - price / regular) * 100)
const perMonth = Math.round(price / 12)

const copy = {
  he: {
    badge: "מבצע שנתי",
    title: <>שנה שלמה של <span dir="ltr" className="text-primary">Israel IPTV</span></>,
    instead: `במקום ₪${regular} בתשלום חודשי`,
    perMonth: `רק ₪${perMonth} לחודש`,
    save: `חיסכון ${saving}%`,
    perks: ["כל הערוצים וה-VOD באיכות 4K", "צפייה חוזרת (Catch-Up)", "עדיפות בתמיכה בוואטסאפ", "החזר כספי תוך 7 ימים"],
    cta: "אני רוצה את המנוי השנתי",
    later: "אולי אחר כך",
    note: "למכשיר אחד · יש גם חבילות ל-2 ו-3 מכשירים",
    close: "סגירה",
  },
  en: {
    badge: "Yearly deal",
    title: <>A full year of <span className="text-primary">Israel IPTV</span></>,
    instead: `instead of ₪${regular} paying monthly`,
    perMonth: `just ₪${perMonth} per month`,
    save: `Save ${saving}%`,
    perks: ["Every channel and VOD in 4K", "Catch-Up TV", "Priority WhatsApp support", "7-day money-back guarantee"],
    cta: "Get the yearly plan",
    later: "Maybe later",
    note: "1 device · plans for 2 and 3 devices available",
    close: "Close",
  },
}

function recentlyDismissed() {
  try {
    const at = Number(localStorage.getItem(STORAGE_KEY))
    return at > 0 && Date.now() - at < SNOOZE_DAYS * 86400000
  } catch {
    return false
  }
}

function rememberDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {}
}

// Promotes the 12-month plan once: after 15s, halfway down the page, or on exit intent (desktop).
export default function OfferPopup({ locale = "he" }: { locale?: Locale }) {
  const t = copy[locale]
  const [open, setOpen] = useState(false)
  const shown = useRef(false)

  useEffect(() => {
    if (recentlyDismissed()) return
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return
    } catch {}

    const show = () => {
      if (shown.current) return
      shown.current = true
      try {
        sessionStorage.setItem(STORAGE_KEY, "1")
      } catch {}
      setOpen(true)
      cleanup()
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > 0.5) show()
    }
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show()
    }
    const timer = setTimeout(show, DELAY_MS)
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    function cleanup() {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mouseleave", onLeave)
    }
    return cleanup
  }, [])

  const onOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) rememberDismissed()
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[70] bg-[#020818]/70 backdrop-blur-sm" />
        <DialogPrimitive.Content
          dir={locale === "he" ? "rtl" : "ltr"}
          className="fixed left-1/2 top-1/2 z-[71] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 outline-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card text-card-foreground shadow-[0_30px_90px_rgba(2,8,24,0.7)]"
          >
            {/* flag stripes */}
            <div className="flag-stripe flag-stripe-animated !h-2" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />

            <DialogPrimitive.Close
              aria-label={t.close}
              className="absolute end-4 top-5 z-10 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>

            <div className="relative px-7 pb-7 pt-8 text-center">
              <LogoMark className="animate-float mx-auto mb-4 h-14 w-14" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
                <Gift className="h-3.5 w-3.5" />
                {t.badge}
              </span>
              <DialogPrimitive.Title className="mt-3 text-2xl font-extrabold">{t.title}</DialogPrimitive.Title>

              <div className="mt-5 flex items-end justify-center gap-3">
                <span className="text-5xl font-extrabold text-foreground">₪{price}</span>
                <span className="mb-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-sm font-bold text-emerald-400">
                  {t.save}
                </span>
              </div>
              <DialogPrimitive.Description className="mt-1.5 text-sm text-muted-foreground">
                <span className="line-through opacity-70">{t.instead}</span>
                <span className="mx-1.5">·</span>
                <span className="font-semibold text-foreground">{t.perMonth}</span>
              </DialogPrimitive.Description>

              <ul className="mx-auto mt-6 grid max-w-xs gap-2.5 text-start text-sm">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <Link
                href={waBuyPlan(yearly, 1)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onOpenChange(false)}
                className="neon-glow shine mt-7 block rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground transition-all hover:brightness-110"
              >
                {t.cta}
              </Link>
              <DialogPrimitive.Close className="mt-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t.later}
              </DialogPrimitive.Close>
              <p className="mt-4 text-xs text-muted-foreground/80">{t.note}</p>
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
