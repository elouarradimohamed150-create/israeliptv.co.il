import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ArrowRight } from 'lucide-react'
import { waContact } from '@/lib/whatsapp'

interface Section {
  title: string
  content: string | string[]
}

interface Props {
  title: string
  lastUpdated: string
  intro: string
  sections: Section[]
}

export default function LegalLayout({ title, lastUpdated, intro, sections }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
        {/* Header */}
        <div className="mb-10 border-b border-border pb-8">
          <span className="mb-4 inline-block rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            משפטי
          </span>
          <h1 className="mt-3 text-3xl font-black md:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">עודכן לאחרונה: {lastUpdated}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="mb-3 flex items-center gap-3 text-xl font-bold text-foreground">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                <ul className="space-y-2 text-muted-foreground">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="leading-relaxed text-muted-foreground">{section.content}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact note */}
        <div className="mt-14 rounded-2xl border border-border bg-muted p-6 text-sm text-muted-foreground">
          יש לך שאלות בנוגע למדיניות זו? צור איתנו קשר דרך{' '}
          <Link
            href={waContact}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            WhatsApp
          </Link>{' '}
          — צוות התמיכה שלנו זמין 24/7.
        </div>

        {/* Back */}
        <div className="mt-8 border-t border-border pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה לדף הבית
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
