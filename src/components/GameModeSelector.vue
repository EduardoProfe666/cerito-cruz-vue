<template>
  <div class="text-center space-y-6">
    <h3 class="text-xl font-bold text-white mb-4">{{ $t('game.selectMode') }}</h3>
    
    <div class="flex flex-wrap gap-4 justify-center">
      <button
        v-for="mode in ['AI', 'PVP']"
        :key="mode"
        @click="selectMode(mode)"
        class="w-full sm:w-auto px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 bg-white/10 hover:bg-white/20 text-white relative group"
        :class="[selectedMode === mode ? 'ring-2 ring-indigo-500 bg-white/20' : '']"
      >
        <div class="flex flex-col items-center space-y-2">
          <span class="text-3xl">{{ mode === 'PVP' ? '👥' : '🤖' }}</span>
          <span>{{ $t(`game.modes.${mode.toLowerCase()}`) }}</span>
        </div>
        <div v-if="selectedMode === mode" class="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
          <span class="text-white text-sm">✓</span>
        </div>
      </button>
    </div>

    <div v-if="selectedMode === 'AI'" class="space-y-4">
      <h4 class="text-lg font-semibold text-white">{{ $t('game.selectDifficulty') }}</h4>
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          v-for="difficulty in ['easy', 'medium', 'hard']"
          :key="difficulty"
          @click="selectDifficulty(difficulty)"
          class="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative group"
          :class="[
            getDifficultyClass(difficulty),
            selectedDifficulty === difficulty ? 'ring-2 ring-white' : ''
          ]"
        >
          <div class="flex flex-col items-center space-y-2">
            <span class="text-2xl">{{ getDifficultyEmoji(difficulty) }}</span>
            <span>{{ $t(`game.difficulties.${difficulty}`) }}</span>
          </div>
          <div v-if="selectedDifficulty === difficulty" class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span class="text-black text-sm">✓</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GameMode, AIDifficulty } from '../types/game'
import {useI18n} from "vue-i18n";

const emit = defineEmits<{
  (e: 'modeSelected', mode: GameMode, difficulty?: AIDifficulty): void
}>()

const selectedMode = ref<GameMode | null>(null)
const selectedDifficulty = ref<AIDifficulty | null>(null)

const selectMode = (mode: any) => {
  selectedMode.value = mode
  selectedDifficulty.value = null
  if (mode === 'PVP') {
    emit('modeSelected', mode)
  }
}

const selectDifficulty = (difficulty: any) => {
  selectedDifficulty.value = difficulty
  emit('modeSelected', 'AI', difficulty)
}

const getDifficultyClass = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-600/50 hover:bg-green-700/50 text-green-100'
    case 'medium':
      return 'bg-yellow-600/50 hover:bg-yellow-700/50 text-yellow-100'
    case 'hard':
      return 'bg-red-600/50 hover:bg-red-700/50 text-red-100'
    default:
      return ''
  }
}

const getDifficultyEmoji = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return '🌱'
    case 'medium':
      return '⚡'
    case 'hard':
      return '🔥'
    default:
      return ''
  }
}
</script>