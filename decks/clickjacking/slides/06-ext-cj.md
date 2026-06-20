# DOM-Based Extension Clickjacking

<span class="ecj-badge">Marek Toth</span> <a href="https://marektoth.com/blog/dom-based-extension-clickjacking/" target="_blank" class="ecj-link">marektoth.com/blog ↗</a>

<div class="mt-2" style="font-size:0.88em;color:var(--mm-text-muted)">Classic clickjacking hides another website. This hides <strong style="color:var(--mm-text-strong)">your password manager</strong>. A much better target.</div>

<div class="ecj-contrast mt-4">
  <div class="ecj-panel ecj-panel--classic">
    <div class="ecj-panel-label">Classic Clickjacking</div>
    <div class="ecj-panel-body">Attacker loads <code>bank.com</code> in an invisible <code>iframe</code> and overlays a fake button on top.</div>
    <div class="ecj-panel-code">iframe { opacity: 0.001; z-index: 10; }</div>
  </div>

  <div class="ecj-vs" aria-hidden="true">vs</div>

  <div class="ecj-panel ecj-panel--ext">
    <div class="ecj-panel-label">Extension Clickjacking</div>
    <div class="ecj-panel-body">Malicious script hides the extension's injected autofill UI, then overlays a fake "Accept Cookies" banner on top.</div>
    <div class="ecj-panel-code">document.querySelector('.pm-autofill')<br>.style.opacity = '0'</div>
  </div>
</div>

<div v-click class="ecj-why mt-4">
  <div class="ecj-why-title">Why password managers are the ideal target</div>
  <div class="ecj-why-rows">
    <div class="ecj-why-row">
      <div class="ecj-why-tag">Scope</div>
      <div class="ecj-why-text">One vault is the master key — logins, TOTP, cards, and notes for every account, all in one place.</div>
    </div>
    <div class="ecj-why-row">
      <div class="ecj-why-tag">Reach</div>
      <div class="ecj-why-text">The extension injects its UI into <em>every</em> page you load, so there's always something on-screen to hijack — no special target site required.</div>
    </div>
    <div class="ecj-why-row">
      <div class="ecj-why-tag">Trigger</div>
      <div class="ecj-why-text"><strong>Manual autofill</strong> fills credentials when the user selects from the extension's dropdown UI. That selection click is exactly what we hijack.</div>
    </div>
  </div>
  <div class="ecj-why-footnote">
    ⚠ <strong>Automatic autofill</strong> (0-click, mostly browsers) is a separate threat: credentials injected on page load with no interaction at all.
    <a href="https://marektoth.com/blog/password-managers-autofill/#abuse-autofill" target="_blank" style="color:var(--mm-danger-text);margin-left:4px;">Research: <em>You should disable autofill in your password manager</em> (2021) ↗</a>
  </div>
</div>

<style>
.ecj-contrast {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: stretch;
}
.ecj-panel {
  border-radius: 14px;
  overflow: hidden;
  border: 1.5px solid var(--mm-border);
  display: flex;
  flex-direction: column;
}
.ecj-panel--ext { border-color: var(--mm-danger-border); }

.ecj-panel-label {
  font-size: 0.7em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 5px 12px;
  background: var(--mm-defense-bg);
  color: var(--mm-defense-text);
}
.ecj-panel--ext .ecj-panel-label {
  background: var(--mm-danger-bg);
  color: var(--mm-danger-text);
}
.ecj-panel-body {
  padding: 10px 12px;
  font-size: 0.78em;
  color: var(--mm-text);
  line-height: 1.45;
  background: #fff;
  flex: 1;
}
.ecj-panel-code {
  padding: 7px 12px;
  font-family: monospace;
  font-size: 0.7em;
  background: var(--mm-divider);
  color: var(--mm-text-strong);
  border-top: 1px solid var(--mm-border);
  line-height: 1.5;
}
.ecj-vs {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  font-weight: 900;
  color: var(--mm-text-muted);
  padding: 0 4px;
}
.ecj-why {
  border: 1.5px solid var(--mm-danger-border);
  border-radius: 14px;
  overflow: hidden;
}
.ecj-why-title {
  font-size: 0.7em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 5px 14px;
  background: var(--mm-danger-bg);
  color: var(--mm-danger-text);
}
.ecj-why-rows {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: #fff;
}
.ecj-why-row {
  padding: 9px 12px;
  border-right: 1px solid var(--mm-border);
}
.ecj-why-row:last-child { border-right: none; }
.ecj-why-tag {
  font-size: 0.65em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--mm-danger-text);
  margin-bottom: 4px;
}
.ecj-why-text {
  font-size: 0.74em;
  color: var(--mm-text);
  line-height: 1.4;
}
.ecj-why-footnote {
  padding: 6px 14px;
  font-size: 0.68em;
  color: var(--mm-text-muted);
  background: var(--mm-divider);
  border-top: 1px solid var(--mm-border);
  line-height: 1.45;
}
.ecj-badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--mm-danger-bg);
  color: var(--mm-danger-text);
  border: 1px solid var(--mm-danger-border);
  font-size: 0.72em;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.ecj-link {
  font-size: 0.72em;
  font-weight: 700;
  color: var(--mm-danger-text);
  text-decoration: none;
  opacity: 0.75;
  margin-left: 6px;
}
.ecj-link:hover { opacity: 1; }
</style>

