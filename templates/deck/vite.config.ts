import { defineConfig } from 'vite'
import { deckMetaVitePlugin } from '../../scripts/deck-meta-vite-plugin.mjs'

export default defineConfig({
  plugins: [deckMetaVitePlugin('__SLUG__')],
})
