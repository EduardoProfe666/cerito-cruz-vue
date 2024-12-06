<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <span class="text-2xl">{{ icon }}</span>
      {{ title }}
    </h3>
    <div :class="['grid gap-4', columns]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  columns: string
}>()
</script>