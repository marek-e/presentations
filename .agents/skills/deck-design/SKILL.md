---
name: deck-design
description: Design and write Slidev slides that are visually striking, human-feeling, and clear enough for a junior dev to follow a technical subject. Use when creating or editing any deck in decks/, writing slides.md content, adding slides, or when the user asks to make a presentation, improve slides, or explain a technical topic as a deck.
---

# Deck Design

Slides in this repo must pass three bars: a junior dev follows the argument without the speaker, nothing looks AI-generated, and the audience remembers visuals - not bullet walls.

Read `.agents/skills/slidev/SKILL.md` first for Slidev syntax and features. This skill is about *what to put on the slide*; that one is about *how*.

## Clarity for juniors

- **One idea per slide.** If a slide needs an "and", split it. 20 light slides beat 8 dense ones.
- **Concrete before abstract.** Show the attack, the bug, the request - *then* name the concept. Never open with a definition.
- **Build mental models in layers.** Use `v-click` to reveal a diagram piece by piece, in the order you'd explain it out loud. The reveal order *is* the explanation.
- **Anchor with analogies** from everyday life or code the audience already writes. One good analogy per concept, not three.
- **Name the "why should I care" early.** First 3 slides must answer: what can go wrong / what do I gain?
- **Jargon budget:** the first use of any term gets a plain-language gloss on the same slide (an `InfoPopover` works well). Never gloss in a footnote.
- **Recap checkpoints.** After each major section, one slide that restates the model so far in one visual. No "Summary" title - show the same diagram, now complete.

## Visual-first, not bullet lists

Before writing bullets, pick the visual form that fits the content:

| Content | Use instead of bullets |
| --- | --- |
| Process / attack flow / lifecycle | Step diagram revealed with `v-click`, numbered `AgendaItem`-style rows |
| Comparison / before-after / tradeoff | `layout: two-cols` with `OffsetCard`s side by side |
| Architecture / relationships | Mermaid diagram or positioned divs with arrows |
| Code behavior | Live demo component (see `ClickjackDemo`), or code with line highlighting / magic-move |
| Numbers / impact | One huge figure with a one-line caption, not a stats list |
| Warning / nuance / tip | `Callout` with the right variant |
| Timeline / history | Horizontal strip with dots and years, not a chronology list |

Rules:

- A slide may have **at most 4 bullets, one line each**. More than that → convert using the table above.
- Prefer an interactive Vue demo over a static screenshot, a screenshot over a diagram, a diagram over prose. Demos go in the deck's `components/`; promote to the addon only if deck-agnostic.
- Code slides show the **minimum lines that matter** - strip imports and boilerplate, highlight the 1–3 lines being discussed (`{2,5-6}` line highlighting), and walk through them with clicks.
- Use the shared design tokens (`--mm-*`) and addon components (`Callout`, `AgendaItem`, `InfoPopover`, `OffsetCard`) so decks stay coherent. Light scheme; everything must pass WCAG AA on white.
- Decorative background shapes: blurred, `aria-hidden="true"`, `pointer-events:none`, behind `z-index:1` content.

## Sounding human, not AI

AI decks are recognizable. Avoid the tells:

- **No title-case headline + 3 emoji bullets pattern.** Emojis only where they carry meaning (a single icon as a visual anchor), never one per bullet.
- **No boilerplate slides**: no "Agenda" read out as plain list, no "Conclusion", no "Thank you / Questions?" filler. End on the one thing to remember, plus where to find the slides.
- **Write titles as claims, not labels.** "Framebusting is dead" beats "JavaScript Defenses". A junior should get the gist by reading only the titles.
- **Have an opinion.** Say what's actually used in production, what's legacy, what you'd do. Hedged both-sides prose is an AI tell.
- **Use specifics**: real product names, real numbers, real CVEs, real screenshots. "A major bank" is filler; "GitHub's response headers" is a slide.
- **Humor is welcome and should be situational** - cheesy attacker copy ("You've been selected!"), self-deprecating notes, playful demo button labels. Never generic jokes about coffee or meetings.
- **Vary slide rhythm.** Alternate full-bleed visuals, dense demo slides, and near-empty one-liner slides. Uniform slide density reads as generated.
- Speaker notes (`<!-- -->` per slide) carry the spoken detail; the slide carries the visual. If you're tempted to write a paragraph on a slide, it's a speaker note.

## Workflow for a new deck

1. Write the narrative first as 5–8 title-claims (the spine). Check: do the titles alone tell the story?
2. For each claim, pick the visual form from the table - bullets are the last resort.
3. Build slides; pace each one with `v-click` in spoken order.
4. Run `pnpm --filter deck-<slug> dev` and read every slide asking: *would a junior get this without me talking?* and *does this look templated?*
5. Check contrast, `aria-hidden` on decorations, and that any absolute URL is `/<slug>/`-prefixed.

For before/after slide makeovers, see [examples.md](examples.md).
