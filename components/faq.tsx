"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/faq"

export default function FAQ() {
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-primary">שאלות נפוצות</span> לפני שמזמינים
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            לא מצאתם תשובה? כתבו לנו בוואטסאפ – עונים בעברית, מסביב לשעון.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass overflow-hidden rounded-xl border-none px-6"
              >
                <AccordionTrigger className="py-5 text-right text-sm font-medium text-foreground hover:no-underline sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground text-right">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