<!--
PRESENTER NOTE:
Reframe the threat: the victim site isn't in a frame. Your password manager's injected UI is.
Attacker page runs JS that sets opacity:0 on the extension popup, overlays a cookie banner.

[click] Why password managers specifically?
- Scope: one vault = all accounts. Classic CJ gives you one action on one site. This gives you the master key.
- Reach: the extension injects its UI on every page, so there's always something to hijack. (What that gets you depends on the tier - cards/IDs from any page, logins only with code on the target origin. We scope this on the "Some Loot Is Free" slide.)
- Trigger: we're talking manual autofill. The user clicks to pick credentials from the extension's dropdown UI, and THAT click is what we hijack. (Automatic autofill, 0-click, browser fills on page load, is a separate threat covered in 2021 research; link in the footnote.)

[click] No iframe, no CORS, no frame headers. Any page with a malicious third-party script can do this.
One line of JS on a compromised ad network = game over for autofill.
-->

---
zoom: 0.92
---

# The Page Owns Every Pixel the Extension Draws

<div class="ecj-intro mt-2">
  A password manager has no window of its own. To show its autofill dropdown, it <strong>injects HTML straight into the page you're visiting</strong>. From that moment the page's own JavaScript can read, restyle, and hide it like any other element.
</div>

<div class="ecj-mech mt-6">
  <div class="ecj-mech-step">
    <div class="ecj-mech-num">1</div>
    <div class="ecj-mech-title">Extension injects its UI</div>
    <div class="ecj-mech-desc">A content script adds the autofill dropdown into the page DOM.</div>
    <div class="ecj-mech-code">&lt;pm-autofill&gt; … &lt;/pm-autofill&gt;</div>
  </div>

  <div class="ecj-mech-arrow" aria-hidden="true">→</div>

  <div class="ecj-mech-step" v-click>
    <div class="ecj-mech-num">2</div>
    <div class="ecj-mech-title">The page grabs it</div>
    <div class="ecj-mech-desc">Same DOM, no wall between them. One selector finds the node.</div>
    <div class="ecj-mech-code">document.querySelector('pm-autofill')</div>
  </div>

  <div class="ecj-mech-arrow" aria-hidden="true" v-click>→</div>

  <div class="ecj-mech-step ecj-mech-step--red" v-click>
    <div class="ecj-mech-num">3</div>
    <div class="ecj-mech-title">…and makes it vanish</div>
    <div class="ecj-mech-desc">Invisible to you — still sitting there, still fully clickable.</div>
    <div class="ecj-mech-code">.style.opacity = '0'</div>
  </div>
</div>

<Callout v-click variant="error" class="mt-6" noIcon>
  No iframe is loaded, so <code>X-Frame-Options</code> and <code>frame-ancestors</code> never fire. The browser just sees a page quietly restyling its own contents.
</Callout>

