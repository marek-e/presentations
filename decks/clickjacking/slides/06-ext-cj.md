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
      <div class="ecj-why-text">One vault is the master key. Logins, TOTP, cards, and notes for every account, all in one place.</div>
    </div>
    <div class="ecj-why-row">
      <div class="ecj-why-tag">Reach</div>
      <div class="ecj-why-text">The extension injects its UI into <em>every</em> page you load, so there's always something on-screen to hijack, with no special target site required.</div>
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

  <div class="ecj-mech-arrow" aria-hidden="true" v-click="1">→</div>

  <div class="ecj-mech-step" v-click="1">
    <div class="ecj-mech-num">2</div>
    <div class="ecj-mech-title">The page grabs it</div>
    <div class="ecj-mech-desc">Same DOM, no wall between them. One selector finds the node.</div>
    <div class="ecj-mech-code">document.querySelector('pm-autofill')</div>
  </div>

  <div class="ecj-mech-arrow" aria-hidden="true" v-click="2">→</div>

  <div class="ecj-mech-step ecj-mech-step--red" v-click="2">
    <div class="ecj-mech-num">3</div>
    <div class="ecj-mech-title">…and makes it vanish</div>
    <div class="ecj-mech-desc">Invisible to you, but still sitting there, still fully clickable.</div>
    <div class="ecj-mech-code">.style.opacity = '0'</div>
  </div>
</div>

<Callout v-click="3" variant="warning" class="mt-6" noIcon>
  There's no iframe here at all. The browser just sees a page quietly restyling its own contents.
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
  Each manager injects its autofill UI with a <strong>unique, predictable DOM signature</strong>. The attacker doesn't need to know which one you use. They probe a list and hide the first match.
</div>

<div class="pmdet-grid">

  <div class="pmdet-sigs">
    <div class="pmdet-head">DOM signatures (by manager)</div>
    <div class="pmdet-rows">
      <div class="pmdet-row"><code>[com-1password-menu]</code><span>1Password</span></div>
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
Bridge from the mechanism: the page CAN touch the extension's DOM, but which element? Different managers, different selectors.
The attacker's answer is trivial: try all of them. The detection loop is 15 lines, one selector per manager.
The first querySelector that returns a node wins. Hide it, position the decoy overlay, done.
This is why the same code path hit 11 managers: the attack is manager-agnostic. No per-manager customization needed.
The Callout lands the scale: one poisoned ad tag inherits the full 40M-user blast radius.
-->

---
class: px-14 py-4
---

# One Click on "Accept Cookies" Empties the Vault

<div class="ecj-intro mt-2 mb-4">
  Everyone dismisses a cookie banner on reflex. The attacker lines that reflex up with the password manager's hidden Autofill button, so the click you meant for "Accept" lands somewhere else.
</div>

<div class="ecj-recipe">
  <div class="ecj-rstep">
    <div class="ecj-rnum">1</div>
    <div class="ecj-rbody"><strong>Plant a decoy form.</strong> The attacker page drops a login/card form and turns it nearly invisible with <code>opacity: 0.001</code>.</div>
  </div>
  <div class="ecj-rstep" v-click>
    <div class="ecj-rnum">2</div>
    <div class="ecj-rbody"><strong>Wake the password manager.</strong> Script calls <code>.focus()</code> on the form → the autofill dropdown pops up, offering to fill it.</div>
  </div>
  <div class="ecj-rstep" v-click>
    <div class="ecj-rnum">3</div>
    <div class="ecj-rbody"><strong>Hide the dropdown.</strong> Same trick: set <code>opacity: 0</code> on the Autofill button.</div>
  </div>
  <div class="ecj-rstep" v-click>
    <div class="ecj-rnum">4</div>
    <div class="ecj-rbody"><strong>Overlay the bait.</strong> A fake "Accept all cookies" banner is positioned so <em>Accept</em> sits exactly on top of the hidden Autofill button.</div>
  </div>
  <div class="ecj-rstep ecj-rstep--red" v-click>
    <div class="ecj-rnum">5</div>
    <div class="ecj-rbody"><strong>You click Accept.</strong> The manager autofills the decoy → values stream to the attacker's server.</div>
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

# Loot Depends on the Foothold

