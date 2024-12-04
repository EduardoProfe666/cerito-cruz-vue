<template>
  <div class="space-y-8">
    <!-- Progress Steps -->
    <div class="flex justify-center mb-8">
      <div class="flex flex-wrap justify-center gap-4 sm:gap-8">
        <div class="flex items-center">
          <div :class="[
            'w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300',
            currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/50'
          ]">
            1
          </div>
          <div :class="[
            'ml-2 text-sm transition-all duration-300 whitespace-nowrap',
            currentStep >= 1 ? 'text-white' : 'text-white/50'
          ]">
            {{ $t('game.mode') }}
          </div>
        </div>
        
        <div class="flex items-center">
          <div :class="[
            'w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300',
            currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/50'
          ]">
            2
          </div>
          <div :class="[
            'ml-2 text-sm transition-all duration-300 whitespace-nowrap',
            currentStep >= 2 ? 'text-white' : 'text-white/50'
          ]">
            {{ selectedMode === 'AI' ? $t('game.difficulty') : $t('game.player') }}
          </div>
        </div>
        
        <template v-if="selectedMode === 'AI'">
          <div class="flex items-center">
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300',
              currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/50'
            ]">
              3
            </div>
            <div :class="[
              'ml-2 text-sm transition-all duration-300 whitespace-nowrap',
              currentStep >= 3 ? 'text-white' : 'text-white/50'
            ]">
              {{ $t('game.player') }}
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Mode Selection -->
    <div v-if="currentStep === 1">
      <h3 class="text-xl font-bold text-white text-center mb-6">{{ $t('game.selectMode') }}</h3>
      <div class="flex flex-wrap gap-4 justify-center">
        <button
          v-for="mode in ['PVP', 'AI']"
          :key="mode"
          @click="selectMode(mode)"
          class="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 bg-white/10 hover:bg-white/20"
          :class="[selectedMode === mode ? 'ring-2 ring-indigo-500 bg-white/20' : '']"
        >
          <div class="flex flex-col items-center space-y-2">
            <span class="text-3xl" v-if="mode === 'PVP'">👥</span>
            <span class="text-3xl" v-else>🤖</span>
            <span class="text-white">{{ $t(`game.modes.${mode.toLowerCase()}`) }}</span>
          </div>
          <div v-if="selectedMode === mode" class="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm">✓</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Difficulty Selection -->
    <div v-if="currentStep === 2 && selectedMode === 'AI'">
      <h3 class="text-xl font-bold text-white text-center mb-6">{{ $t('game.selectDifficulty') }}</h3>
      <div class="flex flex-wrap gap-4 justify-center">
        <button
          v-for="difficulty in ['easy', 'medium', 'hard']"
          :key="difficulty"
          @click="selectDifficulty(difficulty)"
          class="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
          :class="[
            getDifficultyClass(difficulty),
            selectedDifficulty === difficulty ? 'ring-2 ring-white' : ''
          ]"
        >
          <div class="flex flex-col items-center space-y-2">
            <span class="text-3xl">{{ getDifficultyEmoji(difficulty) }}</span>
            <span>{{ $t(`game.difficulties.${difficulty}`) }}</span>
          </div>
          <div v-if="selectedDifficulty === difficulty" class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span class="text-black text-sm">✓</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Player Selection -->
    <div v-if="(currentStep === 2 && selectedMode === 'PVP') || (currentStep === 3 && selectedMode === 'AI')">
      <h3 class="text-xl font-bold text-white text-center mb-6">{{ $t('game.selectPlayer') }}</h3>
      <div class="flex flex-wrap gap-4 justify-center">
        <button
          v-for="player in ['X', 'O']"
          :key="player"
          @click="selectPlayer(player)"
          class="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 bg-white/10 hover:bg-white/20"
          :class="[
            player === 'X' ? 'hover:text-blue-400' : 'hover:text-red-400',
            selectedPlayer === player ? 'ring-2 ring-indigo-500 bg-white/20' : ''
          ]"
        >
          <div class="flex flex-col items-center space-y-2">
            <span class="text-4xl" :class="[
              player === 'X' ? 'text-blue-400' : 'text-red-400'
            ]">{{ player }}</span>
          </div>
          <div v-if="selectedPlayer === player" class="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm">✓</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between mt-8">
      <button
        v-if="currentStep > 1"
        @click="goBack"
        class="px-6 py-2 rounded-lg font-semibold text-white/70 hover:text-white transition-all duration-300"
      >
        ← {{ $t('game.back') }}
      </button>
      <div v-else class="w-24"></div>
      
      <button
        v-if="canProceed"
        @click="proceed"
        class="px-6 py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
      >
        {{ isLastStep ? $t('game.start') : $t('game.next') }} →
      </button>
      <div v-else class="w-24"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { GameMode, AIDifficulty, Player } from '../types/game'

const emit = defineEmits<{
  (e: 'gameSetup', mode: GameMode, player: Player, difficulty?: AIDifficulty): void
}>()

const currentStep = ref(1)
const selectedMode = ref<GameMode | null>(null)
const selectedDifficulty = ref<AIDifficulty | null>(null)
const selectedPlayer = ref<Player | null>(null)

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return selectedMode.value !== null
    case 2:
      if (selectedMode.value === 'AI') {
        return selectedDifficulty.value !== null
      }
      return selectedPlayer.value !== null
    case 3:
      return selectedPlayer.value !== null
    default:
      return false
  }
})

const isLastStep = computed(() => {
  if (selectedMode.value === 'PVP') {
    return currentStep.value === 2
  }
  return currentStep.value === 3
})

const selectMode = (mode: any) => {
  selectedMode.value = mode
  selectedDifficulty.value = null
  selectedPlayer.value = null
}

const selectDifficulty = (difficulty: any) => {
  selectedDifficulty.value = difficulty
}

const selectPlayer = (player: any) => {
  selectedPlayer.value = player
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

const proceed = () => {
  if (isLastStep.value) {
    emit('gameSetup', 
      selectedMode.value as GameMode,
      selectedPlayer.value as Player,
      selectedDifficulty.value as AIDifficulty | undefined
    )
  } else {
    currentStep.value++
  }
}

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>