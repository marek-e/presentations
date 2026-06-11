import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const SITE_URL = 'https://presentations.melmayan.fr'

export const SITE = {
  url: SITE_URL,
  name: 'Presentations — melmayan',
  shortName: 'Presentations',
  description:
    'Talks and presentations by Marek Elmayan — security, web, and whatever else seemed worth ranting about.',
  author: 'Marek Elmayan',
  authorUrl: 'https://melmayan.fr',
  locale: 'en_US',
  ogImage: `${SITE_URL}/og-image.png`,
  themeColor: '#355C7D',
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DECKS_DIR = path.join(ROOT, 'decks')

/** @returns {Array<{ slug: string, title: string, subtitle?: string, description?: string, date?: string, tags?: string[], accent?: string, emoji?: string }>} */
export function readDecks() {
  if (!fs.existsSync(DECKS_DIR)) return []

  return fs
    .readdirSync(DECKS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const metaPath = path.join(DECKS_DIR, e.name, 'deck.json')
      const meta = fs.existsSync(metaPath)
        ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
        : { title: e.name }
      return { slug: e.name, ...meta }
    })
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

export function deckUrl(slug) {
  return `${SITE_URL}/${slug}/`
}

export function deckLastMod(date) {
  if (!date) return undefined
  const [year, month] = date.split('-')
  if (!year) return undefined
  if (!month) return `${year}-01-01`
  return `${year}-${month.padStart(2, '0')}-01`
}
