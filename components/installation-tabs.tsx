"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MonitorPlay, Flame, Smartphone, Apple, Download, Settings, Play } from "lucide-react"

const tabs = [
  {
    id: "smart-tv",
    label: "Samsung / LG",
    icon: MonitorPlay,
    steps: [
      {
        icon: Download,
        title: "מתקינים נגן מהחנות",
        description: "בחנות האפליקציות של הטלוויזיה מחפשים IBO Player, Smart IPTV או IPTV Smarters ומתקינים. זה לוקח פחות מדקה.",
      },
      {
        icon: Settings,
        title: "מזינים את הפרטים מהוואטסאפ",
        description: "פותחים את הנגן ומעתיקים את שם המשתמש, הסיסמה וכתובת השרת ששלחנו לכם. אם הנגן מציג קוד MAC – שלחו לנו אותו ונחבר אתכם מרחוק.",
      },
      {
        icon: Play,
        title: "צופים",
        description: "הערוצים נטענים אוטומטית לפי קטגוריות, כולל מדריך שידורים. אפשר להוסיף ערוצים למועדפים ולעבור ביניהם עם השלט.",
      },
    ],
  },
  {
    id: "firestick",
    label: "Fire Stick",
    icon: Flame,
    steps: [
      {
        icon: Download,
        title: "מאפשרים התקנה מ-Downloader",
        description: "בהגדרות: My Fire TV → Developer Options → Install unknown apps, ומאשרים את אפליקציית Downloader מחנות אמזון.",
      },
      {
        icon: Settings,
        title: "מורידים את הנגן",
        description: "ב-Downloader מקלידים את הקוד ששלחנו לכם בוואטסאפ, מתקינים את הנגן ומזינים את פרטי המנוי.",
      },
      {
        icon: Play,
        title: "צופים",
        description: "מוסיפים את הנגן למסך הבית כדי לפתוח אותו בלחיצה אחת, ומתחילים לצפות בכל הערוצים וה-VOD.",
      },
    ],
  },
  {
    id: "android",
    label: "Android / MAG",
    icon: Smartphone,
    steps: [
      {
        icon: Download,
        title: "מתקינים מ-Google Play",
        description: "ב-Android TV, בטלפון או בטאבלט מתקינים IPTV Smarters Pro או TiviMate. בממיר MAG אין צורך באפליקציה.",
      },
      {
        icon: Settings,
        title: "מחברים את המנוי",
        description: "באפליקציה בוחרים Xtream Codes ומזינים את הפרטים. בממיר MAG שולחים לנו את כתובת ה-MAC ומזינים את כתובת הפורטל שנשלח לכם.",
      },
      {
        icon: Play,
        title: "צופים",
        description: "הרשימה נטענת תוך שניות. ב-TiviMate אפשר גם להקליט ולחזור אחורה בשידור (בחבילות עם Catch-Up).",
      },
    ],
  },
  {
    id: "apple",
    label: "iPhone / Apple TV",
    icon: Apple,
    steps: [
      {
        icon: Download,
        title: "מורידים מה-App Store",
        description: "מתקינים IPTV Smarters Player Lite או GSE Smart IPTV באייפון, באייפד או ב-Apple TV.",
      },
      {
        icon: Settings,
        title: "מוסיפים משתמש",
        description: "בוחרים Login with Xtream Codes API ומזינים את שם המשתמש, הסיסמה וכתובת השרת מהוואטסאפ.",
      },
      {
        icon: Play,
        title: "צופים בכל מקום",
        description: "רואים את הערוצים גם מחוץ לבית, בכל חיבור אינטרנט – כולל ב-AirPlay לטלוויזיה.",
      },
    ],
  },
]

export default function InstallationTabs() {
  const [activeTab, setActiveTab] = useState("smart-tv")
  const activeData = tabs.find((t) => t.id === activeTab)!

  return (
    <section id="installation" className="relative scroll-mt-20 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            מתקינים ב-<span className="text-primary">3 צעדים</span> ומתחילים לצפות
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            בחרו את המכשיר שלכם. נתקעתם? שלחו לנו הודעה בוואטסאפ ונעשה את זה איתכם – בחינם.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "neon-glow bg-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-6 md:grid-cols-3"
          >
            {activeData.steps.map((step, index) => (
              <div key={step.title} className="glass relative rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
