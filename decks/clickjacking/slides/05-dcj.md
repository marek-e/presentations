# DoubleClickjacking: One Gesture, Two Targets

<span class="dcj-badge">2024 · Paulos Yibelo</span> <a href="https://www.evil.blog/2024/12/doubleclickjacking-what.html" target="_blank" class="dcj-link">evil.blog ↗</a>

<Callout variant="warning" class="mt-4">A double-click is not a single action. It's two separate clicks. The idea is to exploit this gesture by having the first click to set the context, and the second click to do the damage.</Callout>

<div class="dcj-two-col mt-6">
  <OffsetCard title="Classic Clickjacking" accent="blue">
    <template #icon>🖼️</template>
    Invisible <code>iframe</code> overlays the victim page. One click, one target. Blocked by <code>X-Frame-Options</code> and <code>CSP frame-ancestors</code>.
  </OffsetCard>
  <OffsetCard title="DoubleClickjacking" accent="red">
    <template #icon>🖱️🖱️</template>
    There are <strong>two pages</strong>: the attacker's popup and the victim's page.
    Click 1 lands on the attacker's popup and closes it. Click 2 lands on a completely different page, same position.
  </OffsetCard>
</div>

<style>
.dcj-badge {
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
.dcj-two-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.dcj-link {
  font-size: 0.72em;
  font-weight: 700;
  color: var(--mm-danger-text);
  text-decoration: none;
  opacity: 0.75;
  margin-left: 6px;
}
.dcj-link:hover { opacity: 1; }
</style>

<!--
PRESENTER NOTE:
Paulos Yibelo, Dec 2024 - fresh variant that bypasses everything we just taught.
Core trick: a double-click is two separate, complete clicks. Click 1 fires on the popup and closes it. Click 2 (same cursor position, ~100ms later) fires on whatever is now underneath - the OAuth Allow button.
Three cards: classic (one click, one target, blocked by headers) vs DCJ (two clicks, two targets) vs net result (frame headers useless because no frame).
Link evil.blog for curious audience members.
-->

---
class: px-14 py-4
---

# <span class="dcj-highlight">Click 1</span> closes the popup. <span class="dcj-highlight-2">Click 2</span> hits Allow.

At some point, the attacker's page makes you open a popup window.

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="dcj-steps">
  <div class="dcj-step">
    <div class="dcj-step-num">01</div>
    <div>
      <div class="dcj-step-title">Popup opens and immediately swaps the parent</div>
      <div class="dcj-step-desc">On load, the popup calls <code>window.opener.location</code> to navigate the parent tab to the OAuth consent page. While the user reads the "double-click to verify" prompt, the page fully loads in the background. No race condition.</div>
    </div>
  </div>

  <div class="dcj-step dcj-step--warning">
    <div class="dcj-step-num">02</div>
    <div>
      <div class="dcj-step-title">Click 1 closes the popup</div>
      <div class="dcj-step-desc">The button listens for <code>mousedown</code> and only does one thing: <code>window.close()</code>. The popup disappears before click 2's <code>mousedown</code> can fire on it.</div>
    </div>
  </div>

  <div class="dcj-step dcj-step--danger">
    <div class="dcj-step-num">03</div>
    <div>
      <div class="dcj-step-title">Click 2 fires on the OAuth Allow button</div>
      <div class="dcj-step-desc">The popup is gone. Click 2 lands on the parent tab at the exact same cursor position - straight onto the Allow button. The victim just authorized the attacker's app.</div>
    </div>
  </div>
</div>

<div v-click>

```js
// On popup load: parent starts loading OAuth immediately
window.opener.location =
  'https://slack.com/oauth/v2/authorize?client_id=HACKER_APP&scope=chat:write'

// Click 1: mousedown closes popup before click 2 can fire on it
document.querySelector('.verify-btn')
  .addEventListener('mousedown', () => window.close())
```

<Callout variant="info" noIcon class="mt-3"><code>mousedown</code> not <code>click</code>: if you used <code>click</code>, click 2's <code>mousedown</code> might fire on the popup before it closes. Also: <code>window.opener.location</code> is the most reliable swap method but other approaches exist.</Callout>

</div>

</div>

<style>
.dcj-highlight { color: var(--mm-warning); font-weight: 800; }
.dcj-highlight-2 { color: var(--mm-danger); font-weight: 800; }
.dcj-steps { display: flex; flex-direction: column; gap: 10px; }

.dcj-step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 12px 16px;
  background: var(--mm-surface);
  border: 1px solid var(--mm-border);
  border-radius: 12px;
}
.dcj-step--danger { background: var(--mm-danger-bg); border-color: var(--mm-danger-border); }
.dcj-step--warning { background: var(--mm-warning-bg); border-color: var(--mm-warning-border); }

