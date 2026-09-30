"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { site } from "@/lib/site"
import type { Locale } from "@/lib/i18n"
import { Stagger, StaggerItem } from "@/components/motion"

type Cell = boolean | string

const rows: Record<Locale, { feature: string; us: Cell; cable: Cell }[]> = {
  he: [
    { feature: "מחיר חודשי", us: "מ-₪21", cable: "₪150–₪300" },
    { feature: "התחייבות", us: "ללא", cable: "12–36 חודשים" },
    { feature: "טכנאי והתקנה", us: "לא צריך", cable: "נדרש" },
    { feature: "ממיר / צלחת", us: "לא צריך", cable: "חובה" },
    { feature: "ערוצים בינלאומיים", us: `${site.channels}+`, cable: "מאות" },
    { feature: "ספורט ישראלי ואירופאי בחבילה אחת", us: true, cable: false },
    { feature: "צפייה בטלפון ובמחשב", us: true, cable: "בתוספת תשלום" },
    { feature: "4K", us: true, cable: "חלקי" },
    { feature: `החזר כספי תוך ${site.refundDays} ימים`, us: true, cable: false },
  ],
  en: [
    { feature: "Monthly price", us: "from ₪21", cable: "₪150–₪300" },
    { feature: "Contract", us: "None", cable: "12–36 months" },
    { feature: "Technician & installation", us: "Not needed", cable: "Required" },
    { feature: "Set-top box / dish", us: "Not needed", cable: "Required" },
    { feature: "International channels", us: `${site.channels}+`, cable: "Hundreds" },
    { feature: "Israeli and European sports in one plan", us: true, cable: false },
    { feature: "Watch on phone and computer", us: true, cable: "Extra cost" },
    { feature: "4K", us: true, cable: "Partial" },
    { feature: `${site.refundDays}-day money-back guarantee`, us: true, cable: false },
  ],
}

const copy = {
  he: { vs: "מול כבלים ולוויין", p: "אותם ערוצים ישראליים, הרבה יותר תוכן – ובלי חוזה, טכנאי או ממיר.", cable: "כבלים / לוויין" },
  en: { vs: "vs. cable and satellite", p: "The same Israeli channels, far more content – with no contract, technician or set-top box.", cable: "Cable / satellite" },
}

function CellView({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (value === true)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
        <Check className="h-4 w-4 text-primary" />
      </span>
    )
  if (value === false)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/20">
        <X className="h-4 w-4 text-destructive" />
      </span>
    )
  return <span className={`text-sm ${highlight ? "font-semibold text-primary" : "text-muted-foreground"}`}>{value}</span>
}

export default function ComparisonTable({ locale = "he" }: { locale?: Locale }) {
  const t = copy[locale]
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-primary">{site.name}</span> {t.vs}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {t.p}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass mt-10 overflow-hidden rounded-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="px-6 py-4 text-start text-sm font-medium text-muted-foreground"></th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary">{site.name}</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">{t.cable}</th>
                </tr>
              </thead>
              <Stagger as="tbody" gap={0.05}>
                {rows[locale].map((row, index) => (
                  <StaggerItem
                    as="tr"
                    key={row.feature}
                    className={`border-b border-border/10 ${index % 2 === 0 ? "bg-secondary/20" : ""}`}
                  >
                    <td className="px-6 py-3.5 text-sm text-foreground">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center">
                      <CellView value={row.us} highlight />
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <CellView value={row.cable} />
                    </td>
                  </StaggerItem>
                ))}
              </Stagger>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
