#!/usr/bin/env node
/**
 * Scaffolds a new deck from templates/deck:
 *   pnpm new <slug> ["Title"]
 * Creates decks/<slug>/ served at presentations.melmayan.fr/<slug>.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeDeckOgImages } from './og-image.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TEMPLATE = path.join(ROOT, 'templates/deck')

const [slug, titleArg] = process.argv.slice(2)

if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error('Usage: pnpm new <slug> ["Title"]')
  console.error('Slug must be lowercase letters, digits, and dashes (it becomes the URL).')
  process.exit(1)
}

const dest = path.join(ROOT, 'decks', slug)
if (fs.existsSync(dest)) {
  console.error(`decks/${slug} already exists.`)
  process.exit(1)
}

const title =
  titleArg ??
  slug
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')

const date = new Date().toISOString().slice(0, 7) // YYYY-MM

fs.cpSync(TEMPLATE, dest, { recursive: true })

for (const file of ['package.json', 'deck.json', 'slides.md', 'vite.config.ts']) {
  const p = path.join(dest, file)
  const content = fs
    .readFileSync(p, 'utf8')
    .replaceAll('__SLUG__', slug)
    .replaceAll('__TITLE__', title)
    .replaceAll('__DATE__', date)
  fs.writeFileSync(p, content)
}

const deckMeta = JSON.parse(fs.readFileSync(path.join(dest, 'deck.json'), 'utf8'))
await writeDeckOgImages({ slug, ...deckMeta })

console.log(`✓ Created decks/${slug} ("${title}")`)
console.log('\nNext steps:')
console.log('  pnpm install')
console.log(`  pnpm dev ${slug}                       # → http://localhost:3030/${slug}/`)
console.log(`  pnpm --filter deck-${slug} dev      # deck only → http://localhost:3030/${slug}/`)
console.log(`\nIt will be live at https://presentations.melmayan.fr/${slug} on the next deploy.`)
