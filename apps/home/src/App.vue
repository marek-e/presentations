<script setup lang="ts">
import { decks } from 'virtual:decks'

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function formatDate(date?: string): string {
  if (!date) return ''
  const [year, month] = date.split('-')
  const m = month ? MONTHS[Number(month) - 1] : undefined
  return m ? `${m} ${year}` : year
}
</script>

<template>
  <main class="page">
    <header class="masthead">
      <p class="masthead-kicker">presentations.melmayan.fr</p>
      <h1 class="masthead-title">
        Talks &amp;<br />
        <em>presentations</em>
      </h1>
      <p class="masthead-sub">
        Slides from talks I've given — security, web, and whatever else
        seemed worth ranting about. Built with
        <a href="https://sli.dev" target="_blank" rel="noopener">Slidev</a>.
      </p>
    </header>

    <section class="deck-list" aria-label="All presentations">
      <a
        v-for="(deck, i) in decks"
        :key="deck.slug"
        class="deck-card"
        :href="`/${deck.slug}/`"
        :style="{ '--deck-accent': deck.accent ?? 'var(--accent)', '--i': i }"
      >
        <div class="deck-head">
          <span v-if="deck.emoji" class="deck-emoji" aria-hidden="true">{{ deck.emoji }}</span>
          <span v-if="deck.date" class="deck-date">{{ formatDate(deck.date) }}</span>
        </div>

        <h2 class="deck-title">{{ deck.title }}</h2>
        <p v-if="deck.subtitle" class="deck-subtitle">{{ deck.subtitle }}</p>
        <p v-if="deck.description" class="deck-desc">{{ deck.description }}</p>

        <div class="deck-foot">
          <ul v-if="deck.tags?.length" class="deck-tags">
            <li v-for="tag in deck.tags" :key="tag">{{ tag }}</li>
          </ul>
          <span class="deck-go" aria-hidden="true">watch →</span>
        </div>
      </a>
    </section>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} melmayan — slides are open, opinions are mine.</p>
    </footer>
  </main>
</template>

<style scoped>
.page {
  max-width: 1060px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vw, 6rem) clamp(1.25rem, 5vw, 3rem) 3rem;
}

/* ── Masthead ─────────────────────────────────────────── */
.masthead {
  max-width: 38rem;
  margin-bottom: clamp(3rem, 8vw, 6rem);
}

.masthead-kicker {
  margin: 0 0 1rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.masthead-title {
  margin: 0;
  font-size: clamp(2.8rem, 8vw, 5rem);
  font-weight: 850;
  line-height: 0.98;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.masthead-title em {
  font-style: italic;
  font-weight: 500;
  color: var(--ink-soft);
}

.masthead-sub {
  margin: 1.4rem 0 0;
  font-size: 1.02rem;
  color: var(--ink-muted);
  max-width: 30rem;
}

.masthead-sub a {
  color: var(--ink-soft);
  text-decoration-color: var(--accent);
  text-underline-offset: 3px;
}

/* ── Deck cards ───────────────────────────────────────── */
.deck-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(21rem, 100%), 1fr));
  gap: 1.75rem;
}

.deck-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.5rem 1.5rem 1.25rem;
  background: var(--card-bg);
  border: 1.5px solid var(--line);
  border-radius: 14px;
  box-shadow: 5px 5px 0 color-mix(in srgb, var(--deck-accent) 22%, var(--bg));
  color: inherit;
  text-decoration: none;
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms;
  animation: card-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 70ms);
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.deck-card:hover,
.deck-card:focus-visible {
  transform: translate(-3px, -3px);
  border-color: color-mix(in srgb, var(--deck-accent) 45%, var(--line));
  box-shadow: 9px 9px 0 color-mix(in srgb, var(--deck-accent) 30%, var(--bg));
}

.deck-card:focus-visible {
  outline: 2px solid var(--deck-accent);
  outline-offset: 3px;
}

.deck-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.deck-emoji {
  font-size: 1.6rem;
  line-height: 1;
}

.deck-date {
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.deck-title {
  margin: 0;
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.deck-subtitle {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 500;
  font-style: italic;
  color: var(--deck-accent);
}

.deck-desc {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: var(--ink-muted);
  line-height: 1.55;
}

.deck-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.1rem;
}

.deck-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.deck-tags li {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
  background: color-mix(in srgb, var(--deck-accent) 7%, var(--bg));
  border: 1px solid color-mix(in srgb, var(--deck-accent) 18%, var(--line));
  border-radius: 999px;
  padding: 0.15rem 0.6rem;
}

.deck-go {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--deck-accent);
  white-space: nowrap;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.deck-card:hover .deck-go {
  transform: translateX(3px);
}

/* ── Footer ───────────────────────────────────────────── */
.footer {
  margin-top: clamp(3rem, 8vw, 5rem);
  padding-top: 1.5rem;
  border-top: 1.5px solid var(--line);
  font-size: 0.82rem;
  color: var(--ink-muted);
}

.footer p {
  margin: 0;
}
</style>