.dcj-step-num {
  font-size: 1.8em;
  font-weight: 900;
  color: var(--mm-text-strong);
  line-height: 1;
  min-width: 2.2rem;
  text-align: center;
}
.dcj-step-title { font-size: 0.84em; font-weight: 800; color: var(--mm-text-strong); margin-bottom: 3px; }
.dcj-step-desc  { font-size: 0.76em; color: var(--mm-text-muted); line-height: 1.45; }
</style>

<!--
PRESENTER NOTE:
Title IS the punchline - say it out loud before walking the steps.
Step 1: navigation on popup load is key. OAuth page is fully loaded BEFORE the user double-clicks - no race condition regardless of double-click speed.
Step 2: click 1 only closes the popup. Nothing else. The hard work was done in step 1.
Step 3: popup is gone, click 2 falls through. The victim has no idea they clicked on two different things.
[click] Walk the code: 2 lines at the top (navigation on load), 1 line in the listener (window.close). That's the whole attack.
Note on mousedown: closing on mousedown rather than click ensures the popup is fully gone before click 2's mousedown fires. If you used click, click 2 might start on the popup before it disappears.
Note on other swap methods: window.opener.location was Yibelo's preferred method - other approaches exist but he found this the most reliable.
-->

---
class: p-2 py-4
---

# Visual Explanation

<div class="dcj-media-grid">
  <div class="dcj-media-cell">
    <img
      :src="'/clickjacking/dcj-attack-flow.png'"
      alt="DoubleClickjacking attack flow diagram"
      style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.10); border: 1px solid var(--mm-border);"
    />
  </div>
  <div class="dcj-media-cell">
    <video
      :src="'/clickjacking/dcj-demo.mp4'"
      controls
      autoplay
      loop
      muted
      playsinline
      style="width: 100%; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.10);"
    ></video>
  </div>
</div>

<style>
.dcj-media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  height: 100%;
  align-items: center;
}
.dcj-media-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}
</style>

<!--
PRESENTER NOTE:
Visual aid - left: attack flow diagram, right: recorded demo (autoplays).
Let the video run ~10s if live demo might fail. Diagram is good for screenshots/social.
Don't narrate over the video - let it show the parent tab swap, then move on.
-->

---
layout: center
---

## Demo - OAuth Hijack via Double-Click

<div class="dcj-demo-btns">
  <button class="dcj-demo-btn" onclick="window.open('/clickjacking/victims/dcj-victim.html','_blank','popup=yes,width=900,height=580,left=150,top=80')">
    <span class="i-lucide-play" style="width: 20px; height: 20px;"></span>Launch Demo
  </button>
  <button class="dcj-demo-btn dcj-demo-btn--real" onclick="window.open('/clickjacking/victims/dcj-victim.html?real=1','_blank','popup=yes,width=900,height=580,left=150,top=80')">
    <span class="i-lucide-external-link" style="width: 20px; height: 20px;"></span>Real Target
  </button>
</div>

<p class="dcj-demo-note">Live demo uses a fake Slack consent screen. <strong>Real Target</strong> hits the real GitHub OAuth consent page. Don't click Authorize on stage - revoke at the link below if you do.</p>

<div v-click class="dcj-revoke-wrap">
  <a
    href="https://github.com/settings/applications"
    target="_blank"
    rel="noopener noreferrer"
    class="dcj-revoke-btn"
  >
    <span class="i-lucide-shield-off" style="width: 18px; height: 18px;"></span>
    Revoke authorized OAuth apps
  </a>
</div>

