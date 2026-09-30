import { site } from '@/lib/site'

// Shared by the FAQ section and the FAQPage JSON-LD, so the two always match.
export const faqs = [
  {
    question: 'מה זה Israel IPTV?',
    answer: `Israel IPTV הוא שירות מנויי טלוויזיה באינטרנט (IPTV) לצופים בישראל ולישראלים בחו״ל. המנוי כולל ${site.channels}+ ערוצים בשידור חי – בהם הערוצים הישראליים, ספורט, חדשות וסרטים – ו-${site.vod}+ סרטים וסדרות באיכות עד 4K. הוא עובד על טלוויזיות חכמות, Fire Stick, אנדרואיד, אייפון ומחשב, עולה מ-₪55 לחודש, ללא התחייבות ועם החזר כספי תוך ${site.refundDays} ימים.`,
  },
  {
    question: 'מה זה IPTV ואיך זה שונה מכבלים או לוויין?',
    answer:
      'IPTV (Internet Protocol Television) מעביר את שידורי הטלוויזיה דרך חיבור האינטרנט במקום דרך כבל או צלחת. אין צורך בטכנאי, בממיר או בהתחייבות – מספיק אינטרנט יציב ואפליקציה חינמית במכשיר שכבר יש לכם בבית.',
  },
  {
    question: `כמה עולה מנוי ${site.name}?`,
    answer:
      'אפשר להתחיל ביום אחד ב-₪13 כדי לבדוק את השירות. מנוי חודשי עולה ₪55, ומנוי שנתי ₪249 בלבד – כ-₪21 לחודש. יש גם חבילות ל-2 ו-3 מכשירים במקביל.',
  },
  {
    question: 'איך מזמינים ומשלמים?',
    answer:
      'לוחצים על "הזמינו עכשיו" ליד החבילה שבחרתם, ונפתחת שיחת וואטסאפ עם הפרטים שכבר מולאו. הנציג שולח קישור לתשלום מאובטח (PayPal או כרטיס אשראי), ומיד לאחר האישור תקבלו את פרטי ההתחברות.',
  },
  {
    question: 'תוך כמה זמן המנוי פעיל?',
    answer:
      'ברוב המקרים תוך דקות ספורות מרגע אישור התשלום. ההזמנות נבדקות ידנית מטעמי אבטחה, ולכן בשעות עומס זה יכול לקחת עד כמה שעות. אם לא קיבלתם פרטים – כתבו לנו בוואטסאפ.',
  },
  {
    question: 'על אילו מכשירים זה עובד?',
    answer:
      'טלוויזיות חכמות של Samsung ו-LG, Android TV, Amazon Fire Stick, ממירי MAG, אייפון, אייפד, Apple TV, טלפונים וטאבלטים של אנדרואיד, ומחשבי Windows ו-Mac.',
  },
  {
    question: 'אפשר לצפות בכמה מכשירים במקביל?',
    answer:
      'כל חבילה מוגדרת למספר מסוים של מכשירים שצופים בו-זמנית: 1, 2 או 3. בוחרים את מספר המכשירים בטבלת המחירים. צריכים יותר מ-3? דברו איתנו ונתאים לכם חבילה.',
  },
  {
    question: 'צריך VPN?',
    answer: 'לא. השירות עובד ישירות מול כל ספקי האינטרנט בישראל, בלי VPN ובלי הגדרות מיוחדות.',
  },
  {
    question: 'מה קורה אם השירות לא מתאים לי?',
    answer: `יש החזר כספי מלא תוך ${site.refundDays} ימים ממועד ההפעלה. פונים אלינו בוואטסאפ ומטפלים בבקשה תוך 1–3 ימי עסקים. הפרטים המלאים במדיניות ההחזרים.`,
  },
  {
    question: 'איך מחדשים את המנוי?',
    answer:
      'אין חיוב אוטומטי. לקראת סוף התקופה נשלח לכם תזכורת, ואם תרצו להמשיך – מחדשים בוואטסאפ עם אותם פרטי התחברות.',
  },
  {
    question: 'אפשר למכור את השירות כמשווק?',
    answer:
      'כן. משווקים מקבלים פאנל ניהול, קרדיטים במחיר סיטונאי ותמיכה ישירה. פרטים בתוכנית המשווקים או בוואטסאפ.',
  },
]

export const faqsEn = [
  {
    question: 'What is Israel IPTV?',
    answer: `Israel IPTV is an internet TV (IPTV) subscription for viewers in Israel and Israelis abroad. It includes ${site.channels}+ live channels – including Israeli channels, sports, news and movies – plus ${site.vod}+ movies and series in up to 4K. It works on Smart TVs, Fire Stick, Android, iPhone and computers, starts at ₪55 per month, has no contract and comes with a ${site.refundDays}-day money-back guarantee.`,
  },
  {
    question: 'How much does Israel IPTV cost?',
    answer:
      'You can start with a 1-day pass for ₪13 to test the service. One month costs ₪55 and a full year is ₪249 – about ₪21 per month. Plans for 2 or 3 simultaneous devices are also available.',
  },
  {
    question: 'How do I order and pay?',
    answer:
      'Click "Order on WhatsApp" next to the plan you want. A WhatsApp chat opens with your plan already filled in. Our team sends a secure payment link (PayPal or credit card), and your login details arrive right after payment is confirmed.',
  },
  {
    question: 'How fast is my subscription activated?',
    answer:
      'Usually within a few minutes of payment. Orders are checked manually for security, so at busy times it can take up to a few hours. If you have not received your details, message us on WhatsApp.',
  },
  {
    question: 'Which devices does it work on?',
    answer:
      'Samsung and LG Smart TVs, Android TV, Amazon Fire Stick, MAG boxes, iPhone, iPad, Apple TV, Android phones and tablets, and Windows and Mac computers.',
  },
  {
    question: 'Can I watch on several devices at once?',
    answer:
      'Each plan is set for a number of simultaneous devices: 1, 2 or 3. Choose the number of devices in the pricing table. Need more than 3? Contact us and we will build a plan for you.',
  },
  {
    question: 'Can I watch Israeli TV from abroad?',
    answer:
      'Yes. Israel IPTV works over any internet connection, so Israelis living or travelling abroad can watch Israeli channels, news and sports from anywhere – no VPN needed.',
  },
  {
    question: 'What if the service is not right for me?',
    answer: `You get a full refund within ${site.refundDays} days of activation. Contact us on WhatsApp and the request is handled within 1–3 business days.`,
  },
  {
    question: 'How do I renew?',
    answer:
      'There is no automatic billing. We remind you before your plan ends, and you renew on WhatsApp with the same login details.',
  },
  {
    question: 'Can I become a reseller?',
    answer:
      'Yes. Resellers get a management panel, credits at wholesale prices and direct support. Contact us on WhatsApp for details.',
  },
]
