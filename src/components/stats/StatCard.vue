<template>
  <div
      :class="[
      statColors[color].bg,
      'rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105'
    ]"
  >
    <div class="text-3xl mb-2">{{ icon }}</div>
    <div :class="[statColors[color].text, 'text-4xl font-bold']">{{ value }}</div>
    <div :class="[statColors[color].accent, 'text-sm mt-1']">{{ title }}</div>
    <div
        v-if="percentage !== undefined"
        :class="[
        statColors[color].accent,
        'text-xs mt-1 font-medium bg-white/10 rounded-full px-2 py-1 inline-block'
      ]"
    >
      {{ percentage }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { statColors } from '../../utils/statColors'

defineProps<{
  title: string
  value: number
  color: keyof typeof statColors
  icon: string
  percentage?: number
}>()
</script>