<InfoPopover title="Pin the autofill UI under the cursor" width="40rem" x="3.5rem" y="4.5rem">
  <pre class="ecj-pin-pre">document.addEventListener('mousemove', function (event) {
  document.getElementById('personalform').style =
    "top: " + (event.pageY - 50) + "px; left:" + (event.pageX - 100) + "px;" +
    " width: 200px; position: fixed; z-index: 2147483647 !important; opacity: 0.5;";
  window.setTimeout(function () {
    document.getElementById('name').focus();
  }, 100);
});</pre>
</InfoPopover>

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
    <div><span class="ecj-pill ecj-pill--red">None</span><span class="ecj-mt-note">Not domain-scoped, so it fills on any attacker page.</span></div>
    <div><span class="ecj-pill ecj-pill--red">1 click</span></div>
    <div><span class="ecj-pill ecj-pill--red">No</span></div>
  </div>

  <div class="ecj-matrix-row" v-click>
    <div class="ecj-mt">
      <div class="ecj-mt-name">Logins &amp; TOTP</div>
      <div class="ecj-mt-sub">Password + 2FA code = full account takeover</div>
    </div>
    <div><span class="ecj-pill ecj-pill--amber">Code on the origin</span><span class="ecj-mt-note">XSS · cache poisoning · subdomain takeover · malicious upload to a trusted CDN. Any subdomain counts.</span></div>
    <div><span class="ecj-pill ecj-pill--red">1 click</span></div>
    <div><span class="ecj-pill ecj-pill--red">No</span></div>
  </div>

  <div class="ecj-matrix-row" v-click>
    <div class="ecj-mt">
      <div class="ecj-mt-name">Full vault export</div>
      <div class="ecj-mt-sub">Every saved item, including secure notes</div>
    </div>
    <div><span class="ecj-pill ecj-pill--red">None</span><span class="ecj-mt-note">Depends on the manager's own "select all → share/export" flow.</span></div>
    <div><span class="ecj-pill ecj-pill--amber">Multi-step</span></div>
    <div><span class="ecj-pill ecj-pill--amber">Sometimes</span></div>
  </div>
</div>

