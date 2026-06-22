<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  victimUrl: { type: String, required: true },
  victimLabel: { type: String, default: "Victim page" },
  attackerTitle: { type: String, default: "🎉 Congratulations!" },
  attackerBody: {
    type: String,
    default: "You have been selected as today's lucky winner.",
  },
  attackerButton: { type: String, default: "Claim Your Prize" },
  height: { type: Number, default: 260 },
  showPositionControls: { type: Boolean, default: false },
  clickable: { type: Boolean, default: false },
  startX: { type: Number, default: 0 },
  startY: { type: Number, default: 0 },
  adMode: { type: Boolean, default: false },
  adHeader: { type: String, default: "" },
  adHeaderBg: { type: String, default: "#6366f1" },
  attackerBg: { type: String, default: "" },
  // CSS selector of the real element inside the (same-origin) victim iframe to
  // sit under the fake button. When set, top/left are measured automatically on
  // load/resize, so alignment holds on any screen and start-x/start-y are unused.
  alignTarget: { type: String, default: "" },
});

const emit = defineEmits(["buttonClick"]);

const revealOpacity = ref(0);
const iframeTop = ref(props.startY);
const iframeLeft = ref(props.startX);

const stageEl = ref(null);
const iframeEl = ref(null);

// Which decoy element the victim target must sit under: the close "×" in ad
// mode (user thinks they're dismissing an ad), else the main fake button.
const decoySelector = computed(() =>
  props.adMode ? ".cj-ad-close" : ".cj-attacker-btn",
);

/**
 * Position the iframe so `alignTarget` (inside it) sits centered under the
 * decoy element. Everything is measured live, so it self-calibrates on any
 * screen. The decoy lives in the outer document and is rendered through
 * Slidev's slide transform, so its rect is scaled; we divide it back to the
 * stage's local px (the same coordinate space the iframe's top/left use). The
 * iframe's own document is not scaled internally, so the target rect is already
 * in that space. Returns false when layout isn't ready yet so the caller retries.
 */
function alignToTarget() {
  if (!props.alignTarget) return true;
  const stage = stageEl.value;
  const iframe = iframeEl.value;
  if (!stage || !iframe || !stage.offsetWidth) return false;

  let target;
  try {
    target = iframe.contentDocument?.querySelector(props.alignTarget);
  } catch {
    return true; // cross-origin: can't measure, leave start-x/start-y as-is
  }
  const decoy = stage.querySelector(decoySelector.value);
  if (!target || !decoy) return false;

  const stageRect = stage.getBoundingClientRect();
  const decoyRect = decoy.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  // Zero-sized rects mean the content hasn't laid out yet -> retry.
  if (!stageRect.width || !decoyRect.width || !targetRect.width) return false;

  const scale = stageRect.width / stage.offsetWidth || 1;
  const decoyCenterX = (decoyRect.left - stageRect.left + decoyRect.width / 2) / scale;
  const decoyCenterY = (decoyRect.top - stageRect.top + decoyRect.height / 2) / scale;

  iframeLeft.value = Math.round(decoyCenterX - (targetRect.left + targetRect.width / 2));
  iframeTop.value = Math.round(decoyCenterY - (targetRect.top + targetRect.height / 2));
  return true;
}

/** Retry across frames until layout is ready (fixes "only aligns after refresh"). */
function scheduleAlign(attempts = 12) {
  if (alignToTarget() || attempts <= 0) return;
  requestAnimationFrame(() => scheduleAlign(attempts - 1));
}

/** Re-align once the iframe's own fonts/emoji settle (they shift the target). */
function onIframeLoad() {
  scheduleAlign();
  try {
    iframeEl.value?.contentDocument?.fonts?.ready.then(() => alignToTarget());
  } catch {
    /* cross-origin */
  }
}

const iframeStyle = computed(() => ({
  opacity: revealOpacity.value / 100,
  top: `${iframeTop.value}px`,
  left: `${iframeLeft.value}px`,
  right: "auto",
  bottom: "auto",
  width: "100%",
  height: "100%",
}));

function onWindowBlur() {
  emit("buttonClick");
}

watch(
  () => props.clickable,
  (val) => {
    if (val) window.addEventListener("blur", onWindowBlur, { once: true });
    else window.removeEventListener("blur", onWindowBlur);
  },
  { immediate: true },
);