<style>
.ecj-intro { font-size: 0.86em; color: var(--mm-text); line-height: 1.55; max-width: 52rem; }
.ecj-mech {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 12px;
  align-items: stretch;
}
.ecj-mech-step {
  display: flex;
  flex-direction: column;
  padding: 14px 16px;
  background: #fff;
  border: 1.5px solid var(--mm-border);
  border-radius: 14px;
}
.ecj-mech-step--red { border-color: var(--mm-danger-border); background: var(--mm-danger-bg); }
.ecj-mech-num {
  font-size: 1.5em;
  font-weight: 900;
  color: var(--mm-text-strong);
  line-height: 1;
  margin-bottom: 8px;
}
.ecj-mech-step--red .ecj-mech-num { color: var(--mm-danger-text); }
.ecj-mech-title { font-size: 0.9em; font-weight: 800; color: var(--mm-text-strong); margin-bottom: 4px; }
.ecj-mech-desc  { font-size: 0.76em; color: var(--mm-text-muted); line-height: 1.45; flex: 1; }
.ecj-mech-code {
  margin-top: 10px;
  padding: 6px 9px;
  font-family: monospace;
  font-size: 0.68em;
  background: var(--mm-divider);
  color: var(--mm-text-strong);
  border-radius: 8px;
}
.ecj-mech-step--red .ecj-mech-code { background: #fff; }
.ecj-mech-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  font-weight: 900;
  color: var(--mm-text-muted);
}
</style>

<!--
PRESENTER NOTE:
This is the whole "how is this even possible" beat. Keep it concrete.
The extension can't draw outside the page - it has no OS window for the dropdown, so it injects DOM into your page.
[click] Once it's a DOM node, it's the page's DOM. The site's JS (or any third-party script the site loads) can querySelector it.
[click] One line sets opacity:0. The element is invisible but unchanged - same position, same size, still receiving clicks.
[click] Hammer the headers point: there is no frame, so XFO and frame-ancestors are simply not in the conversation. Different layer entirely.
Mention in passing: same idea works by hiding the whole <body> (and painting a screenshot of the site behind it) or by laying a transparent overlay on top with pointer-events:none. Three flavors, one result.
-->

---

# One Loop Covers Every Manager

<div class="ecj-intro mt-2 mb-5">
  Each manager injects its autofill UI with a <strong>unique, predictable DOM signature</strong>. The attacker doesn't need to know which one you use — they probe a list and hide the first match.
</div>

<div class="pmdet-grid">

  <div class="pmdet-sigs">
    <div class="pmdet-head">DOM signatures (by manager)</div>
    <div class="pmdet-rows">
      <div class="pmdet-row"><code>[data-1p-id]</code><span>1Password</span></div>
      <div class="pmdet-row"><code>#bitwarden-notification-bar</code><span>Bitwarden</span></div>
      <div class="pmdet-row"><code>#dashlane-app</code><span>Dashlane</span></div>
      <div class="pmdet-row"><code>[id*="keeper-fill"]</code><span>Keeper</span></div>
      <div class="pmdet-row"><code>#lastpass-vault-root</code><span>LastPass</span></div>
      <div class="pmdet-row"><code>[id^="nordpass"]</code><span>NordPass</span></div>
      <div class="pmdet-row"><code>[id^="protonpass"]</code><span>Proton Pass</span></div>
    </div>
  </div>

  <div class="pmdet-code">
    <div class="pmdet-head pmdet-head--red">Attacker's detection loop</div>
    <pre class="pmdet-pre">const SIGS = [
  '[data-1p-id]',
  '#bitwarden-notification-bar',
  '#dashlane-app',
  '[id*="keeper-fill"]',
  // … one per manager
];
const pmEl = SIGS
  .map(s => document.querySelector(s))
  .find(Boolean);
if (pmEl) pmEl.style.opacity = '0';</pre>
  </div>

</div>

<Callout v-click variant="error" class="mt-5" noIcon>
  Same 15-line script. Every major manager. A single compromised ad tag on any page is enough.
</Callout>

<style>
.pmdet-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  align-items: start;
}
.pmdet-sigs {
  border: 1.5px solid var(--mm-border);
  border-radius: 12px;
  overflow: hidden;
}
.pmdet-head {
  font-size: 0.67em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 6px 14px;
  background: var(--mm-surface);
  color: var(--mm-text-muted);
  border-bottom: 1px solid var(--mm-border);
}
.pmdet-head--red {
  background: var(--mm-danger-bg);
  color: var(--mm-danger-text);
  border-color: var(--mm-danger-border);
}
.pmdet-rows { background: #fff; }
.pmdet-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 14px;
  font-size: 0.77em;
  border-bottom: 1px solid var(--mm-divider);
}
.pmdet-row:last-child { border-bottom: none; }
.pmdet-row code {
  font-family: monospace;
  font-size: 0.93em;
  color: var(--mm-text-strong);
}
.pmdet-row span { color: var(--mm-text-muted); font-size: 0.88em; }
.pmdet-code {
  border: 1.5px solid var(--mm-danger-border);
  border-radius: 12px;
  overflow: hidden;
}
.pmdet-pre {
  margin: 0;
  padding: 14px 16px;
  font-family: monospace;
  font-size: 0.73em;
  background: #fff;
  color: var(--mm-text-strong);
  line-height: 1.65;
  white-space: pre;
}
</style>

