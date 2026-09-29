"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ShieldCheck, Zap, MessageCircle, Lock } from "lucide-react"
import Link from "next/link"
import { plans, planFeatures, type Devices } from "@/lib/site"
import { waBuyPlan, waContact } from "@/lib/whatsapp"

const deviceOptions: { value: Devices; label: string }[] = [
  { value: 1, label: "מכשיר אחד" },
  { value: 2, label: "2 מכשירים" },
  { value: 3, label: "3 מכשירים" },
]

export default function Pricing() {
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
            מחירי <span className="text-primary">מנוי IPTV</span> – בוחרים תקופה ומספר מכשירים
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            כל החבילות כוללות את אותו תוכן מלא. ככל שהתקופה ארוכה יותר, המחיר לחודש יורד.
          </p>
        </motion.div>

        {/* Device selector */}
        <div className="mt-10 flex justify-center">
          <div role="radiogroup" aria-label="מספר מכשירים" className="glass inline-flex gap-1 rounded-xl p-1">
            {deviceOptions.map((opt) => (
              <button
                key={opt.value}
                role="radio"
                aria-checked={devices === opt.value}
                onClick={() => setDevices(opt.value)}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                  devices === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
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
                className={`glass relative flex flex-col rounded-2xl p-6 ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
                    הכי משתלם
                  </div>
                )}

                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="text-xl font-bold text-foreground">{plan.label}</h3>
                  {saving > 0 && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      חיסכון {saving}%
                    </span>
                  )}
                </div>

                <div className="mb-1">
                  <span className="text-4xl font-bold text-foreground">₪{price}</span>
                </div>
                <p className="mb-6 h-5 text-sm text-muted-foreground">
                  {perMonth ? `₪${perMonth} לחודש` : plan.months === null ? "גישה מלאה ל-24 שעות" : "חיוב חד-פעמי"}
                </p>

                <ul className="mb-8 flex flex-1 flex-col gap-2.5">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm font-medium text-foreground">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{perk}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>כל הערוצים, ה-VOD ו-4K</span>
                  </li>
                </ul>

                <Link
                  href={waBuyPlan(plan, devices)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? "neon-glow bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  הזמינו בוואטסאפ
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* What every plan includes */}
        <div className="glass mt-10 rounded-2xl p-6 sm:p-8">
          <h3 className="mb-5 text-center text-lg font-bold text-foreground">כלול בכל החבילות</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {planFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          צריכים יותר מ-3 מכשירים?{" "}
          <Link href={waContact} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
            דברו איתנו
          </Link>{" "}
          ונבנה לכם חבילה.
        </p>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-border bg-secondary/30 px-6 py-8">
          {[
            { icon: Lock, title: "תשלום מאובטח", sub: "PayPal / כרטיס אשראי" },
            { icon: Zap, title: "הפעלה מהירה", sub: "פרטים ישירות לוואטסאפ" },
            { icon: ShieldCheck, title: "החזר תוך 7 ימים", sub: "בלי אותיות קטנות" },
            { icon: MessageCircle, title: "תמיכה 24/7", sub: "בעברית, בוואטסאפ" },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <b.icon className="h-8 w-8 text-primary" />
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