<style>
.dcj-demo-btns {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}
.dcj-demo-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  padding: 14px 32px;
  background: var(--mm-danger);
  color: #ffffff;
  font-size: 1.05em;
  font-weight: 800;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
  box-shadow: 0 6px 24px rgba(220,38,38,0.30);
}
.dcj-demo-btn--real {
  background: #1a1a1a;
  box-shadow: 0 6px 24px rgba(0,0,0,0.18);
}
.dcj-demo-btn:hover { opacity: 0.88; }
.dcj-demo-note {
  margin: 16px auto 0;
  max-width: 520px;
  font-size: 0.78em;
  color: var(--mm-text-muted);
  text-align: center;
  line-height: 1.5;
}
.dcj-revoke-wrap {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.dcj-revoke-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background: #fff;
  color: var(--mm-text-strong);
  border: 1px solid var(--mm-border);
  border-radius: 10px;
  font-size: 0.82em;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.dcj-revoke-btn:hover {
  border-color: var(--mm-danger-border);
  box-shadow: 0 4px 16px rgba(220,38,38,0.12);
}
</style>

<!--
PRESENTER NOTE:
Ask the audience: "What do you think you're double-clicking?"

Launch Demo - reliable stage demo. Double-click the fake Turnstile button;
popup closes on mousedown, mouseup hits the fake Slack Allow button.

Real Target - live Cloudflare Turnstile + window.opener.location swap to GitHub
OAuth. Needs network. Double-click "Double-click to verify"
below the widget. Parent shows real GitHub login or consent - do NOT click
Authorize. Use the video on the previous slide for a full hit.

[click] Show revoke link if anyone accidentally authorizes on stage.
-->

---
zoom: 0.78
---

# Mitigation Strategies

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

**Client-Side Protection**

Disable critical buttons until a real user gesture is detected:

```js
// Only applies to pointer devices - touch can't do DCJ
if (window.matchMedia("(hover: hover)").matches) {
  const buttons = document.querySelectorAll(
    'form button, form input[type="submit"]'
  );

  // Disabled on load - blocks the phantom double-click 🛑
  buttons.forEach(btn => (btn.disabled = true));

  function enableButtons() {
    buttons.forEach(btn => (btn.disabled = false));
    document.removeEventListener("mousemove", enableButtons);
  }

  // Re-enable only after real user interaction
  document.addEventListener("mousemove", enableButtons);
  document.addEventListener("keydown", e => {
    if (e.key === "Tab") enableButtons();
  });
}
```

Zero UX impact ➡️ activation happens well before the user reaches the button

</div>

<div>

**Long-Term: Browser Standards**

The pattern mirrors the 2008 clickjacking story. JS patches first, then browser-level headers. Example of future proposals:

| Idea | What it does |
|------|-------------|
| `Double-Click-Protection: strict` | Block rapid context-switching between windows mid-double-click |
| CSP extension | Expand `frame-ancestors`-style policy to cover opener/popup scenarios |

<Callout v-click variant="purple" class="mt-5" icon="💡">

<strong>Where else does this pattern live?</strong> Anywhere the <em>terminating</em> event of a gesture fires the action on whatever page is underneath:

<ul class="dcj-similar-list">
  <li><strong>Mobile double-tap</strong> - <code>touchstart</code> → swap → <code>touchend</code> synthesizes the click on whatever's under the finger when released.</li>
  <li><strong>Cross-origin drag-and-drop</strong> - <code>dragstart</code> → swap → <code>drop</code> lands a file or text payload on a swapped drop zone.</li>
  <li><strong>Spacebar on a focused button</strong> - Space fires <code>click</code> only on <code>keyup</code>, so <code>keydown</code> → swap → <code>keyup</code> activates whatever button is focused on the new page.</li>
</ul>

</Callout>

<style>
.dcj-similar-list {
  margin: 8px 0 6px;
  padding-left: 1.1em;
  list-style: disc;
}
.dcj-similar-list li { margin: 4px 0; line-height: 1.5; }
.dcj-similar-list li + li { margin-top: 6px; }
.callout p { margin: 0; }
</style>
</div>

</div>

<!--
PRESENTER NOTE:
No browser-standard fix yet - mirrors 2008 clickjacking before XFO existed.
Client-side patch: disable submit buttons until mousemove/keydown proves real user presence. Zero UX hit.
[click] Similar gesture-splitting patterns: mobile double-tap, drag-and-drop, spacebar keyup on focused buttons.
Long-term: spec proposals (Double-Click-Protection header, CSP for opener). Watch the standards space.
-->
