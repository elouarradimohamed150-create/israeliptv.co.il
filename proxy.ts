import { NextResponse, type NextRequest } from 'next/server'

// Malformed percent-encoding in the URL (e.g. "/%d7%9") makes Next.js throw a 500 while
// decoding the [slug] param, even after a rewrite. Answer those directly with a 404 page.
function isMalformed(rawPath: string) {
  if (/%(?![0-9a-fA-F]{2})/.test(rawPath)) return true
  try {
    decodeURIComponent(rawPath)
    return false
  } catch {
    return true
  }
}

const notFoundHtml = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>הדף לא נמצא | Israel IPTV</title></head>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0A1F44;color:#F1F5FF;font-family:Heebo,Arial,sans-serif;text-align:center">
<main><p style="font-size:64px;font-weight:800;margin:0;color:#5B9BFF">404</p><h1 style="margin:8px 0 24px;font-size:22px">הדף לא נמצא</h1>
<a href="/" style="display:inline-block;background:#5B9BFF;color:#06163A;padding:12px 28px;border-radius:12px;font-weight:700;text-decoration:none">לדף הבית של Israel IPTV</a></main></body></html>`

export function proxy(request: NextRequest) {
  // request.url keeps the path exactly as the client sent it
  const rawPath = request.url.replace(/^[a-z]+:\/\/[^/]+/i, '').split(/[?#]/)[0]
  if (isMalformed(rawPath)) {
    return new NextResponse(notFoundHtml, { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } })
  }
  return NextResponse.next()
}

// No `matcher` on purpose: Next.js decodes the path to test a matcher, which fails on
// exactly the malformed URLs this is meant to catch, so the proxy would be skipped.
