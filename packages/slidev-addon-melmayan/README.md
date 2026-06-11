# slidev-addon-melmayan

Shared Slidev addon for all decks in this repo: reusable Vue components and design tokens.

## Usage

In a deck's `package.json`:

```json
"dependencies": {
  "slidev-addon-melmayan": "workspace:*"
}
```

In the deck's headmatter (`slides.md`):

```yaml
addons:
  - melmayan
```

## Components

Auto-imported in any slide once the addon is enabled:

- `<Callout variant="info|note|warning|escalation|success|error|gray|purple">` — bordered callout box with icon
- `<AgendaItem n="1" demo>` — agenda row with number badge and optional DEMO chip
- `<InfoPopover title="..." trigger="?">` — floating toggleable popover pinned to a corner
- `<OffsetCard label="..." title="..." accent="blue|red|...">` — card with hard offset shadow

## Styles

`styles/tokens.css` defines the shared `--mm-*` design tokens. Deck-level `style.css` loads after the addon, so decks can override any token.