<div v-click class="ecj-matrix-foot mt-4">
  💡 The hidden autofill UI can be pinned <strong>under the cursor</strong> (re-<code>focus()</code> every ~100 ms), so it's one click <em>anywhere</em> on the page, not on an exact pixel.
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
.ecj-pin-pre {
  margin: 0;
  font-family: monospace;
  font-size: 0.78em;
  line-height: 1.6;
  color: var(--mm-text-strong);
  background: var(--mm-divider);
  border-radius: 8px;
  padding: 12px 14px;
  white-space: pre;
  overflow-x: auto;
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

## Demo - Two Clicks to Empty Your Vault

<div class="ecj-demo-wrap">
  <video
    :src="'/clickjacking/roboform-visible.mp4'"
    controls
    autoplay
    loop
    muted
    playsinline
    style="width:680px;max-width:100%;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.10);"
  ></video>
  <a href="https://websecurity.dev/password-managers/dom-based-extension-clickjacking/" target="_blank" class="ecj-demo-link">Experience it yourself ↗</a>
</div>

<style>
.ecj-demo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.ecj-demo-link {
  font-size: 0.82em;
  font-weight: 700;
  color: var(--mm-danger-text);
  text-decoration: none;
  border: 1px solid var(--mm-danger-border);
  background: var(--mm-danger-bg);
  border-radius: 999px;
  padding: 4px 14px;
}
.ecj-demo-link:hover { opacity: 0.85; }
</style>

<!--
PRESENTER NOTE:
Recorded RoboForm demo. Point out: this looks like a normal page with a cookie banner, but RoboForm's autofill UI is sitting invisibly behind the "Accept All" button.
Ask the audience what they'd do if they saw this cookie banner.
Watch the click land on Accept - the hidden autofill fires and credentials go to the attacker. The victim just saw a banner close.
Key message: the user did nothing wrong. Their own security tool was used against them.
Point to the link (websecurity.dev): the audience can try the live PoC themselves afterwards.
-->

---
zoom: 0.92
---

# 40 Million Users at Risk, and Real Constraints

<div class="grid grid-cols-2 gap-8 mt-4 items-start">

<div>
  <div class="risk-stat">
    <div class="risk-stat-num">11</div>
    <div class="risk-stat-label">Password managers, all initially vulnerable, all disclosed in 2025</div>
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
      <div class="risk-lim-desc">A locked vault never shows the autofill dropdown, so there's no trigger and no hijack. The attack only works during an <strong>active, unlocked session</strong>. Lock timing varies wildly across managers: from 1 minute to never.</div>
    </div>
  </div>

  <div class="risk-lim mt-3">
    <div class="risk-lim-icon">📐</div>
    <div class="risk-lim-body">
      <div class="risk-lim-name">Screen resolution &amp; zoom</div>
      <div class="risk-lim-desc">The fake button must sit pixel-perfectly over the hidden autofill UI. Different DPI, viewport width, or browser zoom shifts the dropdown, and the click misses.</div>
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
11 managers, 40M+ installs, from Marek Toth's 2025 coordinated disclosure. All vulnerable before patching.

Left shows scope: 11 managers, 40M+ installs, from Marek Toth's 2025 coordinated disclosure.

[click] Right reveals both constraints at once:
Auto-lock: locked vault = no autofill dropdown = nothing to hijack. Requires an active session. But lock timing is not standardized. Some managers default to 1 minute, others to "on browser close" or never. The attack window varies wildly depending on which manager the victim uses.
Screen resolution: attacker hardcodes overlay pixel positions. Different viewport size, DPI scaling, or browser zoom shifts where the autofill dropdown lands, so misalignment means the click goes to the wrong element. Solvable with a runtime window.innerWidth probe, but adds friction.
Segue to what actually helps.
-->

---
zoom: 0.95
---

# Extension-Side Mitigations: Cover All Three Surfaces

<div class="ecj-intro mt-2 mb-5">
  The extension fix isn't one change. The page can hide your autofill UI in <strong>three different places</strong>, and patching two of them still leaves the vault wide open.
</div>

<div class="surfmap">
  <div class="surfmap-card">
    <div class="surfmap-top"><span class="surfmap-num">1</span><span class="surfmap-name">The node itself</span></div>
    <div class="surfmap-how">Restyle the extension's own injected element.</div>
    <code class="surfmap-code">el.style.opacity = 0</code>
  </div>
  <div class="surfmap-card" v-click>
    <div class="surfmap-top"><span class="surfmap-num">2</span><span class="surfmap-name">A parent element</span></div>
    <div class="surfmap-how">Hide it from above, fake the real page behind.</div>
    <code class="surfmap-code">body { opacity: 0 }</code>
  </div>
  <div class="surfmap-card" v-click>
    <div class="surfmap-top"><span class="surfmap-num">3</span><span class="surfmap-name">An overlay on top</span></div>
    <div class="surfmap-how">Leave it visible, stack a decoy over it.</div>
    <code class="surfmap-code">z-index: 2147483647</code>
  </div>
</div>

<style>
.surfmap { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.surfmap-card {
  border: 1.5px solid var(--mm-danger-border);
  border-radius: 14px;
  padding: 14px 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.surfmap-top { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.surfmap-num {
  flex: none; width: 1.9rem; height: 1.9rem;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; background: var(--mm-danger); color: #fff;
  font-weight: 900; font-size: 0.95em;
}
.surfmap-name { font-size: 0.92em; font-weight: 800; color: var(--mm-text-strong); }
.surfmap-how { font-size: 0.78em; color: var(--mm-text-muted); line-height: 1.45; flex: 1; }
.surfmap-code {
  margin-top: 10px; padding: 6px 10px;
  font-family: monospace; font-size: 0.74em;
  background: var(--mm-danger-bg); color: var(--mm-danger-text);
  border-radius: 8px; display: block;
}

/* shared variant-slide layout (global, reused by the three surface slides) */
.vsurf { display: grid; grid-template-columns: 1.05fr 1fr; gap: 22px; align-items: start; }
.vsurf--media { align-items: center; }
.vsurf--media .vsurf-img { max-height: 15vh; }
.vsurf-col { border: 1.5px solid var(--mm-border); border-radius: 14px; overflow: hidden; }
.vsurf-col--attack { border-color: var(--mm-danger-border); }
.vsurf-col--fix { border-color: var(--mm-defense-border); }
.vsurf-label {
  font-size: 0.68em; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
  padding: 6px 14px;
}
.vsurf-col--attack .vsurf-label { background: var(--mm-danger-bg); color: var(--mm-danger-text); }
.vsurf-col--fix .vsurf-label { background: var(--mm-defense-bg); color: var(--mm-defense-text); }
.vsurf-body { padding: 12px 14px; background: #fff; }
.vsurf-img {
  width: 100%; max-height: 42vh; object-fit: contain;
  border: 1px solid var(--mm-border); border-radius: 8px;
  background: var(--mm-surface); display: block;
}
.vsurf-cap { font-size: 0.74em; color: var(--mm-text-muted); line-height: 1.45; margin-top: 8px; }
.vsurf-fix-text { font-size: 0.82em; color: var(--mm-text); line-height: 1.55; margin: 0 0 9px; }
.vsurf-fix-text:last-child { margin-bottom: 0; }
.vsurf-fix-text strong { color: var(--mm-text-strong); }
.vsurf-fix-text code { font-family: monospace; font-size: 0.9em; color: var(--mm-text-strong); }
.vsurf-note {
  margin-top: 10px; padding: 8px 12px; font-size: 0.74em;
  background: var(--mm-warning-bg); color: var(--mm-warning-text);
  border: 1px solid var(--mm-warning-border); border-radius: 8px; line-height: 1.45;
}
</style>

<!--
PRESENTER NOTE:
The core dev message: there is no single fix. The attack hits three independent surfaces, and a defense that misses one leaves the extension exploitable. This slide just names them; the next three slides take one each.
Walk the three cards: (1) restyle the extension's own node, (2) hide it from a parent, (3) leave it visible and overlay a decoy. Patch any two and the third still empties the vault.
[click][click] reveal cards 2 and 3.
The next three slides take one surface each; then a slide on 1Password's shipped fix shows what a real answer looks like.
This is why it took coordinated disclosure across 11 vendors - the complete fix is genuinely hard.
-->

---

# Surface 1: Extension Element

<div class="ecj-intro mt-2 mb-4">
  The blunt move. Grab the extension's injected element and set its opacity to zero. Invisible to you, still sitting there, still fully clickable.
</div>

<div class="vsurf">
  <div class="vsurf-col vsurf-col--attack">
    <div class="vsurf-label">The attack</div>
<div class="vsurf-body">

```js
// grab the manager's injected UI
const el = document.querySelector('com-1password-button');
// invisible, but same spot and still clickable
el.style.opacity = '0';
```

</div>
  </div>
  <div class="vsurf-col vsurf-col--fix" v-click>
    <div class="vsurf-label">What the extension must do</div>
    <div class="vsurf-body">
      <p class="vsurf-fix-text">Render the UI inside a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow" target="_blank"><strong>closed Shadow-Root</strong></a>, so page JS can't even <code>querySelector</code> the node.</p>
      <p class="vsurf-fix-text">Run a <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver" target="_blank"><strong>MutationObserver</strong></a> on your own element and revert any style the page tries to set on it.</p>
      <Callout variant="warning" class="mt-2">This is the fix most people stop at. On its own, it covers one surface out of three.</Callout>
    </div>
  </div>
</div>

<!--
PRESENTER NOTE:
Surface 1 is the obvious one. The page selects the extension's injected element and sets opacity:0 - the element is invisible but unchanged: same position, same size, still receiving clicks.
[click] The fix: a closed Shadow-Root means page JS literally cannot querySelector the node, and a MutationObserver on your own element catches and reverts style tampering.
Hammer the warning: this is where most implementations stop, and it only closes one of three doors. The next two slides are the doors they forget.
-->

---

# Surface 2: Parent Element

<div class="ecj-intro mt-2 mb-4">
  Never touch the extension's node at all. Set <code>opacity: 0</code> on a parent like <code>&lt;body&gt;</code>, and paint a screenshot of the real site as the background so nothing looks missing.
</div>

<div class="vsurf">
  <div class="vsurf-col vsurf-col--attack">
    <div class="vsurf-label">The attack</div>
    <div class="vsurf-body">
      <img src="../public/ext-cj/parent-elem.png" alt="DevTools showing opacity:0 on body and a background-image faking the website on the html element" class="vsurf-img" />
    </div>
  </div>
  <div class="vsurf-col vsurf-col--fix" v-click>
    <div class="vsurf-label">What the extension must do</div>
    <div class="vsurf-body">
      <p class="vsurf-fix-text">Walk <strong>computed opacity up the ancestor chain</strong>, not just your own element.</p>
      <p class="vsurf-fix-text">Or draw in the browser's <strong>top layer</strong> via the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API" target="_blank"><strong>Popover API</strong></a>, which ignores ancestor opacity entirely.</p>
    </div>
  </div>
</div>

<!--
PRESENTER NOTE:
Surface 2 is the sneaky one. The attacker sets opacity:0 on <body> (or <html>) - the extension's node is untouched, so a MutationObserver on your own element sees nothing. A background-image of the real site keeps the page looking normal.
Point at the screenshot: body style="opacity:0", html with background-image:url(website.png), the 1Password nodes still in the tree.
[click] The fix: walk computed opacity up the ancestor chain, OR render in the top layer with the Popover API, which is unaffected by ancestor opacity. Top layer is the cleaner answer because it sidesteps the whole ancestor problem.
-->

---

# Surface 3: Overlay

<div class="ecj-intro mt-2 mb-4">
  Leave the autofill UI fully visible. Just layer a decoy element <em>over</em> it, so the click that looks like it lands on your banner actually lands on the dropdown underneath.
</div>

<div class="grid grid-cols-2 gap-8 items-center mt-2">
  <div>
    <img src="../public/ext-cj/partialoverlay.gif" alt="The 1Password autofill dropdown stays visible while a decoy element is layered over it" class="vsurf-img" style="max-height:52vh" />
    <div class="vsurf-cap"><strong>Partial overlay</strong> (above): a small decoy covers just the clickable area. <strong>Full overlay</strong>: a decoy covers the whole UI but sets <code>pointer-events: none</code>, so the click passes straight through to the button underneath.</div>
  </div>
  <div class="vsurf-col vsurf-col--fix" v-click>
    <div class="vsurf-label">What the extension must do</div>
    <div class="vsurf-body">
      <p class="vsurf-fix-text">Stay the <strong>last / top-layer</strong> node. Enumerate other popovers and refuse to show (or auto-close) if any exist.</p>
      <p class="vsurf-fix-text">Use <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint" target="_blank"><code>elementsFromPoint()</code></a> to detect a <strong>partial overlay</strong> sitting over your clickable area.</p>
    </div>
  </div>
</div>

<!--
PRESENTER NOTE:
Surface 3 is the one that beats both previous fixes. The attacker doesn't touch the UI at all - it stays fully visible, every opacity check passes - they just stack a decoy element on top with a higher z-index / in the top layer.
Point at the gif: the autofill dropdown is right there and untouched; the decoy is layered over the clickable area.
[click] The fix: make sure you're the last / top-layer node, enumerate other popovers and bail (or auto-close) if any exist, and use elementsFromPoint() to catch a partial overlay covering your button.
Land it: cover surface 1 and 2 perfectly and this one still works. That's why the complete fix is hard and took 11 vendors.
-->

---
layout: center
---

# The safest solution: a new popup window

<div class="ip-slide">
  <img src="../public/1password-alert.png" alt="1Password native browser dialog asking the user to click OK to fill the credential" class="ip-slide-img" />
  <div class="ip-slide-text">
    <div class="ip-cap-title">A native browser dialog, not page DOM</div>
    <div class="ip-cap">Picking a login now pops a <strong>native browser dialog</strong> to confirm the fill. It lives <strong>outside the page</strong>, so no amount of <code>opacity</code>, parent tricks, or overlays can hide or fake it.</div>
    <div class="ip-cap mt-3">This sidesteps all three surfaces at once. The only structurally safe move is to stop drawing where the page can reach.</div>
  </div>
</div>

<style>
.ip-slide { display: flex; gap: 28px; align-items: center; justify-content: center; margin-top: 1rem; }
.ip-slide-img { width: auto; max-height: 40vh; display: block; border: 1px solid var(--mm-border); border-radius: 8px; flex: none; }
.ip-slide-text { max-width: 24rem; }
.ip-slide-text .ip-cap-title { font-size: 1.1em; font-weight: 700; color: var(--mm-defense-text); margin-bottom: 8px; }
.ip-slide-text .ip-cap { font-size: 0.9em; color: var(--mm-text); line-height: 1.55; }
.ip-slide-text .ip-cap strong { color: var(--mm-text-strong); }
.ip-slide-text .ip-cap code { font-family: monospace; font-size: 0.9em; color: var(--mm-text-strong); }
</style>

<!--
PRESENTER NOTE:
This is the "what a real fix looks like" beat, and the bridge to the recommendations slide.
1Password's shipped fix: when you pick a login, you get a native browser confirm dialog ("Click OK to fill..."). That dialog is drawn by the browser, not the page, so the attacker can't hide it or overlay it.
This is the "render outside the page" idea made concrete - it neutralizes all three surfaces at once, because none of them can touch UI that isn't in the page DOM.
Tradeoff to flag (sets up the next slide): it adds a click to every fill, so it's friction. That's the practicality-vs-security tension the recommendations slide unpacks.
-->

---
zoom: 0.92
---

# User Recommendations: Practicality vs. Security

<div class="ecj-intro mt-2 mb-4">
  Every fix on the last slide is <strong>JavaScript fighting JavaScript</strong>, an arms race the attacker can white-box. There's no <code>frame-ancestors</code> equivalent here, so today it comes down to tradeoffs.
</div>

<div class="grid grid-cols-2 gap-7 items-start">

<div class="efx2-truth">
  <div class="efx2-truth-head">Why even all three aren't enough</div>
  <div class="efx2-truth-body">
    <p>The attacker can <strong>read the extension's content script</strong> and build around every check. Conflicts between the two scripts are likely.</p>
    <p>The only <strong>structurally safe</strong> move is to render <em>outside</em> the page: a real popup window, a system dialog, or a context-menu autofill. All of them break the one-click UX users expect.</p>
    <p class="efx2-punch">The real fix is platform-level: browsers need a <strong>new API</strong> that lets an extension paint UI the page can't see or touch.</p>
  </div>
</div>

<div>
  <div class="efx2-user-head">What you can do today</div>

  <div class="efx2-user mt-3">
    <div class="efx2-user-name">Update your software</div>
    <div class="efx2-user-desc">All 11 managers shipped fixes, so the patch only helps if you run it. The threat constantly changes, so it's a good idea to update your software regularly.</div>
  </div>
  <div class="efx2-user mt-2" v-click>
    <div class="efx2-user-name">Disable manual autofill, copy/paste only</div>
    <div class="efx2-user-desc">Removes the trigger entirely. Inconvenient, especially for personal info and cards.</div>
  </div>
  <div class="efx2-user mt-2" v-click>
    <div class="efx2-user-name">Require exact-URL match for autofill</div>
    <div class="efx2-user-desc">Kills subdomain abuse, but not an attacker already running code on the exact domain. Cards and personal data still leak.</div>
  </div>
</div>

</div>

<Callout v-click variant="note" class="mt-5">
  No single recommendation fits everyone. Pick the tradeoff you can live with, and lean on browser vendors to give extensions a <strong>safe surface to draw on</strong>.
</Callout>

<style>
.efx2-truth { border: 1.5px solid var(--mm-danger-border); border-radius: 14px; overflow: hidden; height: 100%; }
.efx2-truth-head {
  font-size: 0.68em; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
  padding: 6px 14px; background: var(--mm-danger-bg); color: var(--mm-danger-text);
}
.efx2-truth-body { padding: 12px 14px; background: #fff; }
.efx2-truth-body p { font-size: 0.78em; color: var(--mm-text); line-height: 1.5; margin: 0 0 9px; }
.efx2-truth-body p:last-child { margin-bottom: 0; }
.efx2-punch { color: var(--mm-text-strong) !important; font-weight: 600; border-top: 1px solid var(--mm-divider); padding-top: 9px; }
.efx2-user-head {
  font-size: 0.68em; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--mm-text-muted);
}
.efx2-user { padding: 10px 14px; background: #fff; border: 1px solid var(--mm-border); border-radius: 12px; }
.efx2-user-name { font-size: 0.84em; font-weight: 800; color: var(--mm-text-strong); margin-bottom: 3px; }
.efx2-user-desc { font-size: 0.74em; color: var(--mm-text-muted); line-height: 1.45; }
</style>

<!--
PRESENTER NOTE:
The honest closer. Two halves: why the dev fixes still aren't a real fix, and what users can actually do.
Left: every defense from the last slide is JS vs JS. The exploit author can white-box the extension's content script and engineer around each check; the two scripts can also just conflict. The only structurally safe option is to leave the page entirely - a separate popup window, a system dialog, or context-menu autofill - but that destroys the seamless one-click UX, so nobody wants it. The genuine fix is a new browser API that lets extensions draw UI the page can't see or touch.
Right (walk the tradeoffs, none is free):
- Auto-updates: cheapest win, all 11 patched. In orgs the admin controls versions, so this is a policy point.
- Disable manual autofill (copy/paste): kills the trigger, but it's a real annoyance, especially for cards/personal data.
- Exact-URL match: stops subdomain pivots (XSS on blog.example.com no longer reaches example.com creds), but same-domain code still wins, and non-domain-scoped data (cards, identity) still leaks.
[click] Closing Callout: there's no header that fixes this. Pick the tradeoff you can live with and push vendors toward a platform API.
-->
