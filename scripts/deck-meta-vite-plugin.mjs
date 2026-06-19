import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { deckSlidesPath } from './deck-meta.mjs'
import { writeSlidevEntry } from './slidev-entry.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Keeps slides.entry.md in sync when slides.md or deck.json change during dev. */
export function deckMetaVitePlugin(slug) {
  const slidesPath = deckSlidesPath(slug, ROOT)
  const deckJsonPath = path.join(ROOT, 'decks', slug, 'deck.json')

  return {
    name: 'melmayan-deck-meta',
    configureServer(server) {
      server.watcher.add(deckJsonPath)

      const syncEntry = () => {
        writeSlidevEntry(slug, ROOT)
      }

      server.watcher.on('change', (file) => {
        if (file !== slidesPath && file !== deckJsonPath) return
        syncEntry()
        server.ws.send({ type: 'full-reload' })
      })

      // Slidev's notes API matches `/__slidev/slides/:no.json` at the server root.
      // With `--base /<slug>/`, proxied requests arrive as `/<slug>/__slidev/...`.
      const base = server.config.base?.replace(/\/$/, '') ?? ''
      if (base && base !== '/') {
        const stripBaseForSlidevApi = (req, _res, next) => {
          const url = req.url ?? ''
          const qIndex = url.indexOf('?')
          const pathOnly = qIndex === -1 ? url : url.slice(0, qIndex)
          const query = qIndex === -1 ? '' : url.slice(qIndex)
          if (pathOnly.startsWith(`${base}/__slidev/`))
            req.url = pathOnly.slice(base.length) + query
          next()
        }
        server.middlewares.stack.unshift({ route: '', handle: stripBaseForSlidevApi })
      }
    },
    handleHotUpdate({ file, server }) {
      if (file !== deckJsonPath && file !== slidesPath) return

      writeSlidevEntry(slug, ROOT)
      server.ws.send({ type: 'full-reload' })
      return []
    },
  }
}
