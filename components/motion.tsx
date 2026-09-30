"use client"

import { MotionConfig, motion, useScroll, useSpring, type Variants } from "framer-motion"
import type { ReactNode } from "react"

// Honour the OS "reduce motion" setting for every framer-motion animation on the site
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

// Thin flag-blue bar at the top that fills as you scroll
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-[0%] bg-primary rtl:origin-[100%]"
    />
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Fade + rise when scrolled into view. Children can be server-rendered.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Container whose <StaggerItem> children animate in one after another
export function Stagger({
  children,
  className,
  gap = 0.08,
  as = "div",
}: {
  children: ReactNode
  className?: string
  gap?: number
  as?: "div" | "ul" | "tbody"
}) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Comp>
  )
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "li" | "tr"
}) {
  const Comp = motion[as]
  return (
    <Comp className={className} variants={fadeUp}>
      {children}
    </Comp>
  )
}