const onResize = () => scheduleAlign();
onMounted(() => {
  window.addEventListener("resize", onResize);
  scheduleAlign(); // iframe may already be loaded (cached) before @load fires
});
onUnmounted(() => {
  window.removeEventListener("blur", onWindowBlur);
  window.removeEventListener("resize", onResize);
});

const attackerBgStyle = computed(() =>
  props.attackerBg ? { background: props.attackerBg } : {},
);

const statusLabel = computed(() => {
  if (revealOpacity.value === 0)
    return "⚠️ Attack in progress - victim iframe is invisible";
  if (revealOpacity.value === 100)
    return "✅ Fully revealed - this is what you're really clicking";
  return `Partially revealed (${revealOpacity.value}%)`;
});
</script>

<template>
  <div class="cj-wrapper">
    <!-- ── Stage ─────────────────────────────────────────── -->
    <div ref="stageEl" class="cj-stage" :style="{ height: height + 'px' }">
      <!-- Bottom layer: attacker's page (always visible) -->

      <!-- Default full-page layout -->
      <div v-if="!adMode" class="cj-attacker" :style="attackerBgStyle">
        <span class="cj-badge">ATTACKER PAGE</span>
        <div class="cj-attacker-title">{{ attackerTitle }}</div>
        <p class="cj-attacker-body">{{ attackerBody }}</p>
        <button class="cj-attacker-btn" tabindex="-1">
          {{ attackerButton }}
        </button>
      </div>

      <!-- Ad popup layout: dimmed background + floating card -->
      <div v-else class="cj-attacker cj-ad-scene" :style="attackerBgStyle">
        <span class="cj-badge">ATTACKER PAGE</span>
        <div class="cj-ad-overlay" aria-hidden="true"></div>
        <div class="cj-ad-popup">
          <!-- Popup header -->
          <div class="cj-ad-header" :style="{ background: adHeaderBg }">
            <span v-if="adHeader" class="cj-ad-brand">{{ adHeader }}</span>
            <span v-else class="cj-ad-brand">Advertisement</span>
            <button class="cj-ad-close" tabindex="-1">×</button>
          </div>
          <!-- Popup body -->
          <div class="cj-ad-body">
            <div class="cj-attacker-title">{{ attackerTitle }}</div>
            <p class="cj-attacker-body">{{ attackerBody }}</p>
            <button class="cj-attacker-btn" tabindex="-1">
              {{ attackerButton }}
            </button>
          </div>
        </div>
      </div>

      <!-- Top layer: victim iframe (opacity + position controlled) -->
      <iframe
        ref="iframeEl"
        class="cj-victim"
        :src="victimUrl"
        :style="iframeStyle"
        @load="onIframeLoad"
      />

      <!-- Opacity label overlay -->
      <div
        class="cj-opacity-badge"
        :style="{ opacity: revealOpacity > 0 ? 1 : 0 }"
      >
        victim layer {{ revealOpacity }}%
      </div>
    </div>

    <!-- ── Controls ───────────────────────────────────────── -->
    <div class="cj-controls">
      <div class="cj-slider-row">
        <span class="cj-lbl-attack">👁️ Attack view</span>
        <input
          type="range"
          class="cj-slider"
          min="0"
          max="100"
          step="1"
          v-model.number="revealOpacity"
        />
        <span class="cj-lbl-reveal">🔍 Revealed</span>
      </div>
      <div class="cj-status">{{ statusLabel }}</div>

      <!-- Position controls (opt-in) -->
      <div v-if="showPositionControls" class="cj-pos-controls">
        <div class="cj-pos-sliders">
          <div class="cj-pos-row">
            <span class="cj-pos-lbl">top</span>
            <input
              type="range"
              class="cj-slider"
              min="-200"
              max="200"
              step="1"
              v-model.number="iframeTop"
            />
            <span class="cj-pos-val">{{ iframeTop }}px</span>
          </div>
          <div class="cj-pos-row">
            <span class="cj-pos-lbl">left</span>
            <input
              type="range"
              class="cj-slider"
              min="-300"
              max="300"
              step="1"
              v-model.number="iframeLeft"
            />
            <span class="cj-pos-val">{{ iframeLeft }}px</span>
          </div>
        </div>
        <pre class="cj-pos-code">
iframe {
  position: absolute;
  top:  {{ iframeTop }}px;
  left: {{ iframeLeft }}px;
}</pre
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Wrapper ────────────────────────────────────────────── */
.cj-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40vw;
  font-size: 0.82em;
}

