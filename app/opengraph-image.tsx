import { ImageResponse } from 'next/og'

export const alt = 'Israel IPTV – 34,000+ live channels in 4K'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0A1F44',
          color: '#F1F5FF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: 40, left: 0, right: 0, height: 36, background: '#EEF3FF' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, height: 36, background: '#EEF3FF' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <svg width="150" height="150" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="s" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7DB2FF" />
                <stop offset="1" stopColor="#2D63D4" />
              </linearGradient>
            </defs>
            <rect x="4" y="8" width="56" height="40" rx="10" fill="url(#s)" />
            <rect x="5.2" y="13" width="53.6" height="4.5" fill="#FFFFFF" />
            <rect x="5.2" y="38.5" width="53.6" height="4.5" fill="#FFFFFF" />
            <path d="M27.5 21.6c0-1.2 1.3-1.9 2.3-1.3l10.4 6.4c1 .6 1 2 0 2.6l-10.4 6.4c-1 .6-2.3-.1-2.3-1.3z" fill="#FFFFFF" />
            <rect x="22" y="52" width="20" height="4" rx="2" fill="#5B9BFF" />
          </svg>
          <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, letterSpacing: 4 }}>
            <span>ISRAEL&nbsp;</span>
            <span style={{ color: '#5B9BFF' }}>IPTV</span>
          </div>
        </div>
        <div style={{ fontSize: 38, marginTop: 24, color: '#A9B8D9' }}>
          34,000+ live channels · 130,000+ movies & series · 4K
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 56, fontSize: 32 }}>
          {['Israeli & international TV', 'From 55 ILS / month'].map((t) => (
            <div
              key={t}
              style={{ padding: '14px 28px', borderRadius: 16, border: '2px solid #5B9BFF', color: '#5B9BFF' }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', top: 100, right: 80, fontSize: 30, color: '#A9B8D9' }}>
          israeliptv.co.il
        </div>
      </div>
    ),
    size,
  )
}
