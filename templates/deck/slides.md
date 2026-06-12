---
theme: geist
addons:
  - melmayan
title: __TITLE__
author: Marek Elmayan
info: |
  __TITLE__ — a talk by Marek Elmayan.
favicon: /__SLUG__/favicon.svg
transition: fade
colorSchema: light
seoMeta:
  ogTitle: __TITLE__
  ogDescription: __TITLE__ — a talk by Marek Elmayan.
  ogUrl: https://presentations.melmayan.fr/__SLUG__/
  ogImage: https://presentations.melmayan.fr/__SLUG__/og-image.png
  twitterCard: summary_large_image
  twitterTitle: __TITLE__
  twitterDescription: __TITLE__ — a talk by Marek Elmayan.
  twitterImage: https://presentations.melmayan.fr/__SLUG__/og-image.png
defaults:
  layout: default
  class: px-16 py-8

layout: center
class: text-center
---

# __TITLE__

A new presentation. Press <kbd>→</kbd> to start.

---

# Agenda

<div class="flex flex-col gap-2 mt-8">
  <AgendaItem n="1">First topic</AgendaItem>
  <AgendaItem n="2" demo>Second topic, with a demo</AgendaItem>
  <AgendaItem n="3">Wrap-up</AgendaItem>
</div>

---

# Shared components

These come from `slidev-addon-melmayan`:

<div class="grid grid-cols-2 gap-4 mt-6">
  <OffsetCard label="Card" title="OffsetCard" accent="blue">
    A card with a hard offset shadow.
  </OffsetCard>
  <div class="flex flex-col gap-3">
    <Callout variant="info">An info callout.</Callout>
    <Callout variant="warning">A warning callout.</Callout>
  </div>
</div>

---
layout: center
class: text-center
---

# Thanks!

[presentations.melmayan.fr](https://presentations.melmayan.fr)
