<script setup lang="ts">
import { useGameStore } from '../stores/game'
import { computed } from 'vue'
import {themes} from "../config/themes.ts";

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
  <div class="space-y-4">
    <h2 :class="[themes[store.theme].textColor, 'text-2xl font-bold mb-4']">{{ $t('stats.title') }}</h2>

    <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-blue-500/20 rounded-lg p-4 text-center">
          <div class="text-4xl font-bold text-blue-200">{{ store.xWins }}</div>
          <div class="text-sm text-blue-100">{{ $t('stats.xWins') }} ({{ xWinPercentage }}%)</div>
        </div>
        <div class="bg-red-500/20 rounded-lg p-4 text-center">
          <div class="text-4xl font-bold text-red-200">{{ store.oWins }}</div>
          <div class="text-sm text-red-100">{{ $t('stats.oWins') }} ({{ oWinPercentage }}%)</div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="bg-purple-500/20 rounded-lg p-4 text-center">
          <div class="text-4xl font-bold text-purple-200">{{ store.draws }}</div>
          <div class="text-sm text-purple-100">{{ $t('stats.draws') }}</div>
        </div>
        <div class="bg-green-500/20 rounded-lg p-4 text-center">
          <div class="text-4xl font-bold text-green-200">{{ store.gamesPlayed }}</div>
          <div class="text-sm text-green-100">{{ $t('stats.totalGames') }}</div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-pink-500/20 rounded-lg p-4 text-center">
          <div class="text-4xl font-bold text-purple-200">{{ store.gamesWinIA }}</div>
          <div class="text-sm text-purple-100">{{ $t('stats.wins') }}</div>
        </div>
        <div class="bg-yellow-500/20 rounded-lg p-4 text-center">
          <div class="text-4xl font-bold text-purple-200">{{ store.gamesLostIA }}</div>
          <div class="text-sm text-purple-100">{{ $t('stats.lost') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>