<!--
PRESENTER NOTE:
Bridge from the mechanism: the page CAN touch the extension's DOM — but which element? Different managers, different selectors.
The attacker's answer is trivial: try all of them. The detection loop is 15 lines, one selector per manager.
The first querySelector that returns a node wins — hide it, position the decoy overlay, done.
This is why the same code path hit 11 managers: the attack is manager-agnostic. No per-manager customization needed.
The Callout lands the scale: one poisoned ad tag inherits the full 40M-user blast radius.
-->

---
class: px-14 py-4
---

# One Click on "Accept Cookies" Empties the Vault

<div class="ecj-intro mt-2 mb-4">
  Everyone dismisses a cookie banner on reflex. The attacker lines that reflex up with the password manager's hidden Autofill button — so the click you meant for "Accept" lands somewhere else.
</div>

<div class="ecj-recipe">
  <div class="ecj-rstep">
    <div class="ecj-rnum">1</div>
    <div class="ecj-rbody"><strong>Plant a decoy form.</strong> The attacker page drops a login/card form and turns it nearly invisible — <code>opacity: 0.001</code>.</div>
  </div>
  <div class="ecj-rstep" v-click>
    <div class="ecj-rnum">2</div>
    <div class="ecj-rbody"><strong>Wake the password manager.</strong> Script calls <code>.focus()</code> on the form → the autofill dropdown pops up, offering to fill it.</div>
  </div>
  <div class="ecj-rstep" v-click>
    <div class="ecj-rnum">3</div>
    <div class="ecj-rbody"><strong>Hide the dropdown.</strong> Same trick as the last slide — the Autofill button is now invisible but still live.</div>
  </div>
  <div class="ecj-rstep" v-click>
    <div class="ecj-rnum">4</div>
    <div class="ecj-rbody"><strong>Overlay the bait.</strong> A fake "Accept all cookies" banner is positioned so <em>Accept</em> sits exactly on top of the hidden Autofill button.</div>
  </div>
  <div class="ecj-rstep ecj-rstep--red" v-click>
    <div class="ecj-rnum">5</div>
    <div class="ecj-rbody"><strong>You click Accept.</strong> The manager autofills the decoy → values stream to the attacker's server. Cards &amp; identity from any page; logins only if their script is running on your real site. You just saw a cookie banner close.</div>
  </div>
</div>

<style>
.ecj-recipe { display: flex; flex-direction: column; gap: 9px; }
.ecj-rstep {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 16px;
  background: var(--mm-surface);
  border: 1px solid var(--mm-border);
  border-radius: 12px;
}
.ecj-rstep--red { background: var(--mm-danger-bg); border-color: var(--mm-danger-border); }
.ecj-rnum {
  flex: none;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--mm-text-strong);
  color: #fff;
  font-weight: 900;
  font-size: 0.9em;
}
.ecj-rstep--red .ecj-rnum { background: var(--mm-danger); }
.ecj-rbody { font-size: 0.84em; color: var(--mm-text); line-height: 1.45; }
.ecj-rbody strong { color: var(--mm-text-strong); }
</style>

<!--
PRESENTER NOTE:
This is the con, told as a recipe. Walk it one click at a time.
1. Decoy form is real and on the page, just at opacity 0.001 - the manager treats it as a normal field.
2. focus() is the key move: manual autofill shows its dropdown when a field gets focus. The attacker triggers that, the user didn't.
3. Hide the dropdown with opacity/overlay - the Autofill button stays exactly where it is.
4. Alignment is the craft: the visible "Accept" button must overlap the invisible Autofill button. Cookie banner, captcha, newsletter close-X all work as bait.
[click through 5] The punchline: the user performed a completely normal action and the credentials went to the attacker. No warning, no second click.
Then: scope what this actually grabs - and what each tier costs the attacker.
-->

