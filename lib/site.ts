// Brand details for israeliptv.co.il. Change them here, not in components.
export const site = {
  name: 'Israel IPTV',
  url: 'https://israeliptv.co.il',
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
  },
  {
    id: '1m',
    label: 'חודש אחד',
    labelEn: '1 Month',
    months: 1,
    prices: { 1: 55, 2: 94, 3: 126 },
    perks: ['ללא התחייבות'],
  },
  {
    id: '3m',
    label: '3 חודשים',
    labelEn: '3 Months',
    months: 3,
    prices: { 1: 119, 2: 176, 3: 256 },
    perks: ['גמישות ללא התחייבות ארוכה'],
  },
  {
    id: '6m',
    label: '6 חודשים',
    labelEn: '6 Months',
    months: 6,
    prices: { 1: 159, 2: 272, 3: 379 },
    perks: ['צפייה חוזרת (Catch-Up)'],
  },
  {
    id: '12m',
    label: 'שנה אחת',
    labelEn: '12 Months',
    months: 12,
    prices: { 1: 249, 2: 353, 3: 612 },
    popular: true,
    perks: ['צפייה חוזרת (Catch-Up)', 'עדיפות בתמיכה'],
  },
  {
    id: '24m',
    label: 'שנתיים',
    labelEn: '24 Months',
    months: 24,
    prices: { 1: 365, 2: 645, 3: 962 },
    perks: ['המחיר החודשי הנמוך ביותר', 'צפייה חוזרת (Catch-Up)', 'תמיכת VIP'],
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
