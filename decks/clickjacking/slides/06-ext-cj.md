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
      <div class="ecj-why-text">One vault holds credentials for every account. Steal the password manager, steal everything at once.</div>
    </div>
    <div class="ecj-why-row">
      <div class="ecj-why-tag">Reach</div>
      <div class="ecj-why-text">They inject into <em>every</em> page. The attacker doesn't need to compromise a specific site; any page with a login field will do.</div>
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
- Reach: extension injects on every page. Attacker doesn't need to compromise the actual bank, just any page with a login field.
- Trigger: we're talking manual autofill. The user clicks to pick credentials from the extension's dropdown UI, and THAT click is what we hijack. (Automatic autofill, 0-click, browser fills on page load, is a separate threat covered in 2021 research; link in the footnote.)

[click] No iframe, no CORS, no frame headers. Any page with a malicious third-party script can do this.
One line of JS on a compromised ad network = game over for autofill.
-->

---
zoom: 0.92
---

# Why Browser Extensions Can't Defend Themselves

<div class="ecj-intro mt-3">
  Extensions inject UI elements directly into the page DOM via content scripts. Once injected, the page's own JavaScript can freely traverse, style, and hide those elements - no different from any other DOM node.
</div>

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

**Three attack variants:**

| Variant | Technique |
|---------|-----------|
| Element opacity | `opacity: 0` on the extension root element |
| Parent opacity | `document.body.style.opacity = '0'` - hides everything |
| Overlay | Abs-positioned `<div>` covers the extension UI |

**Why password managers are worst-case:**
Their autofill features trigger the moment a field is focused - a single click exfiltrates credentials with no further interaction needed.

</div>

<div v-click>

**What classical defenses can't stop this:**

- ❌ `X-Frame-Options` - only applies to iframes
- ❌ `CSP frame-ancestors` - only applies to iframes
- ❌ `SameSite` cookies - no cross-site request is made
- ❌ Iframe sandbox - no iframe involved

<Callout variant="warning" class="mt-4">
  <strong>11 password managers</strong> tested across 40M+ active installs - all initially vulnerable. Credentials, payment cards (including CVV), TOTP codes, and passkeys all exfiltrable with a single click.
</Callout>

</div>

</div>

<style>
.ecj-intro { font-size: 0.84em; color: var(--mm-text); line-height: 1.5; }
</style>

<!--
PRESENTER NOTE:
Content scripts inject DOM nodes the page can touch - same origin from the page's perspective.
Three hide techniques: element opacity, body opacity, overlay div.
Password managers are worst case: autofill fires on focus, one click exfiltrates.
[click] Run through why each classic defense fails (table on slide). 11 PMs, 40M+ users, all initially vulnerable.
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
Point out: this looks like a normal banking dashboard.
Ask the audience what they'd do if they saw this cookie banner.
Click "Accept All" - the hidden password manager popup flashes briefly, then the damage card shows stolen credentials.
Key message: the user did nothing wrong. Their own security tool was used against them.
-->

---
zoom: 0.92
---

# DOM Extension Clickjacking - Scale & Defense

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

**Scale of impact:**

<div class="ecj-stat">
  <div class="ecj-stat-num">11</div>
  <div class="ecj-stat-label">Password managers tested - all initially vulnerable</div>
</div>
<div class="ecj-stat ecj-stat--red mt-3">
  <div class="ecj-stat-num">40M+</div>
  <div class="ecj-stat-label">Active users across tested managers</div>
</div>

**Exfiltrable in a single click:**
- Login credentials + TOTP codes
- Full credit card number + CVV
- Passkeys &amp; WebAuthn assertions

</div>

<div v-click>

**For extension developers:**
- Use **Shadow DOM (`mode: 'closed'`)**  - page JS cannot reach elements inside
- Check `getComputedStyle(el).opacity` and `visibility` before autofilling
- Use `MutationObserver` to detect style mutation and abort fill

**For web authors:**
- Avoid untrusted third-party scripts on auth or payment pages
- `Permissions-Policy: clipboard-read=(), clipboard-write=()`

**For users:**
- Keep extensions updated; prefer ones that check element visibility before filling

</div>

</div>

<Callout v-click variant="note" class="mt-5">The browser's own security extensions become the attack surface. Fixing this requires the extension ecosystem - not just one site - to adapt.</Callout>

<style>
.ecj-stat {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: var(--mm-warning-bg);
  border: 1.5px solid var(--mm-warning-border);
  border-radius: 12px;
}
.ecj-stat--red {
  background: var(--mm-danger-bg);
  border-color: var(--mm-danger-border);
}
.ecj-stat-num   { font-size: 2em; font-weight: 900; color: var(--mm-text-strong); line-height: 1; }
.ecj-stat-label { font-size: 0.8em; color: var(--mm-text-muted); line-height: 1.3; }
</style>

<!--
PRESENTER NOTE:
Scale: 11 password managers, 40M+ installs - credentials, cards+CVV, TOTP, passkeys all one click away.
Extension dev fixes: closed Shadow DOM, visibility checks before fill, MutationObserver on style tampering.
Web authors: no untrusted scripts on auth/payment pages; Permissions-Policy on clipboard.
[click] Users: keep extensions updated. Ecosystem problem - not solvable by one site's headers alone.
-->