---
zoom: 0.92
---

# Some Loot Is Free. Logins Cost a Foothold.

<div class="ecj-intro mt-2">
  The autofill dropdown only ever offers what it would fill on <em>this</em> origin. So what an attacker walks away with depends entirely on <strong>where they already have a foothold</strong>.
</div>

<div class="ecj-matrix mt-5">
  <div class="ecj-matrix-head">
    <div>Target</div>
    <div>Needs a vuln on the victim's site?</div>
    <div>Effort</div>
    <div>Noticed?</div>
  </div>

  <div class="ecj-matrix-row">
    <div class="ecj-mt">
      <div class="ecj-mt-name">Personal info &amp; cards</div>
      <div class="ecj-mt-sub">Name, email, address · card no. + CVV</div>
    </div>
    <div><span class="ecj-pill ecj-pill--red">None</span><span class="ecj-mt-note">Not domain-scoped — fills on any attacker page.</span></div>
    <div><span class="ecj-pill ecj-pill--red">1 click</span></div>
    <div><span class="ecj-pill ecj-pill--red">No</span></div>
  </div>

  <div class="ecj-matrix-row" v-click>
    <div class="ecj-mt">
      <div class="ecj-mt-name">Logins &amp; TOTP</div>
      <div class="ecj-mt-sub">Password + 2FA code = full account takeover</div>
    </div>
    <div><span class="ecj-pill ecj-pill--amber">Code on the origin</span><span class="ecj-mt-note">XSS · cache poisoning · subdomain takeover · malicious upload to a trusted CDN — any subdomain counts.</span></div>
    <div><span class="ecj-pill ecj-pill--red">1 click</span></div>
    <div><span class="ecj-pill ecj-pill--red">No</span></div>
  </div>

  <div class="ecj-matrix-row" v-click>
    <div class="ecj-mt">
      <div class="ecj-mt-name">Full vault export</div>
      <div class="ecj-mt-sub">Every saved item, including secure notes</div>
    </div>
    <div><span class="ecj-pill ecj-pill--red">None</span><span class="ecj-mt-note">Drive the manager's own "select all → share/export" flow.</span></div>
    <div><span class="ecj-pill ecj-pill--amber">Multi-step</span></div>
    <div><span class="ecj-pill ecj-pill--amber">Sometimes</span></div>
  </div>
</div>

<div v-click class="ecj-matrix-foot mt-4">
  💡 The hidden autofill UI can be pinned <strong>under the cursor</strong> — re-<code>focus()</code> every ~100 ms — so it's one click <em>anywhere</em> on the page, not on an exact pixel.
</div>

