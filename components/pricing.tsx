"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ShieldCheck, Zap, MessageCircle, Lock } from "lucide-react"
import Link from "next/link"
import { plans, planFeatures, planFeaturesEn, type Devices } from "@/lib/site"
import type { Locale } from "@/lib/i18n"
import { waBuyPlan, waContact } from "@/lib/whatsapp"

const copy = {
  he: {
    devices: ["מכשיר אחד", "2 מכשירים", "3 מכשירים"],
    devicesLabel: "מספר מכשירים",
    h2: <>מחירי <span className="text-primary">Israel IPTV</span> – בוחרים תקופה ומספר מכשירים</>,
    p: "כל החבילות כוללות את אותו תוכן מלא. ככל שהתקופה ארוכה יותר, המחיר לחודש יורד.",
    popular: "הכי משתלם",
    save: (n: number) => `חיסכון ${n}%`,
    perMonth: (n: number) => `₪${n} לחודש`,
    oneDay: "גישה מלאה ל-24 שעות",
    oneOff: "חיוב חד-פעמי",
    allContent: "כל הערוצים, ה-VOD ו-4K",
    order: "הזמינו עכשיו",
    included: "כלול בכל החבילות",
    more: ["צריכים יותר מ-3 מכשירים?", "דברו איתנו", "ונבנה לכם חבילה."],
    badges: [
      { title: "תשלום מאובטח", sub: "PayPal / כרטיס אשראי" },
      { title: "הפעלה מהירה", sub: "פרטים ישירות לוואטסאפ" },
      { title: "החזר תוך 7 ימים", sub: "בלי אותיות קטנות" },
      { title: "תמיכה 24/7", sub: "בעברית, בוואטסאפ" },
    ],
  },
  en: {
    devices: ["1 device", "2 devices", "3 devices"],
    devicesLabel: "Number of devices",
    h2: <><span className="text-primary">Israel IPTV</span> prices – choose a period and number of devices</>,
    p: "Every plan includes the same full content. The longer the period, the lower the monthly price.",
    popular: "Best value",
    save: (n: number) => `Save ${n}%`,
    perMonth: (n: number) => `₪${n} per month`,
    oneDay: "Full access for 24 hours",
    oneOff: "One-time payment",
    allContent: "All channels, VOD and 4K",
    order: "Order now",
    included: "Included in every plan",
    more: ["Need more than 3 devices?", "Talk to us", "and we will build a plan for you."],
    badges: [
      { title: "Secure payment", sub: "PayPal / credit card" },
      { title: "Fast activation", sub: "Details sent to WhatsApp" },
      { title: "7-day refund", sub: "No small print" },
      { title: "24/7 support", sub: "Hebrew & English" },
    ],
  },
}

const badgeIcons = [Lock, Zap, ShieldCheck, MessageCircle]

export default function Pricing({ locale = "he" }: { locale?: Locale }) {
  const t = copy[locale]
  const [devices, setDevices] = useState<Devices>(1)
  const monthly = plans.find((p) => p.months === 1)!.prices[devices]

  return (
    <section id="pricing" className="relative scroll-mt-20 px-4 py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            {t.h2}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {t.p}
          </p>
        </motion.div>

        {/* Device selector */}
        <div className="mt-10 flex justify-center">
          <div role="radiogroup" aria-label={t.devicesLabel} className="glass inline-flex gap-1 rounded-xl p-1">
            {([1, 2, 3] as Devices[]).map((value) => (
              <button
                key={value}
                role="radio"
                aria-checked={devices === value}
                onClick={() => setDevices(value)}
                className={`relative rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                  devices === value ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {devices === value && (
                  <motion.span
                    layoutId={`device-pill-${locale}`}
                    className="absolute inset-0 rounded-lg bg-primary"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{t.devices[value - 1]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const price = plan.prices[devices]
            const perMonth = plan.months && plan.months > 1 ? Math.round(price / plan.months) : null
            const saving =
              plan.months && plan.months > 1 ? Math.round((1 - price / (monthly * plan.months)) * 100) : 0

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`glass lift relative flex flex-col rounded-2xl p-6 ${
                  plan.popular ? "outline-2 outline-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="animate-float rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-md">
                    {t.popular}
                    </div>
                  </div>
                )}

                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="text-xl font-bold text-foreground">{locale === "en" ? plan.labelEn : plan.label}</h3>
                  {saving > 0 && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {t.save(saving)}
                    </span>
                  )}
                </div>

                <div className="relative mb-1 h-10 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={price}
                      initial={{ y: 28, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -28, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-x-0 text-4xl font-bold text-foreground"
                    >
                      ₪{price}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="mb-6 h-5 text-sm text-muted-foreground">
                  {perMonth ? t.perMonth(perMonth) : plan.months === null ? t.oneDay : t.oneOff}
                </p>

                <ul className="mb-8 flex flex-1 flex-col gap-2.5">
                  {(locale === "en" ? plan.perksEn : plan.perks).map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm font-medium text-foreground">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{perk}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{t.allContent}</span>
                  </li>
                </ul>

                <Link
                  href={waBuyPlan(plan, devices)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? "neon-glow shine bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {t.order}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* What every plan includes */}
        <div className="glass mt-10 rounded-2xl p-6 sm:p-8">
          <h3 className="mb-5 text-center text-lg font-bold text-foreground">{t.included}</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(locale === "en" ? planFeaturesEn : planFeatures).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t.more[0]}{" "}
          <Link href={waContact} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
            {t.more[1]}
          </Link>{" "}
          {t.more[2]}
        </p>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-border bg-secondary/30 px-6 py-8">
          {t.badges.map((b, i) => {
            const Icon = badgeIcons[i]
            return (
            <div key={b.title} className="flex items-center gap-3">
              <Icon className="h-8 w-8 text-primary" />
              <div className="text-start">
                <p className="text-sm font-bold text-foreground">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.sub}</p>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
