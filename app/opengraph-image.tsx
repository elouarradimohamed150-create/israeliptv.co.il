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
          background: '#FFFFFF',
          color: '#0B1B3F',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: 40, left: 0, right: 0, height: 36, background: '#0038B8' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, height: 36, background: '#0038B8' }} />
        <div style={{ display: 'flex', fontSize: 120, fontWeight: 800, letterSpacing: -3 }}>
          <span>Israel&nbsp;</span>
          <span style={{ color: '#0038B8' }}>IPTV</span>
        </div>
        <div style={{ fontSize: 44, marginTop: 24, color: '#475673' }}>
          34,000+ live channels · 130,000+ movies & series · 4K
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 56, fontSize: 32 }}>
          {['Israeli & international TV', 'From 55 ILS / month'].map((t) => (
            <div
              key={t}
              style={{ padding: '14px 28px', borderRadius: 16, border: '2px solid #0038B8', color: '#0038B8' }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 96, right: 80, fontSize: 30, color: '#475673' }}>
          israeliptv.co.il
        </div>
      </div>
    ),
    size,
  )
}
