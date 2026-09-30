"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs, faqsEn } from "@/lib/faq"
import type { Locale } from "@/lib/i18n"
import { StaggerItem } from "@/components/motion"

const copy = {
  he: {
    h2: <>שאלות נפוצות על <span className="text-primary">Israel IPTV</span></>,
    p: "לא מצאתם תשובה? כתבו לנו בוואטסאפ – עונים בעברית, מסביב לשעון.",
  },
  en: {
    h2: <><span className="text-primary">Israel IPTV</span> FAQ</>,
    p: "Didn't find your answer? Message us on WhatsApp – we reply in Hebrew and English, around the clock.",
  },
}

export default function FAQ({ locale = "he" }: { locale?: Locale }) {
  const t = copy[locale]
  const items = locale === "en" ? faqsEn : faqs
  return (
    <section id="faq" className="relative scroll-mt-20 px-4 py-20">
      <div className="mx-auto max-w-3xl">
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

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {items.map((faq, index) => (
              <StaggerItem key={index}>
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass overflow-hidden rounded-xl border-none px-6 transition-shadow hover:shadow-[0_10px_30px_rgba(2,8,24,0.45)]"
              >
                <AccordionTrigger className="py-5 text-start text-sm font-medium text-foreground hover:no-underline sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground text-start">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
              </StaggerItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
