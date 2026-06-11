<script setup lang="ts">
import IconButton from '@slidev/client/internals/IconButton.vue'
import { useNav } from '@slidev/client/composables/useNav'

const { isEmbedded } = useNav()
</script>

<template>
  <IconButton
    v-if="!isEmbedded"
    as="a"
    href="/"
    title="Back to presentations home"
  >
    <div class="i-carbon:home" />
  </IconButton>
</template>
