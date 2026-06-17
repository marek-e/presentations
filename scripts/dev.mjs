#!/usr/bin/env node
/**
 * Dev server for the full site on one origin (mirrors production routing):
 *   http://localhost:3030/              ← landing page
 *   http://localhost:3030/<slug>/     ← Slidev deck (proxied)
 *
 * Usage:
 *   pnpm dev                  # newest deck (by date in deck.json)
 *   pnpm dev clickjacking     # specific deck
 *   DECK=clickjacking pnpm dev
 */
import { spawn } from 'node:child_process'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { accent, bold, cyan, dim, green, orange, red, underline } from './cli-colors.mjs'
import { readDecks } from './site.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const HOME_PORT = Number(process.env.PORT ?? 3030)
const SLIDEV_PORT = Number(process.env.SLIDEV_PORT ?? 3031)

const decks = readDecks()
const slug = process.argv[2] ?? process.env.DECK ?? decks[0]?.slug

if (!slug) {
  console.error(red('No decks found in decks/. Run pnpm new <slug> first.'))
  process.exit(1)
}

const activeDeck = decks.find((deck) => deck.slug === slug)

if (!activeDeck) {
  console.error(
    red(`Unknown deck "${slug}". Available: ${decks.map((d) => d.slug).join(', ') || '(none)'}`),
  )
  process.exit(1)
}

/** @type {import('node:child_process').ChildProcess[]} */
const children = []

const SUPPRESSED =
  /loadTheme.*deprecated|ExperimentalWarning|trace-warnings|Console Ninja|Files in the public directory|Instead of \/public\/|●■▲|^  Slidev|^  theme |^  css engine|^  entry |^  public slide show|^  presenter mode|^  slides overview|^  export slides|^  remote control|^  shortcuts|^  VITE v|^  ➜  Local:|^  ➜  Network:|^  ➜  press h \+/i

const CHILD_ENV = {
  ...process.env,
  NODE_NO_WARNINGS: '1',
  PNPM_REPORTER: 'silent',
}

function shouldShowChildOutput(text) {
  if (SUPPRESSED.test(text)) return false
  if (/^\s*$/.test(text)) return false
  if (/^> /.test(text)) return false
  return true
}

function spawnQuiet(label, command, args, env = {}) {
  const child = spawn(command, args, {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...CHILD_ENV, ...env },
  })

  for (const stream of [child.stdout, child.stderr]) {
    stream?.on('data', (chunk) => {
      const text = chunk.toString()
      if (!shouldShowChildOutput(text)) return
      if (/error|ERR_|failed|ENOENT|EADDRINUSE/i.test(text)) {
        process.stderr.write(`[${label}] ${text}`)
      }
    })
  }

  child.on('exit', (code, signal) => {
    if (signal) return
    if (code && code !== 0) {
      console.error(`\n[${label}] exited with code ${code}`)
      shutdown(code ?? 1)
    }
  })

  children.push(child)
  return child
}

function shutdown(code = 0) {
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }
  process.exit(code)
}

function probePort(port, host) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host }, () => {
      socket.end()
      resolve(true)
    })
    socket.on('error', () => {
      socket.destroy()
      resolve(false)
    })
  })
}

async function waitForPort(port, timeoutMs = 120_000) {
  const hosts = ['127.0.0.1', '::1']
  const started = Date.now()

  while (Date.now() - started < timeoutMs) {
    for (const host of hosts) {
      if (await probePort(port, host)) return
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`Timed out waiting for port ${port}`)
}

function link(url) {
  return underline(cyan(url))
}

function printBanner() {
  const base = `http://localhost:${HOME_PORT}`
  const deckUrl = `${base}/${slug}`
  const paintSlug = accent(activeDeck.accent ?? '#06b6d4')

  console.log('')
  console.log(`  ${bold('presentations')} ${dim('dev —')} ${paintSlug(slug)}`)
  console.log('')
  console.log(`  ${dim('Landing')}     ${link(`${base}/`)}`)
  console.log(`  ${dim('Deck')}        ${link(`${deckUrl}/`)}`)
  console.log(`  ${dim('Presenter')}   ${link(`${deckUrl}/presenter/`)}`)
  console.log('')
  console.log(`  ${orange('Ctrl+C to stop')}`)
  console.log('')
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))

console.log(`\n  ${green('●')} ${dim('Starting')} ${accent(activeDeck.accent ?? '#06b6d4')(slug)}${dim('…')}`)

const deck = spawnQuiet(
  'deck',
  'pnpm',
  [
    '--silent',
    '--filter',
    `deck-${slug}`,
    'exec',
    'slidev',
    '--log',
    'error',
    '--base',
    `/${slug}/`,
    '--port',
    String(SLIDEV_PORT),
  ],
  { DECK_SLUG: slug },
)

await waitForPort(SLIDEV_PORT)

const home = spawnQuiet('home', 'pnpm', ['--silent', '--filter', 'home', 'dev'], {
  PORT: String(HOME_PORT),
  SLIDEV_PORT: String(SLIDEV_PORT),
  DECK_SLUG: slug,
})

await waitForPort(HOME_PORT)

if (deck.exitCode !== null || home.exitCode !== null) {
  shutdown(1)
}

printBanner()
