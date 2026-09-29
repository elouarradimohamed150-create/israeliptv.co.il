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
          background: 'linear-gradient(135deg, #0B0F13 0%, #0d1f1a 100%)',
          color: '#F8FAFC',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 120, fontWeight: 800, letterSpacing: -3 }}>
          <span>Israel&nbsp;</span>
          <span style={{ color: '#10B981' }}>IPTV</span>
        </div>
        <div style={{ fontSize: 44, marginTop: 24, color: '#94A3B8' }}>
          34,000+ live channels · 130,000+ movies & series · 4K
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 56, fontSize: 32 }}>
          {['Kan 11 · Keshet 12 · Reshet 13', 'From 55 ILS / month'].map((t) => (
            <div
              key={t}
              style={{ padding: '14px 28px', borderRadius: 16, border: '2px solid #10B981', color: '#10B981' }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 60, right: 80, fontSize: 30, color: '#64748B' }}>
          israeliptv.co.il
        </div>
      </div>
    ),
    size,
  )
}
