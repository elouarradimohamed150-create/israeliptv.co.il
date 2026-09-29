import { site, type Plan, type Devices } from '@/lib/site'

const BASE = `https://wa.me/${site.whatsappNumber}`

const withText = (msg: string) => `${BASE}?text=${encodeURIComponent(msg)}`

/** "הזמינו עכשיו" on a specific plan */
export function waBuyPlan(plan: Plan, devices: Devices) {
  const deviceLabel = devices === 1 ? '1 Device' : `${devices} Devices`
  return withText(`${site.domain} - ${plan.labelEn} / ${deviceLabel} - ${plan.prices[devices]} ILS`)
}

/** Generic order button with no specific plan (hero, navbar) */
export function waBuy() {
  return withText(`${site.domain} - I want to subscribe`)
}

/** One-day pass, used as the "try it" option */
export function waTrial() {
  return withText(`${site.domain} - I want to try the 1 day plan`)
}

/** Reseller enquiries */
export function waReseller() {
  return withText(`${site.domain} - I want to become a reseller`)
}

/** Generic contact (no pre-filled message) */
export const waContact = BASE
