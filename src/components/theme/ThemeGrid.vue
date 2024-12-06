<script setup lang="ts">
import { computed } from 'vue'
import type { Theme } from '../../types/game'

const props = defineProps<{
  themes: Theme[]
  title: string
  isLocked?: boolean
}>()

const gridClass = computed(() =>
    props.themes.length > 2
        ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
        : 'grid grid-cols-1 sm:grid-cols-2 gap-4'
)
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-white/60 text-sm font-medium">{{ title }}</h3>
    <div :class="gridClass">
      <slot></slot>
    </div>
  </div>
</template>