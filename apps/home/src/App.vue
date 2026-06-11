<script setup lang="ts">
import { decks } from 'virtual:decks'

const REPO_URL = 'https://github.com/marek-e/presentations'

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
  <a
    class="github-link"
    :href="REPO_URL"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="View source on GitHub"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.41-1.23-1.68-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.52.12-3.165 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.5 3.3-1.23 3.3-1.23.66 1.655.24 2.875.12 3.165.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  </a>

  <main class="page">
    <header class="masthead">
      <svg class="masthead-logo" viewBox="21 18 64 64" aria-hidden="true">
        <rect x="38" y="42" width="44" height="30" rx="8" fill="var(--mm-brand-pink)" stroke="var(--mm-brand-pink-dark)" stroke-width="3" />
        <rect x="31" y="35" width="44" height="30" rx="8" fill="var(--mm-brand-mauve)" stroke="var(--mm-brand-mauve-dark)" stroke-width="3" />
        <rect x="24" y="28" width="44" height="30" rx="8" fill="var(--mm-brand-blue)" stroke="var(--mm-brand-blue-dark)" stroke-width="3" />
      </svg>
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
        :style="{ '--deck-accent': deck.accent ?? 'var(--mm-brand-pink)', '--i': i }"
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
  </main>

  <footer class="footer">
    <p>
      © {{ new Date().getFullYear() }}
      <a href="https://melmayan.fr" target="_blank" rel="noopener">melmayan</a>
      — slides are open, opinions are mine.
    </p>
  </footer>
</template>

<style scoped>
.github-link {
  position: fixed;
  top: clamp(1.25rem, 4vw, 2rem);
  right: clamp(1.25rem, 5vw, 3rem);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--mm-text);
  background: #fff;
  border: 1.5px solid var(--mm-border);
  border-radius: 10px;
  box-shadow: 4px 4px 0 color-mix(in srgb, var(--mm-brand-mauve) 18%, var(--mm-site-bg));
  text-decoration: none;
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms,
    color 220ms;
}

.github-link svg {
  width: 1.25rem;
  height: 1.25rem;
}

.github-link:hover,
.github-link:focus-visible {
  transform: translate(-2px, -2px);
  color: var(--mm-brand-blue);
  border-color: color-mix(in srgb, var(--mm-brand-mauve) 35%, var(--mm-border));
  box-shadow: 7px 7px 0 color-mix(in srgb, var(--mm-brand-pink) 20%, var(--mm-site-bg));
}

.github-link:focus-visible {
  outline: 2px solid var(--mm-brand-mauve);
  outline-offset: 3px;
}

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

.masthead-logo {
  width: 3.6rem;
  height: 3.6rem;
  margin-bottom: 1.1rem;
  overflow: visible;
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.masthead-logo:hover {
  transform: scale(1.1) rotate(-3deg);
}

/* Staggered spring entrance, echoing the melmayan.fr AnimatedLogo */
.masthead-logo rect {
  transform-box: fill-box;
  transform-origin: center;
  animation: logo-piece-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.masthead-logo rect:nth-of-type(1) {
  --from: translate(-14px, 12px) rotate(-10deg);
  animation-delay: 0ms;
}

.masthead-logo rect:nth-of-type(2) {
  --from: translate(14px, 12px) rotate(8deg);
  animation-delay: 90ms;
}

.masthead-logo rect:nth-of-type(3) {
  --from: translate(0, -16px) rotate(4deg);
  animation-delay: 180ms;
}

@keyframes logo-piece-in {
  from {
    opacity: 0;
    transform: var(--from);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .masthead-logo,
  .masthead-logo rect {
    animation: none;
    transition: none;
  }
}

.masthead-kicker {
  margin: 0 0 1rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mm-brand-mauve);
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
  color: var(--mm-brand-blue);
}

.masthead-sub {
  margin: 1.4rem 0 0;
  font-size: 1.02rem;
  color: var(--mm-text-muted);
  max-width: 30rem;
}

.masthead-sub a {
  color: var(--mm-text);
  text-decoration-color: var(--mm-brand-pink);
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
  background: #fff;
  border: 1.5px solid var(--mm-border);
  border-radius: 14px;
  box-shadow: 5px 5px 0 color-mix(in srgb, var(--deck-accent) 22%, var(--mm-site-bg));
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
  border-color: color-mix(in srgb, var(--deck-accent) 45%, var(--mm-border));
  box-shadow: 9px 9px 0 color-mix(in srgb, var(--deck-accent) 30%, var(--mm-site-bg));
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
  color: var(--mm-text-muted);
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
  color: var(--mm-text-muted);
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
  color: var(--mm-text);
  background: color-mix(in srgb, var(--deck-accent) 7%, var(--mm-surface));
  border: 1px solid color-mix(in srgb, var(--deck-accent) 18%, var(--mm-border));
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
  padding: 1.5rem clamp(1.25rem, 5vw, 3rem) 2rem;
  background: var(--mm-site-footer);
  border-top: 1.5px solid color-mix(in srgb, var(--mm-brand-mauve) 18%, var(--mm-border));
  border-radius: 1.25rem 1.25rem 0 0;
  font-size: 0.82rem;
  color: var(--mm-text-muted);
}

.footer p {
  margin: 0 auto;
  max-width: 1060px;
}

.footer a {
  color: var(--mm-brand-blue);
  font-weight: 600;
  text-decoration: none;
}

.footer a:hover {
  color: var(--mm-brand-mauve);
}
</style>
