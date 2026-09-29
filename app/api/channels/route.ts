import { NextResponse } from 'next/server'
import { searchChannels } from '@/lib/channels'

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') ?? '').slice(0, 100)
  const offset = Math.max(0, Number(searchParams.get('offset')) || 0)
  return NextResponse.json(searchChannels(q, offset, 60), {
    headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
  })
}
