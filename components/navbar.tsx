"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { waBuy } from "@/lib/whatsapp"

const navLinks = [
  { label: "ראשי", href: "/" },
  { label: "מחירים", href: "/#pricing" },
  { label: "רשימת ערוצים", href: "/channels-list" },
  { label: "מדריך התקנה", href: "/#installation" },
  { label: "בלוג", href: "/blog" },
  { label: "משווקים", href: "/#reseller" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight" dir="ltr">
            <span className="text-white">Israel</span>
            <span className="text-primary">IPTV</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={waBuy()}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-glow rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              הזמינו עכשיו
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="פתיחת תפריט"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t border-border/30 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={waBuy()}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-glow mt-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                הזמינו עכשיו
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
