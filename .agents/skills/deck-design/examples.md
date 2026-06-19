# Slide makeovers: before / after

Three transformations showing how to apply the deck-design rules. All "after" versions use real patterns from `decks/clickjacking`.

## 1. Concept slide - definition wall → layered visual

**Before (AI tell: label title, definition first, bullet wall):**

```markdown
# What is Clickjacking?

- 🖱️ Clickjacking is a UI redressing attack
- 🎯 The attacker overlays an invisible iframe on a decoy page
- ⚠️ Users think they click the decoy but click the victim site
- 🔒 It can lead to unauthorized actions
```

**After (claim title, demo first, concept named at the end):**

```markdown
# You just starred a repo. You didn't mean to.

<ClickjackDemo
  victim-url="/clickjacking/victims/github-star.html"
  cta-label="Claim your prize!"
/>

<div v-click class="mt-4">
  <Callout variant="error">
    The button you saw wasn't the button you pressed.
    That's <strong>clickjacking</strong>: a transparent iframe sitting on top of the bait.
  </Callout>
</div>

<!--
Run the demo with the opacity slider: start invisible, reveal the iframe.
Only AFTER they've seen it, name the concept.
-->
```

Why it works: concrete before abstract, the term gets glossed on first use, the slide is a demo instead of four bullets.

## 2. Comparison slide - bullets → two-cols with cards

**Before:**

```markdown
# Defense Options

- X-Frame-Options: DENY blocks all framing (legacy but widely supported)
- CSP frame-ancestors is the modern replacement and supports allowlists
- JavaScript framebusting can be bypassed and should not be relied on
```

**After:**

```markdown
---
layout: two-cols
---

# Use both headers. Skip the JavaScript.

::left::

<OffsetCard label="ship it" title="Headers" accent="green">
  <code>X-Frame-Options: DENY</code> for old browsers,<br/>
  <code>frame-ancestors 'none'</code> for everyone else.
</OffsetCard>

::right::

<OffsetCard v-click label="legacy" title="Framebusting JS" accent="red">
  <code>if (top !== self) top.location = self.location</code><br/>
  Bypassed by <code>sandbox</code> iframes since ~2010.
</OffsetCard>
```

Why it works: the title is the opinion, the layout is the comparison, each card carries one verdict.

## 3. Impact slide - stats list → one huge number

**Before:**

```markdown
# Impact

- Affected millions of users
- Used against Facebook, Twitter, and Adobe
- Still in the OWASP testing guide today
```

**After:**

```markdown
---
layout: center
class: text-center
---

<p class="text-8xl font-black m-0" style="color: var(--mm-danger)">1 click</p>

<p v-click class="text-2xl mt-4" style="color: var(--mm-text)">
  is all it took to enable your webcam - Adobe Flash settings, framed.
</p>

<!-- Tell the Flash webcam story here; the slide just needs the punch. -->
```

Why it works: one specific real incident beats three vague claims; the story lives in the speaker notes.
