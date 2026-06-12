import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'
import { buildLandingJsonLd } from '../../scripts/seo.mjs'
import { readDecks } from '../../scripts/site.mjs'

const TOKENS_CSS = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../packages/slidev-addon-melmayan/styles/tokens.css',
)

const deckSlug = process.env.DECK_SLUG
const slidevPort = Number(process.env.SLIDEV_PORT ?? 3031)
const port = Number(process.env.PORT ?? 5173)

// Copies shared --mm-* tokens to dist/tokens.css (used by static pages like 404.html).
function tokensPlugin(): Plugin {
  return {
    name: 'melmayan-tokens',
    configureServer(server) {
      server.middlewares.use('/tokens.css', (_req, res) => {
        res.setHeader('Content-Type', 'text/css')
        res.end(fs.readFileSync(TOKENS_CSS, 'utf8'))
      })
    },
    writeBundle(options) {
      const outDir = options.dir ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist')
      fs.copyFileSync(TOKENS_CSS, path.join(outDir, 'tokens.css'))
    },
  }
}

function seoJsonLdPlugin(): Plugin {
  return {
    name: 'seo-jsonld',
    transformIndexHtml(html) {
      const blocks = buildLandingJsonLd()
        .map(
          (data) =>
            `<script type="application/ld+json">${JSON.stringify(data)}</script>`,
        )
        .join('\n    ')
      return html.replace('</head>', `    ${blocks}\n  </head>`)
    },
  }
}

// Exposes each deck's deck.json as the `virtual:decks` module.
function decksManifestPlugin(): Plugin {
  const id = 'virtual:decks'
  return {
    name: 'decks-manifest',
    resolveId(source) {
      return source === id ? `\0${id}` : undefined
    },
    load(source) {
      if (source === `\0${id}`) {
        return `export const decks = ${JSON.stringify(readDecks(), null, 2)}`
      }
      return undefined
    },
  }
}

export default defineConfig({
  plugins: [vue(), tokensPlugin(), decksManifestPlugin(), seoJsonLdPlugin()],
  server: {
    port,
    strictPort: Boolean(deckSlug),
    proxy: deckSlug
      ? {
          [`/${deckSlug}`]: {
            target: `http://localhost:${slidevPort}`,
            changeOrigin: true,
            ws: true,
          },
        }
      : undefined,
  },
})
