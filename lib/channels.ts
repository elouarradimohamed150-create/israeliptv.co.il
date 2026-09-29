import fs from 'node:fs'
import path from 'node:path'

export interface Channel {
  id: number
  name: string
  category: string
  logo: string
}

let cached: Channel[] | null = null

// The raw list is ~9 MB, so it stays on the server and is served in pages.
export function getChannels(): Channel[] {
  if (cached) return cached
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'channels.json'), 'utf8')) as Channel[]
    // Drop "##### SPORTS #####" style divider rows from the provider's playlist
    cached = raw.filter((c) => c.name && !/^#+/.test(c.name.trim()))
  } catch (e) {
    console.error('Error loading channels:', e)
    cached = []
  }
  return cached
}

export function searchChannels(query: string, offset = 0, limit = 60) {
  const term = query.trim().toLowerCase()
  const all = getChannels()
  const matches = term
    ? all.filter((c) => c.name.toLowerCase().includes(term) || c.category?.toLowerCase().includes(term))
    : all
  return { items: matches.slice(offset, offset + limit), total: matches.length }
}