<style>
.ecj-matrix { border: 1.5px solid var(--mm-border); border-radius: 14px; overflow: hidden; }
.ecj-matrix-head,
.ecj-matrix-row {
  display: grid;
  grid-template-columns: 1.15fr 1.85fr 0.8fr 0.7fr;
  align-items: center;
}
.ecj-matrix-head {
  background: var(--mm-text-strong);
  color: #fff;
  font-size: 0.68em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.ecj-matrix-head > div { padding: 8px 14px; }
.ecj-matrix-row { background: #fff; border-top: 1px solid var(--mm-border); }
.ecj-matrix-row > div { padding: 11px 14px; font-size: 0.78em; color: var(--mm-text); }
.ecj-mt-name { font-weight: 800; color: var(--mm-text-strong); font-size: 1.05em; }
.ecj-mt-sub  { font-size: 0.85em; color: var(--mm-text-muted); margin-top: 2px; line-height: 1.35; }
.ecj-mt-note { display: block; font-size: 0.82em; color: var(--mm-text-muted); margin-top: 5px; line-height: 1.4; }
.ecj-pill {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.94em;
  font-weight: 700;
}
.ecj-pill--red   { background: var(--mm-danger-bg);  color: var(--mm-danger-text);  border: 1px solid var(--mm-danger-border); }
.ecj-pill--amber { background: var(--mm-warning-bg); color: var(--mm-warning-text); border: 1px solid var(--mm-warning-border); }
.ecj-matrix-foot {
  font-size: 0.8em;
  color: var(--mm-text);
  background: var(--mm-surface);
  border: 1px dashed var(--mm-border);
  border-radius: 10px;
  padding: 10px 14px;
  line-height: 1.5;
}
</style>

<!--
PRESENTER NOTE:
This is the honest-scoping slide - it answers "wait, can it really steal anything from any site?"
Row 1 (visible): personal data + cards are NOT domain-scoped. The manager fills them on any page with the right field, so the attacker needs nothing but their own page. One click, no notice. This is what the cookie-banner demo actually steals.
[click] Row 2: logins + TOTP ARE origin-matched. To get bank.com's login the attacker must run JS on bank.com's origin - XSS, cache poisoning, subdomain takeover, or sneaking a JS-bearing file (e.g. SVG) onto a trusted CDN. Subdomain autofill widens this: XSS on blog.example.com reaches example.com creds. Password + TOTP together beats 2FA - that's the real prize.
[click] Row 3: the whole vault. Not domain-scoped, but it's a multi-step click/drag sequence (select all → share/export), and depending on the manager the victim may get a share notification. Higher effort, broader payoff.
[click] Footnote kills the "users won't click the exact spot" objection: pin the autofill UI under the cursor (re-focus every ~100ms) and any single click anywhere triggers it.
Hand to demo: the demo shows the logins tier - a page the attacker's script already runs on (a bank dashboard that loads malicious JS). That's the foothold precondition from row 2.
-->

---
layout: center
---

## Demo - Cookie Banner Steals Your Credentials

<div class="ecj-demo-wrap">
  <div class="ecj-demo-hint">Click "Accept All" on the page below</div>
  <iframe src="/clickjacking/victims/ext-clickjack-demo.html" style="width:760px;height:400px;border:none;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.10);"></iframe>
</div>

<style>
.ecj-demo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.ecj-demo-hint {
  font-size: 0.8em;
  color: var(--mm-text-muted);
  font-style: italic;
}
</style>

<!--
PRESENTER NOTE:
Point out: this looks like a normal banking dashboard - and crucially, the malicious script is running on the bank's own page (that's the row-2 foothold; assume XSS or a compromised third-party script).
Ask the audience what they'd do if they saw this cookie banner.
Click "Accept All" - the hidden password manager popup flashes briefly, then the damage card shows stolen credentials.
Key message: the user did nothing wrong. Their own security tool was used against them.
-->

---
zoom: 0.92
---

# 40 Million Users at Risk — With Real Constraints

<div class="grid grid-cols-2 gap-8 mt-4 items-start">

<div>
  <div class="risk-stat">
    <div class="risk-stat-num">11</div>
    <div class="risk-stat-label">Password managers — all initially vulnerable, all disclosed in 2025</div>
  </div>
  <div class="risk-stat risk-stat--red mt-3">
    <div class="risk-stat-num">40M+</div>
    <div class="risk-stat-label">Active installs across affected managers</div>
  </div>

  <div class="risk-pm-grid mt-4">
    <div class="risk-pm-chip">1Password</div>
    <div class="risk-pm-chip">Bitwarden</div>
    <div class="risk-pm-chip">Dashlane</div>
    <div class="risk-pm-chip">Keeper</div>
    <div class="risk-pm-chip">Proton Pass</div>
    <div class="risk-pm-chip">NordPass</div>
    <div class="risk-pm-chip">+ 5 more</div>
  </div>
</div>

<div v-click>
  <div class="risk-lim-header">What limits the attack</div>

  <div class="risk-lim mt-3">
    <div class="risk-lim-icon">⏱</div>
    <div class="risk-lim-body">
      <div class="risk-lim-name">Auto-lock / inactivity timeout</div>
      <div class="risk-lim-desc">A locked vault never shows the autofill dropdown — no trigger, no hijack. The attack only works during an <strong>active, unlocked session</strong>. Lock timing varies wildly across managers: from 1 minute to never.</div>
    </div>
  </div>

  <div class="risk-lim mt-3">
    <div class="risk-lim-icon">📐</div>
    <div class="risk-lim-body">
      <div class="risk-lim-name">Screen resolution &amp; zoom</div>
      <div class="risk-lim-desc">The fake button must sit pixel-perfectly over the hidden autofill UI. Different DPI, viewport width, or browser zoom shifts the dropdown — the click misses.</div>
    </div>
  </div>
</div>

</div>

<style>
.risk-stat {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: var(--mm-warning-bg);
  border: 1.5px solid var(--mm-warning-border);
  border-radius: 12px;
}
.risk-stat--red {
  background: var(--mm-danger-bg);
  border-color: var(--mm-danger-border);
}
.risk-stat-num   { font-size: 2em; font-weight: 900; color: var(--mm-text-strong); line-height: 1; }
.risk-stat-label { font-size: 0.8em; color: var(--mm-text-muted); line-height: 1.3; }
.risk-pm-grid { display: flex; flex-wrap: wrap; gap: 6px; }
.risk-pm-chip {
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 0.72em;
  font-weight: 700;
  border: 1px solid var(--mm-border);
  background: #fff;
  color: var(--mm-text-strong);
}
.risk-lim-header {
  font-size: 0.68em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--mm-text-muted);
}
.risk-lim {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px 14px;
  background: #fff;
  border: 1px solid var(--mm-border);
  border-radius: 12px;
}
.risk-lim-icon { font-size: 1.4em; line-height: 1; flex: none; padding-top: 2px; }
.risk-lim-name { font-size: 0.86em; font-weight: 800; color: var(--mm-text-strong); margin-bottom: 4px; }
.risk-lim-desc { font-size: 0.76em; color: var(--mm-text-muted); line-height: 1.45; }
.risk-lim-desc strong { color: var(--mm-text-strong); }
</style>

