# Agenda

<div class="grid grid-cols-3 gap-6 mt-6">

<div class="flex flex-col gap-2">
  <div class="text-xs font-bold tracking-widest uppercase text-red-600 mb-1 underline">The Attack</div>
  <AgendaItem n="1">What is Clickjacking?</AgendaItem>
  <AgendaItem n="2">How it works: mechanics</AgendaItem>
  <AgendaItem n="3" demo>Bank transfer hijack</AgendaItem>
  <AgendaItem n="4">The Double Con</AgendaItem>
  <AgendaItem n="5">Impact &amp; real-world cases</AgendaItem>
  <AgendaItem n="6" demo>GitHub stars farm</AgendaItem>
  <AgendaItem n="7">Prerequisites &amp; session capture</AgendaItem>
  <AgendaItem n="8">Pre-armed forms &amp; chained clicks</AgendaItem>
</div>

<div class="flex flex-col gap-2">
  <div class="text-xs font-bold tracking-widest uppercase text-blue-600 mb-1 underline">The Defense</div>
  <AgendaItem n="9">X-Frame-Options</AgendaItem>
  <AgendaItem n="10">CSP <code>frame-ancestors</code></AgendaItem>
  <AgendaItem n="11">JavaScript framebusting</AgendaItem>
  <AgendaItem n="12" demo>Defenses in action</AgendaItem>
</div>

<div class="flex flex-col gap-2">
  <div class="text-xs font-bold tracking-widest uppercase text-violet-600 mb-1 underline">Beyond the Iframe</div>
  <AgendaItem n="13">DoubleClickjacking</AgendaItem>
  <AgendaItem n="14" demo>OAuth hijack via double-click</AgendaItem>
  <AgendaItem n="15">Extension clickjacking</AgendaItem>
  <AgendaItem n="16" demo>Two clicks to empty your vault</AgendaItem>
</div>

</div>

<!--
PRESENTER NOTE:
Three sections, ~40 min total. Left: attack mechanics with 2 demos. Center: classic defenses with a live demo. Right: two modern variants that bypass all classic defenses, each with its own demo.
Four demos total: bank transfer hijack, GitHub stars farm, DCJ OAuth hijack, extension cookie banner vault drain.
-->
