---
layout: center
class: text-center px-16
zoom: 0.92
---

<div aria-hidden="true" style="position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0">
  <div style="position:absolute;top:-70px;left:-50px;width:300px;height:300px;border-radius:50%;background:rgba(220,38,38,0.10);filter:blur(48px)"></div>
  <div style="position:absolute;bottom:-60px;right:-40px;width:260px;height:260px;border-radius:50%;background:rgba(53,92,125,0.10);filter:blur(44px)"></div>
</div>

<div style="position:relative;z-index:1">

<span class="fin-eyebrow">Take this home</span>

<h1 class="fin-title">Ship <code>frame-ancestors</code> before dinner.</h1>

<p class="fin-lead">
  Classic clickjacking dies with two lines in your response headers.
  DoubleClickjacking and extension tricks need more — but the baseline
  is cheap, well-understood, and table stakes for any app handling sensitive actions.
</p>

<div class="fin-grid mt-8">
<a class="fin-resource" href="https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">
<span class="fin-resource-label">OWASP</span>
<span class="fin-resource-desc">Clickjacking Defense Cheat Sheet</span>
<span class="fin-resource-go">read →</span>
</a>
<a class="fin-resource" href="https://securityheaders.com/" target="_blank" rel="noopener noreferrer">
<span class="fin-resource-label">securityheaders.com</span>
<span class="fin-resource-desc">Scan your site's response headers tonight</span>
<span class="fin-resource-go">scan →</span>
</a>
<a class="fin-resource" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors" target="_blank" rel="noopener noreferrer">
<span class="fin-resource-label">MDN</span>
<span class="fin-resource-desc"><code>frame-ancestors</code> · X-Frame-Options</span>
<span class="fin-resource-go">docs →</span>
</a>
</div>

<p class="fin-slides">
  Slides &amp; demos →
  <a href="https://presentations.melmayan.fr/clickjacking/" target="_blank" rel="noopener noreferrer">presentations.melmayan.fr/clickjacking</a>
</p>

</div>

<style>
.fin-eyebrow {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  border: 1px solid var(--mm-brand-blue-dark);
  background: color-mix(in srgb, var(--mm-brand-blue) 12%, #fff);
  color: var(--mm-brand-blue);
  font-size: 0.72em;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.fin-title {
  margin: 0.75rem 0 0;
  font-size: 2.4em;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--mm-text-strong);
}

.fin-title code {
  font-size: 0.92em;
  color: var(--mm-brand-blue);
}

.fin-lead {
  margin: 1rem auto 0;
  max-width: 34rem;
  font-size: 1.05em;
  line-height: 1.55;
  color: var(--mm-text);
}

.fin-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  animation: fin-rise 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.fin-grid.slidev-vclick-hidden { animation-play-state: paused; }

.fin-resource {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 16px 14px;
  border-radius: 14px;
  border: 1.5px solid var(--mm-border);
  background: #fff;
  box-shadow: 4px 4px 0 color-mix(in srgb, var(--mm-brand-mauve) 16%, var(--mm-surface));
  color: inherit;
  text-decoration: none;
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms;
}

.fin-resource:hover,
.fin-resource:focus-visible {
  transform: translate(-2px, -2px);
  border-color: color-mix(in srgb, var(--mm-brand-blue) 35%, var(--mm-border));
  box-shadow: 7px 7px 0 color-mix(in srgb, var(--mm-brand-pink) 18%, var(--mm-surface));
}

.fin-resource:focus-visible {
  outline: 2px solid var(--mm-brand-blue);
  outline-offset: 3px;
}

.fin-resource-label {
  font-size: 0.95em;
  font-weight: 800;
  color: var(--mm-text-strong);
}

.fin-resource-desc {
  font-size: 0.78em;
  line-height: 1.45;
  color: var(--mm-text-muted);
  flex: 1;
}

.fin-resource-go {
  margin-top: 4px;
  font-size: 0.76em;
  font-weight: 700;
  color: var(--mm-brand-blue);
}

.fin-slides {
  margin: 2rem auto 0;
  font-size: 0.92em;
  color: var(--mm-text-muted);
  animation: fin-rise 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.fin-slides.slidev-vclick-hidden { animation-play-state: paused; }

.fin-slides a {
  color: var(--mm-text-strong);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: var(--mm-brand-pink);
  text-underline-offset: 3px;
}

.fin-slides a:hover {
  color: var(--mm-brand-blue);
}

@keyframes fin-rise {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>

<!--
PRESENTER NOTE:
Land the plane: frame-ancestors + XFO is the cheap win for classic clickjacking. If your app handles auth or sensitive actions and lacks these headers, fix it tonight — but don't oversell the urgency: this is a solved class of bug for anyone paying attention.
Acknowledge DCJ and extension clickjacking need more than headers; that's where the deck's real "2026" value lives.
Optional framing for bug bounty / AppSec folks: many programs deprioritize or exclude classic clickjacking because defenses are mature and impact is low when headers are present. Fair tradeoff — focus bounty budget on variants and on apps that genuinely need embed flows but misconfigure them.
[click] OWASP cheat sheet for copy-paste configs; securityheaders.com to scan their own employer site tonight; MDN for the directive reference.
[click] Slides URL — demos (bank, GitHub iframe, DCJ OAuth, extension cookie banner) all work from the deployed deck.
Q&A buffer. If someone asks about CSRF, jump back to the hidden CSRF slide in defenses.
-->
