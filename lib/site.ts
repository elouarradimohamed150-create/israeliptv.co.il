// Brand details for israeliptv.co.il. Change them here, not in components.
export const site = {
  name: 'Israel IPTV',
  // Focus keyword: always the exact English phrase "Israel IPTV"
  keyword: 'Israel IPTV',
  // Shown as "עודכן לאחרונה" and used as dateModified - bump when prices/facts change
  lastUpdated: '2026-09-29',
  // Primary address: Vercel redirects the bare domain to www, so canonical URLs use www too
  url: 'https://www.israeliptv.co.il',
  domain: 'israeliptv.co.il',
  whatsappNumber: '212707711512',
  whatsappDisplay: '+212 707 711 512',
  channels: '34,000',
  vod: '130,000',
  refundDays: 7,
}

export type Devices = 1 | 2 | 3

export interface Plan {
  id: string
  label: string // Hebrew duration label
  labelEn: string // used in the WhatsApp order message
  months: number | null // null = one-day pass
  prices: Record<Devices, number> // ILS
  popular?: boolean
  perks: string[]
  perksEn: string[]
}

// Prices in ILS, per number of simultaneous devices.
export const plans: Plan[] = [
  {
    id: '1d',
    label: 'יום אחד',
    labelEn: '1 Day',
    months: null,
    prices: { 1: 13, 2: 25, 3: 39 },
    perks: ['מושלם לבדיקת השירות', 'הפעלה תוך דקות'],
    perksEn: ['Perfect for testing the service', 'Activated within minutes'],
  },
  {
    id: '1m',
    label: 'חודש אחד',
    labelEn: '1 Month',
    months: 1,
    prices: { 1: 55, 2: 94, 3: 126 },
    perks: ['ללא התחייבות'],
    perksEn: ['No commitment'],
  },
  {
    id: '3m',
    label: '3 חודשים',
    labelEn: '3 Months',
    months: 3,
    prices: { 1: 119, 2: 176, 3: 256 },
    perks: ['גמישות ללא התחייבות ארוכה'],
    perksEn: ['Flexible, no long commitment'],
  },
  {
    id: '6m',
    label: '6 חודשים',
    labelEn: '6 Months',
    months: 6,
    prices: { 1: 159, 2: 272, 3: 379 },
    perks: ['צפייה חוזרת (Catch-Up)'],
    perksEn: ['Catch-Up TV'],
  },
  {
    id: '12m',
    label: 'שנה אחת',
    labelEn: '12 Months',
    months: 12,
    prices: { 1: 249, 2: 353, 3: 612 },
    popular: true,
    perks: ['צפייה חוזרת (Catch-Up)', 'עדיפות בתמיכה'],
    perksEn: ['Catch-Up TV', 'Priority support'],
  },
  {
    id: '24m',
    label: 'שנתיים',
    labelEn: '24 Months',
    months: 24,
    prices: { 1: 365, 2: 645, 3: 962 },
    perks: ['המחיר החודשי הנמוך ביותר', 'צפייה חוזרת (Catch-Up)', 'תמיכת VIP'],
    perksEn: ['Lowest monthly price', 'Catch-Up TV', 'VIP support'],
  },
]

export const planFeatures = [
  `${site.channels}+ ערוצים בשידור חי – ישראל ועולם`,
  `${site.vod}+ סרטים וסדרות VOD`,
  'איכות 4K / FHD / HD',
  'טכנולוגיית Anti-Freeze למניעת תקיעות',
  'מדריך שידורים (EPG)',
  'עדכונים אוטומטיים ללא עלות',
  `החזר כספי תוך ${site.refundDays} ימים`,
  'תמיכה בעברית 24/7',
]

export const planFeaturesEn = [
  `${site.channels}+ live channels – Israel and worldwide`,
  `${site.vod}+ movies and series on demand`,
  '4K / FHD / HD quality',
  'Anti-Freeze technology',
  'Full TV guide (EPG)',
  'Free automatic updates',
  `${site.refundDays}-day money-back guarantee`,
  '24/7 support in Hebrew and English',
]
