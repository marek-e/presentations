import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  applyDeckMetaToSlides,
  deckSlidesPath,
  readDeckMeta,
} from './deck-meta.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export const SLIDEV_ENTRY_FILENAME = 'slides.entry.md'

/** @param {string} slug @param {string} [root] */
export function deckRoot(slug, root = ROOT) {
  return path.join(root, 'decks', slug)
}

/** @param {string} slug @param {string} [root] */
export function slidevEntryPath(slug, root = ROOT) {
  return path.join(deckRoot(slug, root), SLIDEV_ENTRY_FILENAME)
}

/** @param {string} [cwd] @param {string} [root] */
export function detectDeckSlug(cwd = process.cwd(), root = ROOT) {
  if (process.env.DECK_SLUG) return process.env.DECK_SLUG

  const decksDir = path.join(root, 'decks') + path.sep
  const normalized = path.resolve(cwd)
  if (normalized.startsWith(decksDir)) {
    const rest = normalized.slice(decksDir.length)
    const slug = rest.split(path.sep)[0]
    if (slug && /^[a-z0-9][a-z0-9-]*$/.test(slug)) return slug
  }

  throw new Error(
    'Could not detect deck slug. Run from decks/<slug>, set DECK_SLUG, or use pnpm --filter deck-<slug>.',
  )
}

/**
 * Merge deck.json headmatter into slides.md and write slides.entry.md.
 * Slidev reads the entry from disk before Vite transforms, so this must run
 * before the CLI starts (and stay in sync during dev when sources change).
 *
 * @param {string} slug
 * @param {string} [root]
 */
export function writeSlidevEntry(slug, root = ROOT) {
  const slidesPath = deckSlidesPath(slug, root)
  const entryPath = slidevEntryPath(slug, root)
  const content = fs.readFileSync(slidesPath, 'utf8')
  const deck = readDeckMeta(slug, root)
  const merged = applyDeckMetaToSlides(content, slug, deck)
  fs.writeFileSync(entryPath, merged)
  return entryPath
}
