# presentations.melmayan.fr - Slidev deck monorepo

All my [Slidev](https://sli.dev) presentations in one monorepo - deck factory, shared design system, static landing page - deployed to [presentations.melmayan.fr](https://presentations.melmayan.fr).

- The landing page lists every deck as a card.
- Each deck lives at `presentations.melmayan.fr/<slug>` (e.g. [/clickjacking](https://presentations.melmayan.fr/clickjacking)).

## Structure

| Path | What |
| --- | --- |
| `decks/<slug>/` | One Slidev deck per folder - the folder name is the URL slug |
| `packages/slidev-addon-melmayan/` | Shared Slidev addon: reusable Vue components + design tokens |
| `apps/home/` | Landing page (Vite + Vue) - reads each deck's `deck.json` |
| `templates/deck/` | Template used by the deck factory |
| `scripts/` | Build, dev, SEO, OG images, deck scaffolding |
| `.agents/skills/` | Shared agent skills (Slidev reference, deck design, etc.) |

## Usage

```bash
pnpm install

# create a new presentation
pnpm new my-talk "My Talk Title"

# dev - landing + one deck on the same origin (mirrors prod routing)
pnpm dev                    # newest deck (by date in deck.json)
pnpm dev clickjacking       # specific deck
#   http://localhost:3030/              ← landing page
#   http://localhost:3030/clickjacking/ ← deck (+ /presenter/, etc.)

# work on a single piece in isolation
pnpm --filter deck-clickjacking dev    # Slidev only, same base path
pnpm dev:home                          # landing page only

# build the whole site into dist/ (what Vercel runs)
pnpm build

# serve dist/ locally (SPA routing like vercel.json)
pnpm preview                # http://localhost:4173

# regenerate deck OG images from deck.json (also runs during build)
pnpm og-images
```

Requires Node ≥ 22.

## Deck metadata

Each deck has a `deck.json` - single source of truth for the landing card, Slidev SEO headmatter, and OG images. Do **not** duplicate `title`, `author`, `info`, or `seoMeta` in `slides.md`; they're injected at build/dev time.

```json
{
  "title": "Clickjacking",
  "subtitle": "Proof Hackers Write Better CSS Than You",
  "description": "Shown on the card and in meta tags.",
  "date": "2026-06",
  "tags": ["security", "web"],
  "accent": "#dc2626",
  "emoji": "🖱️"
}
```

## Build & CI

`pnpm build` assembles `dist/`:

1. Landing page → `dist/`
2. Each deck → `dist/<slug>/` (built with `--base /<slug>/`)
3. Per-deck OG images from `deck.json`
4. `sitemap.xml` and `robots.txt`

GitHub Actions runs `pnpm build` on every push and PR (`.github/workflows/ci.yml`).

## Deployment

Vercel builds the repo with `pnpm build` and serves `dist/` (see `vercel.json`).
Each push to `main` redeploys the whole site, decks included.

## Notes

- Decks are built with `--base /<slug>/`. Absolute URLs inside a deck (iframes, `window.open`, JS-referenced assets) must be prefixed with `/<slug>/`. `pnpm dev` uses the same base, so what works locally works in prod.
- `pnpm dev` proxies one deck at a time. With multiple decks, pass the slug: `pnpm dev my-talk`.
- Shared components (`Callout`, `AgendaItem`, `InfoPopover`, `OffsetCard`) come from the addon - see `packages/slidev-addon-melmayan/README.md`.
