#!/usr/bin/env node
/**
 * Generates per-deck OG preview images (SVG + PNG) from deck.json metadata.
 * Output: decks/<slug>/public/og-image.{svg,png}
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { deckUrl, readDecks } from './site.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const WIDTH = 1200
const HEIGHT = 630

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatDate(date) {
  if (!date) return ''
  const [year, month] = date.split('-')
  const m = month ? MONTHS[Number(month) - 1] : undefined
  return m ? `${m} ${year}`.toUpperCase() : year
}

function wrapLines(text, maxChars, maxLines) {
  if (!text) return []
  const words = text.trim().split(/\s+/)
  const lines = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length <= maxChars) {
      current = next
      continue
    }
    if (current) lines.push(current)
    current = word
    if (lines.length >= maxLines) break
  }

  if (current && lines.length < maxLines) lines.push(current)

  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    const last = lines[maxLines - 1]
    lines[maxLines - 1] =
      last.length > maxChars - 1 ? `${last.slice(0, maxChars - 4)}…` : `${last}…`
  }

  return lines
}

function titleFontSize(title) {
  const len = title.length
  if (len > 36) return 56
  if (len > 28) return 64
  if (len > 20) return 72
  return 84
}

function tagPills(tags, accent, x, y) {
  if (!tags?.length) return ''

  let cursor = x
  const parts = []

  for (const tag of tags.slice(0, 5)) {
    const label = escapeXml(tag.toUpperCase())
    const width = Math.max(72, tag.length * 9 + 28)
    parts.push(`
  <rect x="${cursor}" y="${y}" width="${width}" height="28" rx="8" fill="${accent}12" stroke="${accent}2e" stroke-width="1" />
  <text x="${cursor + width / 2}" y="${y + 19}" text-anchor="middle" fill="#334155" font-family="sans-serif" font-size="13" font-weight="600" letter-spacing="0.5">${label}</text>`)
    cursor += width + 10
  }

  return parts.join('\n')
}

/** @param {{ slug: string, title: string, subtitle?: string, description?: string, date?: string, tags?: string[], accent?: string, emoji?: string }} deck */
export function buildDeckOgSvg(deck) {
  const accent = deck.accent ?? '#355C7D'
  const title = escapeXml(deck.title)
  const subtitle = deck.subtitle ? escapeXml(deck.subtitle) : ''
  const descriptionLines = wrapLines(deck.description ?? '', 72, 3)
  const dateLabel = formatDate(deck.date)
  const titleSize = titleFontSize(deck.title)

  const logoY = 72
  const logoScale = 1.85
  const logoBottom = logoY + (42 + 30) * logoScale
  const logoMargin = 28
  const kickerY = logoBottom + logoMargin + 18

  const titleY = kickerY + (subtitle ? 90 : 110)
  const subtitleY = titleY + titleSize * 0.62
  const dividerY = subtitle ? subtitleY + 28 : titleY + titleSize * 0.72
  const descriptionY = dividerY + 44
  const tagsY = descriptionLines.length ? descriptionY + descriptionLines.length * 30 + 28 : dividerY + 36

  const descriptionSvg = descriptionLines
    .map((line, i) => `<tspan x="96" dy="${i === 0 ? 0 : 30}">${escapeXml(line)}</tspan>`)
    .join('\n    ')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none">
  <defs>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="48" />
    </filter>
    <linearGradient id="footerFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f5f0ea" stop-opacity="0" />
      <stop offset="100%" stop-color="#f5f0ea" stop-opacity="0.55" />
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#fdfaf6" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#footerFade)" />

  <ellipse cx="1060" cy="120" rx="220" ry="180" fill="#C06C84" opacity="0.10" filter="url(#blur)" />
  <ellipse cx="980" cy="500" rx="260" ry="200" fill="${accent}" opacity="0.10" filter="url(#blur)" />
  <ellipse cx="140" cy="560" rx="240" ry="190" fill="#355C7D" opacity="0.07" filter="url(#blur)" />

  <g transform="translate(96 ${logoY}) scale(${logoScale})">
    <rect x="38" y="42" width="44" height="30" rx="8" fill="#F67280" stroke="#d4505f" stroke-width="3" />
    <rect x="31" y="35" width="44" height="30" rx="8" fill="#C06C84" stroke="#9d5069" stroke-width="3" />
    <rect x="24" y="28" width="44" height="30" rx="8" fill="#355C7D" stroke="#264761" stroke-width="3" />
  </g>

  ${dateLabel ? `<text x="1104" y="108" text-anchor="end" fill="#64748b" font-family="sans-serif" font-size="16" font-weight="600" letter-spacing="1.4">${escapeXml(dateLabel)}</text>` : ''}

  <text x="96" y="${kickerY}" fill="#C06C84" font-family="sans-serif" font-size="22" font-weight="600" letter-spacing="3.1">PRESENTATIONS.MELMAYAN.FR</text>

  <text x="96" y="${titleY}" fill="#0f172a" font-family="sans-serif" font-size="${titleSize}" font-weight="800" letter-spacing="-2.6">${title}</text>

  ${subtitle ? `<text x="96" y="${subtitleY}" fill="${accent}" font-family="sans-serif" font-size="32" font-weight="500" font-style="italic" letter-spacing="-0.5">${subtitle}</text>` : ''}

  <rect x="96" y="${dividerY}" width="48" height="4" rx="2" fill="${accent}" />

  ${descriptionLines.length ? `<text x="96" y="${descriptionY}" fill="#64748b" font-family="sans-serif" font-size="26" font-weight="400">
    ${descriptionSvg}
  </text>` : ''}

  ${tagPills(deck.tags, accent, 96, tagsY)}
</svg>
`
}

/** @param {{ slug: string, title: string, subtitle?: string, description?: string, date?: string, tags?: string[], accent?: string, emoji?: string }} deck */
export async function writeDeckOgImages(deck) {
  const publicDir = path.join(ROOT, 'decks', deck.slug, 'public')
  fs.mkdirSync(publicDir, { recursive: true })

  const svg = buildDeckOgSvg(deck)
  const svgPath = path.join(publicDir, 'og-image.svg')
  const pngPath = path.join(publicDir, 'og-image.png')

  fs.writeFileSync(svgPath, svg)
  await sharp(Buffer.from(svg)).png().toFile(pngPath)

  return { svgPath, pngPath, url: `${deckUrl(deck.slug)}og-image.png` }
}

export async function generateAllDeckOgImages() {
  const decks = readDecks()
  const results = []

  for (const deck of decks) {
    const paths = await writeDeckOgImages(deck)
    results.push(paths)
    console.log(`✓ og-image → decks/${deck.slug}/public/og-image.png`)
  }

  return results
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])

if (isMain) {
  await generateAllDeckOgImages()
}
