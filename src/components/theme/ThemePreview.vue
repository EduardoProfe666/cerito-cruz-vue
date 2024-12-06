<script setup lang="ts">
import { computed } from 'vue'
import type { Theme } from '../../types/game'

defineProps<{
  theme: Theme
}>()

const previewBoard = computed(() => [
  { value: 'X', isWinning: true },
  { value: '', isWinning: false },
  { value: 'O', isWinning: false },
  { value: '', isWinning: false },
  { value: 'X', isWinning: true },
  { value: '', isWinning: false },
  { value: '', isWinning: false },
  { value: '', isWinning: false },
  { value: 'X', isWinning: true },
])
</script>

<template>
  <div :class="[theme.boardBg, 'p-3 rounded-lg']">
    <div class="grid grid-cols-3 gap-1">
      <div
          v-for="(cell, index) in previewBoard"
          :key="index"
          :class="[
          theme.cellBg,
          'aspect-square rounded flex items-center justify-center text-lg font-bold transition-all duration-300',
          cell.isWinning ? 'animate-pulse' : ''
        ]"
      >
        <span
            v-if="cell.value"
            :class="[
            cell.value === 'X' ? theme.playerX : theme.playerO,
            'transform transition-all duration-300'
          ]"
        >
          {{ cell.value }}
        </span>
      </div>
    </div>
  </div>
</template>