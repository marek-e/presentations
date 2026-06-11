# presentations

All my [Slidev](https://sli.dev) presentations in one monorepo, deployed to [presentations.melmayan.fr](https://presentations.melmayan.fr).

- The landing page lists every deck as a card.
- Each deck lives at `presentations.melmayan.fr/<slug>` (e.g. [/clickjacking](https://presentations.melmayan.fr/clickjacking)).

## Structure

| Path | What |
| --- | --- |
| `decks/<slug>/` | One Slidev deck per folder — the folder name is the URL slug |
| `packages/slidev-addon-melmayan/` | Shared Slidev addon: reusable Vue components + design tokens |
| `apps/home/` | Landing page (Vite + Vue) — reads each deck's `deck.json` |
| `templates/deck/` | Template used by the deck factory |
| `scripts/` | `build.mjs` (full-site build) and `new-deck.mjs` (factory) |
| `.agents/skills/` | Shared agent skills (Slidev reference, etc.) |

## Usage

```bash
pnpm install

# create a new presentation
pnpm new my-talk "My Talk Title"

# work on a deck
pnpm --filter deck-clickjacking dev    # http://localhost:3030/clickjacking/

# work on the landing page
pnpm dev:home

# build the whole site into dist/ (what Vercel runs)
pnpm build
```

## Deck metadata

Each deck has a `deck.json` consumed by the landing page:

```json
{
  "title": "Clickjacking",
  "subtitle": "Proof Hackers Write Better CSS Than You",
  "description": "Shown on the card.",
  "date": "2026-06",
  "tags": ["security", "web"],
  "accent": "#dc2626",
  "emoji": "🖱️"
}
```

## Deployment

Vercel builds the repo with `pnpm build` and serves `dist/` (see `vercel.json`).
Each push to `main` redeploys the whole site, decks included.

## Notes

- Decks are built with `--base /<slug>/`. Absolute URLs inside a deck (iframes, `window.open`, JS-referenced assets) must be prefixed with `/<slug>/`. The dev server uses the same base, so what works locally works in prod.
- Shared components (`Callout`, `AgendaItem`, `InfoPopover`, `OffsetCard`) come from the addon — see `packages/slidev-addon-melmayan/README.md`.