/* ── Stage ──────────────────────────────────────────────── */
.cj-stage {
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid var(--mm-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* Attacker layer (z-index 1, always opaque) */
.cj-attacker {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  text-align: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: #fff;
}

.cj-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--mm-danger);
  color: #fff;
  font-size: 0.68em;
  font-weight: 700;
  letter-spacing: 0.6px;
  padding: 2px 8px;
  border-radius: 4px;
}

.cj-attacker-title {
  font-size: 1.35em;
  font-weight: 700;
  color: #ffd700;
}

.cj-attacker-body {
  color: #bbb;
  max-width: 340px;
  line-height: 1.4;
}

.cj-attacker-btn {
  padding: 11px 30px;
  background: var(--mm-safe);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.45);
  pointer-events: none;
  transition:
    transform 0.12s,
    box-shadow 0.12s;
}

/* Victim iframe (z-index 2, opacity controlled) */
.cj-victim {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 2;
  transition: opacity 0.06s linear;
}

/* Small overlay badge showing current opacity */
.cj-opacity-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.65);
  color: var(--mm-defense-light);
  font-size: 0.7em;
  padding: 2px 8px;
  border-radius: 4px;
  pointer-events: none;
  transition: opacity 0.2s;
}

/* ── Controls ───────────────────────────────────────────── */
.cj-controls {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cj-slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cj-lbl-attack {
  color: var(--mm-danger);
  white-space: nowrap;
}
.cj-lbl-reveal {
  color: var(--mm-safe);
  white-space: nowrap;
}

.cj-slider {
  flex: 1;
  accent-color: var(--mm-danger);
  cursor: pointer;
  height: 4px;
}

.cj-status {
  text-align: center;
  font-size: 0.78em;
  color: var(--mm-text-muted);
  font-style: italic;
}

/* ── Position controls ──────────────────────────────────── */
.cj-pos-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 6px;
  padding: 8px 10px;
  background: var(--mm-text-strong);
  border-radius: 8px;
  border: 1px solid var(--mm-nav);
}

.cj-pos-sliders {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cj-pos-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cj-pos-lbl {
  font-family: monospace;
  font-size: 0.8em;
  color: var(--mm-defense-light);
  width: 28px;
  flex-shrink: 0;
}

.cj-pos-val {
  font-family: monospace;
  font-size: 0.8em;
  color: #a3e635;
  width: 52px;
  text-align: right;
  flex-shrink: 0;
}

.cj-pos-code {
  margin: 0;
  padding: 6px 10px;
  background: var(--mm-nav);
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.72em;
  color: var(--mm-border);
  line-height: 1.6;
  white-space: pre;
  flex-shrink: 0;
}

/* ── Legend ─────────────────────────────────────────────── */
.cj-legend {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7em;
  color: var(--mm-text-muted);
  flex-wrap: wrap;
}

.cj-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}

.dot-attacker {
  background: var(--mm-warning);
  margin-left: 8px;
}
.dot-attacker:first-child {
  margin-left: 0;
}
.dot-victim {
  background: var(--mm-defense-light);
}

/* ── Ad popup mode ───────────────────────────────────────── */

/* Outer scene: the "website" behind the popup */
.cj-ad-scene {
  background: linear-gradient(150deg, #0d1117 0%, #161b22 100%);
}

/* Semi-transparent overlay that dims the background */
.cj-ad-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 0;
}

/* Floating popup card */
.cj-ad-popup {
  position: relative;
  z-index: 1;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.06);
  width: min(320px, 88%);
  display: flex;
  flex-direction: column;
}

/* Popup header strip: brand name + × */
.cj-ad-header {
  display: flex;
  align-items: center;
  padding: 8px 10px 8px 14px;
  gap: 8px;
  flex-shrink: 0;
}

.cj-ad-brand {
  flex: 1;
  font-size: 0.78em;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.3px;
}

.cj-ad-close {
  width: 22px;
  height: 22px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  font-size: 1em;
  line-height: 1;
  cursor: pointer;
  pointer-events: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-family: inherit;
  flex-shrink: 0;
}

/* Popup body */
.cj-ad-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 20px 20px;
  text-align: center;
}

.cj-ad-scene .cj-attacker-title {
  color: var(--mm-nav);
  font-size: 1.1em;
}
.cj-ad-scene .cj-attacker-body {
  color: #475569;
}
.cj-ad-scene .cj-badge {
  z-index: 2;
}
</style>
