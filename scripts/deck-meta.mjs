import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, stringify } from 'yaml'
import { SITE, deckUrl } from './site.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DECKS_DIR = path.join(ROOT, 'decks')

/** Headmatter keys derived from deck.json — must not appear in slides.md. */
export const DERIVED_HEADMATTER_KEYS = ['title', 'author', 'info', 'seoMeta']

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/

/** @returns {{ slug: string, title: string, subtitle?: string, description?: string, date?: string, tags?: string[], accent?: string, emoji?: string, author?: string }} */
export function readDeckMeta(slug, root = ROOT) {
  const metaPath = path.join(root, 'decks', slug, 'deck.json')
  if (!fs.existsSync(metaPath)) {
    throw new Error(`Missing decks/${slug}/deck.json`)
  }
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
  return { slug, ...meta }
}

export function deckDisplayTitle(deck) {
  if (deck.subtitle) return `${deck.title} — ${deck.subtitle}`
  return deck.title
}

export function deckInfo(deck) {
  if (deck.description) return deck.description
  return `${deck.title} — a talk by ${SITE.author}.`
}

export function deckSeoMeta(slug, deck) {
  const title = deckDisplayTitle(deck)
  const description = deckInfo(deck)
  const url = deckUrl(slug)
  const image = `${url}og-image.png`

  return {
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: image,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  }
}

/** Slidev headmatter fields injected from deck.json. */
export function deckHeadmatter(slug, deck) {
  return {
    title: deckDisplayTitle(deck),
    author: deck.author ?? SITE.author,
    info: deckInfo(deck),
    seoMeta: deckSeoMeta(slug, deck),
  }
}

export function splitFrontmatter(content) {
  const match = content.match(FRONTMATTER_RE)
  if (!match) {
    throw new Error('slides.md must start with YAML frontmatter')
  }

  return {
    frontmatter: match[1],
    body: content.slice(match[0].length),
  }
}

export function applyDeckMetaToSlides(content, slug, deck) {
  const { frontmatter, body } = splitFrontmatter(content)
  const base = parse(frontmatter) ?? {}
  const merged = { ...base, ...deckHeadmatter(slug, deck) }
  return `---\n${stringify(merged).trimEnd()}\n---${body}`
}

export function validateDeckSlides(slug, root = ROOT) {
  const slidesPath = path.join(root, 'decks', slug, 'slides.md')
  const content = fs.readFileSync(slidesPath, 'utf8')
  const { frontmatter } = splitFrontmatter(content)
  const base = parse(frontmatter) ?? {}
  const duplicates = DERIVED_HEADMATTER_KEYS.filter((key) => key in base)

  if (duplicates.length) {
    throw new Error(
      `decks/${slug}/slides.md defines ${duplicates.join(', ')} — edit deck.json instead (injected at build time)`,
    )
  }
}

export function validateAllDeckSlides(root = ROOT) {
  if (!fs.existsSync(DECKS_DIR)) return

  const slugs = fs
    .readdirSync(DECKS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  for (const slug of slugs) {
    validateDeckSlides(slug, root)
  }
}

export function deckSlidesPath(slug, root = ROOT) {
  return path.join(root, 'decks', slug, 'slides.md')
}
