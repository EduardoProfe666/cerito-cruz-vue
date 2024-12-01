<script setup lang="ts">
import { useGameStore } from '../stores/game'
import { computed } from 'vue'

const store = useGameStore()

const xWinPercentage = computed(() => {
  if (store.gamesPlayed === 0) return 0
  return Math.round((store.xWins / store.gamesPlayed) * 100)
})

const oWinPercentage = computed(() => {
  if (store.gamesPlayed === 0) return 0
  return Math.round((store.oWins / store.gamesPlayed) * 100)
})
</script>

<template>
  <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
    <h2 class="text-2xl font-bold text-white mb-4">Estadísticas</h2>
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="bg-blue-500/20 rounded-lg p-4 text-center">
        <div class="text-4xl font-bold text-blue-200">{{ store.xWins }}</div>
        <div class="text-sm text-blue-100">Victorias X ({{ xWinPercentage }}%)</div>
      </div>
      <div class="bg-red-500/20 rounded-lg p-4 text-center">
        <div class="text-4xl font-bold text-red-200">{{ store.oWins }}</div>
        <div class="text-sm text-red-100">Victorias O ({{ oWinPercentage }}%)</div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-purple-500/20 rounded-lg p-4 text-center">
        <div class="text-4xl font-bold text-purple-200">{{ store.draws }}</div>
        <div class="text-sm text-purple-100">Empates</div>
      </div>
      <div class="bg-green-500/20 rounded-lg p-4 text-center">
        <div class="text-4xl font-bold text-green-200">{{ store.gamesPlayed }}</div>
        <div class="text-sm text-green-100">Partidas Totales</div>
      </div>
    </div>
  </div>
</template>