<!--
PRESENTER NOTE:
Scope the blast radius before moving to defenses.
11 managers, 40M+ installs — Marek Toth's 2025 coordinated disclosure. All vulnerable before patching.

Left shows scope: 11 managers, 40M+ installs — Marek Toth's 2025 coordinated disclosure.

[click] Right reveals both constraints at once:
Auto-lock: locked vault = no autofill dropdown = nothing to hijack. Requires an active session. But lock timing is not standardized — some managers default to 1 minute, others to "on browser close" or never. The attack window varies wildly depending on which manager the victim uses.
Screen resolution: attacker hardcodes overlay pixel positions. Different viewport size, DPI scaling, or browser zoom shifts where the autofill dropdown lands — misalignment means the click goes to the wrong element. Solvable with a runtime window.innerWidth probe, but adds friction.
Segue to what actually helps.
-->

---
zoom: 0.9
---

# Everyone Has to Fix a Piece of This

<div class="ecj-fix-grid mt-4">

  <OffsetCard title="Extension developers" accent="red">
    <template #icon>🧩</template>
    Render UI in a <strong>closed Shadow DOM</strong> so page JS can't reach it. Before filling, check <code>getComputedStyle</code> opacity &amp; visibility, and abort on suspicious style mutations.
  </OffsetCard>

  <OffsetCard title="Web authors" accent="orange">
    <template #icon>🌐</template>
    Keep <strong>untrusted third-party scripts</strong> off auth and payment pages — that's the foothold the attack needs. A tight CSP limits who runs JS in your page.
  </OffsetCard>

  <OffsetCard title="You, the user" accent="blue">
    <template #icon>🙋</template>
    Prefer <strong>manual autofill with a confirmation step</strong>, keep extensions updated, and be wary of a site nagging you to click something in an odd spot.
  </OffsetCard>

</div>

<Callout v-click variant="note" class="mt-6">
  No single response header closes this. Your browser's own security tool became the attack surface — so the fix has to come from the <strong>extension ecosystem</strong>, not just one site.
</Callout>

<style>
.ecj-fix-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>

<!--
PRESENTER NOTE:
Land it as a shared-responsibility slide - this is the honest takeaway: no one party fixes it alone.
Extension devs: closed Shadow DOM is the real structural fix (page JS literally can't traverse in). Plus visibility checks before fill + MutationObserver to bail if styles are tampered with. Most of the 11 shipped fixes along these lines after disclosure.
Web authors: you can't patch the extension, but you control what scripts run on your sensitive pages. No untrusted third-party JS on login/checkout; CSP to enforce it.
Users: pick managers that confirm before filling (that native 1Password dialog from the last slide is exactly this), keep them updated, and treat "click here" nags in weird positions with suspicion.
[click] The closing line: there's no frame-ancestors equivalent here. It's an ecosystem fix, which is why it took coordinated disclosure across 11 vendors.
-->
