import { deckLastMod, deckUrl, readDecks, SITE, SITE_URL } from './site.mjs'

export function buildSitemapXml() {
  const decks = readDecks()
  const urls = [
    { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
    ...decks.map((deck) => ({
      loc: deckUrl(deck.slug),
      lastmod: deckLastMod(deck.date),
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ]

  const body = urls
    .map((entry) => {
      const lines = [`  <url>`, `    <loc>${entry.loc}</loc>`]
      if (entry.lastmod) lines.push(`    <lastmod>${entry.lastmod}</lastmod>`)
      if (entry.changefreq) lines.push(`    <changefreq>${entry.changefreq}</changefreq>`)
      if (entry.priority) lines.push(`    <priority>${entry.priority}</priority>`)
      lines.push('  </url>')
      return lines.join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

export function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
}

export function buildLandingJsonLd() {
  const decks = readDecks()

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: `${SITE_URL}/`,
    description: SITE.description,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: SITE.author,
      url: SITE.authorUrl,
    },
  }

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: SITE.name,
    url: `${SITE_URL}/`,
    description: SITE.description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: decks.map((deck, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: deckUrl(deck.slug),
        name: deck.title,
        description: deck.description,
      })),
    },
  }

  return [website, collection]
}
