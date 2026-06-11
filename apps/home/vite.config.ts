import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'

const DECKS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../decks',
)

interface DeckMeta {
  slug: string
  title: string
  subtitle?: string
  description?: string
  date?: string
  tags?: string[]
  accent?: string
  emoji?: string
}

function readDecks(): DeckMeta[] {
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

// Exposes each deck's deck.json as the `virtual:decks` module.
function decksManifestPlugin(): Plugin {
  const id = 'virtual:decks'
  return {
    name: 'decks-manifest',
    resolveId(source) {
      return source === id ? `\0${id}` : undefined
    },
    load(source) {
      if (source === `\0${id}`) {
        return `export const decks = ${JSON.stringify(readDecks(), null, 2)}`
      }
      return undefined
    },
  }
}

export default defineConfig({
  plugins: [vue(), decksManifestPlugin()],
})
