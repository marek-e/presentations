import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  applyDeckMetaToSlides,
  deckSlidesPath,
  readDeckMeta,
} from './deck-meta.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Injects title, author, info, and seoMeta from deck.json when Slidev loads slides.md. */
export function deckMetaVitePlugin(slug) {
  const slidesPath = deckSlidesPath(slug, ROOT)
  const deckJsonPath = path.join(ROOT, 'decks', slug, 'deck.json')

  return {
    name: 'melmayan-deck-meta',
    transform(code, id) {
      const normalizedId = id.split('?')[0]
      if (normalizedId !== slidesPath) return

      const deck = readDeckMeta(slug, ROOT)
      return applyDeckMetaToSlides(code, slug, deck)
    },
    handleHotUpdate({ file, server }) {
      if (file !== deckJsonPath && file !== slidesPath) return

      const modules = server.moduleGraph.getModulesByFile(slidesPath)
      if (!modules?.size) return

      for (const mod of modules) {
        server.reloadModule(mod)
      }
    },
    configureServer(server) {
      server.watcher.add(deckJsonPath)
    },
  }
}
