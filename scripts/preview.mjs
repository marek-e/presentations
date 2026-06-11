#!/usr/bin/env node
/**
 * Serves dist/ with the same routing as vercel.json:
 * static files first, then /<deck>/* falls back to /<deck>/index.html.
 *   pnpm preview  →  http://localhost:4173
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
const PORT = Number(process.env.PORT ?? 4173)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

function resolveFile(urlPath) {
  const safe = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '')
  const full = path.join(DIST, safe)
  if (!full.startsWith(DIST)) return null
  if (fs.existsSync(full)) {
    if (fs.statSync(full).isDirectory()) {
      const idx = path.join(full, 'index.html')
      return fs.existsSync(idx) ? idx : null
    }
    return full
  }
  // SPA fallback: /<deck>/anything → /<deck>/index.html (mirrors vercel.json)
  const [, deck] = safe.split(path.sep)
  if (deck) {
    const idx = path.join(DIST, deck, 'index.html')
    if (fs.existsSync(idx)) return idx
  }
  return null
}

http
  .createServer((req, res) => {
    const file = resolveFile(new URL(req.url, 'http://x').pathname)
    if (!file) {
      res.writeHead(404).end('Not found')
      return
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  .listen(PORT, () => console.log(`Preview at http://localhost:${PORT}`))
