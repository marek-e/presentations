#!/usr/bin/env node
/**
 * Builds the whole site into root dist/:
 *   dist/            ← apps/home (landing page)
 *   dist/<slug>/     ← each deck in decks/, built with --base /<slug>/
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateAllDeckOgImages } from './og-image.mjs'
import { buildRobotsTxt, buildSitemapXml } from './seo.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DECKS_DIR = path.join(ROOT, 'decks')
const OUT = path.join(ROOT, 'dist')

function run(cmd) {
  console.log(`\n$ ${cmd}`)
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' })
}

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

// Landing page → dist/
run('pnpm --filter home build')
fs.cpSync(path.join(ROOT, 'apps/home/dist'), OUT, { recursive: true })

// Each deck → dist/<slug>/
const slugs = fs
  .readdirSync(DECKS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)

await generateAllDeckOgImages()

for (const slug of slugs) {
  run(`pnpm --filter deck-${slug} build`)
  fs.cpSync(path.join(DECKS_DIR, slug, 'dist'), path.join(OUT, slug), {
    recursive: true,
  })
}

fs.writeFileSync(path.join(OUT, 'sitemap.xml'), buildSitemapXml())
fs.writeFileSync(path.join(OUT, 'robots.txt'), buildRobotsTxt())

console.log(`\n✓ Site assembled in dist/ (${slugs.length} deck(s) + landing page)`)
