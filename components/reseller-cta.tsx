"use client"

import { motion } from "framer-motion"
import { Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { waReseller } from "@/lib/whatsapp"
import { site } from "@/lib/site"

export default function ResellerCTA() {
  return (
    <section id="reseller" className="relative scroll-mt-20 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-10 sm:p-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:text-right">
          <div className="flex-1">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Briefcase className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              תוכנית המשווקים של <span className="text-primary">{site.name}</span>
            </h2>
            <p className="mt-3 max-w-lg text-pretty text-muted-foreground">
              מכרו מנויים תחת השם שלכם: קרדיטים במחיר סיטונאי, פאנל לניהול לקוחות ופתיחת מנויים בעצמכם, ותמיכה ישירה מהצוות שלנו.
            </p>
          </div>

          <Link
            href={waReseller()}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-glow flex shrink-0 items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            לפרטים בוואטסאפ
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
