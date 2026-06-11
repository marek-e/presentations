# presentations monorepo

All my Slidev presentations, deployed as one static site at https://presentations.melmayan.fr.

## Layout

- **`decks/<slug>/`** — one Slidev presentation per folder. The folder name is the URL slug (`decks/clickjacking` → `presentations.melmayan.fr/clickjacking`). Each deck has a `deck.json` (title, description, tags, accent, emoji) consumed by the landing page.
- **`packages/slidev-addon-melmayan/`** — shared Slidev addon: reusable Vue components (`Callout`, `AgendaItem`, `InfoPopover`, `OffsetCard`) and the `--mm-*` design tokens. Enabled per deck via `addons: [melmayan]` in the headmatter + `"slidev-addon-melmayan": "workspace:*"` dependency.
- **`apps/home/`** — landing page (Vite + Vue) that lists all decks as cards. Reads deck metadata from a generated manifest.
- **`templates/deck/`** — factory template used by `pnpm new <slug>`.
- **`scripts/build.mjs`** — builds every deck with `--base /<slug>/`, builds the landing app, and assembles everything into root `dist/`.
- **`scripts/new-deck.mjs`** — scaffolds a new deck from the template.
- **`.agents/skills/`** — shared agent skills, symlinked from `.claude/skills/`:
  - `slidev` — Slidev syntax/feature reference. Read before non-trivial Slidev work.
  - `deck-design` — what makes a slide clear, visual, and human. Read before creating or editing slide content.

## Commands

```bash
pnpm install                       # install everything (workspace)
pnpm new <slug>                    # scaffold decks/<slug> from templates/deck
pnpm --filter deck-<slug> dev      # dev server for one deck (served under /<slug>/)
pnpm dev:home                      # dev server for the landing page
pnpm build                         # full site build into dist/ (what Vercel runs)
```

## Conventions

- Deck package names are `deck-<slug>` so `pnpm --filter deck-clickjacking dev` works.
- Decks are built with `--base /<slug>/`: any absolute URL inside a deck (iframes, `window.open`, assets referenced from JS) must be prefixed with `/<slug>/`. Markdown image/asset references are rewritten by Slidev automatically.
- Shared, deck-agnostic Vue components belong in the addon, not in a deck's `components/` folder. Deck-specific demo components stay in the deck.
- Shared design tokens live in the addon (`packages/slidev-addon-melmayan/styles/tokens.css` as `--mm-*` CSS variables). Decks override tokens in their own `style.css`. **All site UI** (landing page, 404, future static pages) must import or link that file — never define parallel token sets (`--bg`, `--ink`, `--accent`, etc.).
- Deployment: Vercel builds the repo with `pnpm build` and serves `dist/` (see `vercel.json`). SPA fallback rewrites `/<deck>/*` to `/<deck>/index.html`.
