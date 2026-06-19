#!/usr/bin/env node
/**
 * Wrapper around the Slidev CLI that writes slides.entry.md (deck meta merged
 * from deck.json) before Slidev parses headmatter.
 */
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SLIDEV_ENTRY_FILENAME,
  deckRoot,
  detectDeckSlug,
  writeSlidevEntry,
} from './slidev-entry.mjs'

const SCRIPT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SUBCOMMANDS = new Set(['build', 'export', 'export-notes', 'format', 'theme'])

/** @param {string} deckRootDir */
function resolveSlidevCli(deckRootDir) {
  for (const base of [deckRootDir, SCRIPT_ROOT]) {
    const pkgJson = path.join(base, 'package.json')
    if (!fs.existsSync(pkgJson)) continue

    try {
      const req = createRequire(pkgJson)
      const cliPkg = req.resolve('@slidev/cli/package.json')
      const cliBin = path.join(path.dirname(cliPkg), 'bin/slidev.mjs')
      if (fs.existsSync(cliBin)) return cliBin
    } catch {
      // try next base
    }
  }

  throw new Error('slidev CLI not found - run pnpm install from the repo root.')
}

const slug = detectDeckSlug()
const root = deckRoot(slug)
const slidevCli = resolveSlidevCli(root)

writeSlidevEntry(slug)

const args = process.argv.slice(2)
const slidevArgs =
  args.length > 0 && SUBCOMMANDS.has(args[0])
    ? [args[0], SLIDEV_ENTRY_FILENAME, ...args.slice(1)]
    : [SLIDEV_ENTRY_FILENAME, ...args]

const result = spawnSync(process.execPath, [slidevCli, ...slidevArgs], {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
})

if (result.error) {
  console.error(result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 1)
