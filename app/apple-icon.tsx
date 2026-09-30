import { ImageResponse } from 'next/og'

// iPhone home-screen / Google logo (PNG): the Israel IPTV mark on navy
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0A1F44' }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="s" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7DB2FF" />
              <stop offset="1" stopColor="#2D63D4" />
            </linearGradient>
          </defs>
          <rect x="8" y="12" width="48" height="34" rx="8" fill="url(#s)" />
          <rect x="9" y="16.5" width="46" height="4" fill="#FFFFFF" />
          <rect x="9" y="37.5" width="46" height="4" fill="#FFFFFF" />
          <path d="M28.5 23.2c0-1 1.1-1.6 2-1.1l8.8 5.4c.8.5.8 1.7 0 2.2l-8.8 5.4c-.9.5-2-.1-2-1.1z" fill="#FFFFFF" />
          <rect x="23" y="50" width="18" height="4" rx="2" fill="#5B9BFF" />
        </svg>
      </div>
    ),
    size,
  )
}
