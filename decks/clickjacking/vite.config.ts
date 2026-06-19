import fs from 'node:fs'
import path from 'node:path'
import type { Connect } from 'vite'
import { defineConfig } from 'vite'
import { deckMetaVitePlugin } from '../../scripts/deck-meta-vite-plugin.mjs'

const CALLBACK_HTML = 'public/callback/index.html'

/** Serve /callback and /callback/ as static HTML - Slidev SPA fallback would otherwise win. */
function callbackPagePlugin() {
  const serveCallback: Connect.NextHandleFunction = (req, res, next) => {
    const pathname = req.url?.split('?')[0] ?? ''
    const isCallback = /^(\/clickjacking)?\/callback\/?$/.test(pathname)
    if (!isCallback) {
      next()
      return
    }
    const file = path.resolve(CALLBACK_HTML)
    fs.readFile(file, (err, data) => {
      if (err) {
        next(err)
        return
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(data)
    })
  }

  return {
    name: 'callback-page',
    configureServer(server: { middlewares: Connect.Server }) {
      server.middlewares.use(serveCallback)
    },
    configurePreviewServer(server: { middlewares: Connect.Server }) {
      server.middlewares.use(serveCallback)
    },
  }
}

export default defineConfig({
  plugins: [deckMetaVitePlugin('clickjacking'), callbackPagePlugin()],
})
