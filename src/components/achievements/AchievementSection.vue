<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
      <span class="text-xl">{{ icon }}</span>
      {{ title }}
    </h3>
    <div class="grid gap-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon: string
}>()
</script>