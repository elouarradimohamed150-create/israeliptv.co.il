"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { site } from "@/lib/site"

type Cell = boolean | string

const rows: { feature: string; us: Cell; cable: Cell }[] = [
  { feature: "מחיר חודשי", us: "מ-₪21", cable: "₪150–₪300" },
  { feature: "התחייבות", us: "ללא", cable: "12–36 חודשים" },
  { feature: "טכנאי והתקנה", us: "לא צריך", cable: "נדרש" },
  { feature: "ממיר / צלחת", us: "לא צריך", cable: "חובה" },
  { feature: "ערוצים בינלאומיים", us: `${site.channels}+`, cable: "מאות" },
  { feature: "ספורט ישראלי ואירופאי בחבילה אחת", us: true, cable: false },
  { feature: "צפייה בטלפון ובמחשב", us: true, cable: "בתוספת תשלום" },
  { feature: "4K", us: true, cable: "חלקי" },
  { feature: `החזר כספי תוך ${site.refundDays} ימים`, us: true, cable: false },
]

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

export default function ComparisonTable() {
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
            <span className="text-primary">{site.name}</span> מול כבלים ולוויין
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            אותם ערוצים ישראליים, הרבה יותר תוכן – ובלי חוזה, טכנאי או ממיר.
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
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground"></th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary">{site.name}</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">כבלים / לוויין</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
