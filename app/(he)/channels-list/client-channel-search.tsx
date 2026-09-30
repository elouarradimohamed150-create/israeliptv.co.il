'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, Globe, Loader2 } from 'lucide-react'
import type { Channel } from '@/lib/channels'

interface Page {
  items: Channel[]
  total: number
}

// icon-tmdb.net (most of the provider's logos) is offline, so don't request those at all
const DEAD_LOGO_HOSTS = ['icon-tmdb.net']

function logoUrl(logo: string) {
  const raw = logo?.replace(/^https?:\/\//, '') || ''
  if (!raw || DEAD_LOGO_HOSTS.some((h) => raw.startsWith(h))) return null
  return `https://images.weserv.nl/?url=${encodeURIComponent(raw)}&w=300&h=300&fit=contain`
}

function initials(name: string) {
  const clean = name.replace(/^[A-Z0-9]{2,4}\s*[:|]\s*/, '').replace(/[^\p{Lu}\p{Ll}\p{Lo}\p{Nd} ]/gu, ' ').trim()
  return clean.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'TV'
}

function ChannelLogo({ channel }: { channel: Channel }) {
  const src = logoUrl(channel.logo)
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return <span className="text-3xl font-black text-primary/70">{initials(channel.name)}</span>
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={channel.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
    />
  )
}

export default function ClientChannelSearch({ initial }: { initial: Page }) {
  const [query, setQuery] = useState('')
  const [channels, setChannels] = useState(initial.items)
  const [total, setTotal] = useState(initial.total)
  const [loading, setLoading] = useState(false)
  const firstRender = useRef(true)

  async function load(q: string, offset: number) {
    setLoading(true)
    try {
      const res = await fetch(`/api/channels?q=${encodeURIComponent(q)}&offset=${offset}`)
      const page: Page = await res.json()
      setChannels((prev) => (offset === 0 ? page.items : [...prev, ...page.items]))
      setTotal(page.total)
    } finally {
      setLoading(false)
    }
  }

  // Debounced search
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const t = setTimeout(() => load(query, 0), 250)
    return () => clearTimeout(t)
  }, [query])

  return (
    <>
      <div className="relative mx-auto mb-6 max-w-3xl">
        <div className="absolute -inset-1 rounded-[2rem] bg-primary opacity-10 blur"></div>
        <div className="relative flex items-center overflow-hidden rounded-[2rem] border border-border bg-muted shadow-xl">
          <Search className="ms-6 h-6 w-6 text-muted-foreground" />
          <input
            type="search"
            aria-label="חיפוש ערוץ"
            placeholder="חיפוש ערוץ או קטגוריה (לדוגמה: Israel, Sport, Kids)"
            className="w-full bg-transparent py-6 pe-8 ps-4 text-xl font-semibold text-foreground outline-none placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {loading && <Loader2 className="me-6 h-5 w-5 animate-spin text-primary" />}
        </div>
      </div>

      <p className="mb-10 text-center text-sm text-muted-foreground" aria-live="polite">
        {total.toLocaleString('en-US')} ערוצים {query && `עבור "${query}"`}
      </p>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="group rounded-3xl border border-border bg-muted p-4 transition-all duration-300 hover:border-primary hover:shadow-[0_8px_24px_rgba(0,56,184,0.12)]"
          >
            <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-background">
              <ChannelLogo channel={channel} />
            </div>
            <h2 className="mb-2 line-clamp-2 min-h-[34px] text-[12px] font-bold leading-tight text-foreground" dir="auto">
              {channel.name}
            </h2>
            <div className="flex items-center gap-1 truncate rounded-xl bg-primary/10 px-2.5 py-1.5 text-[10px] font-extrabold text-primary" dir="auto">
              <Globe className="h-3 w-3 shrink-0" />
              <span className="truncate">{channel.category || 'בינלאומי'}</span>
            </div>
          </div>
        ))}
      </div>

      {channels.length < total && (
        <div className="mt-16 pb-10 text-center">
          <button
            onClick={() => load(query, channels.length)}
            disabled={loading}
            className="rounded-full bg-primary px-12 py-5 font-black text-primary-foreground shadow-xl shadow-primary/10 transition-all hover:scale-105 disabled:opacity-60"
          >
            {loading ? 'טוען...' : 'טענו ערוצים נוספים'}
          </button>
        </div>
      )}
    </>
  )
}
