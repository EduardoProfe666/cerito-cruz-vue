<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GameBoard from './GameBoard.vue'
import GameStats from './GameStats.vue'
import ThemeSelector from './ThemeSelector.vue'
import { useGameStore } from '../stores/game'
import { useSecretCode } from '../composables/useSecretCode'
import { themes } from '../config/themes'

const store = useGameStore()
const { handleKeydown } = useSecretCode()
const currentTheme = ref('default')

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div :class="[themes[currentTheme].background, 'min-h-screen flex items-center justify-center p-4']">
    <div class="max-w-md w-full space-y-6">
      <h1 :class="[themes[currentTheme].textColor, 'text-4xl font-bold text-center mb-8 animate-pulse']">
        Cerito Cruz ⭕❌
      </h1>

      <GameBoard :theme="currentTheme" />
      <ThemeSelector v-model="currentTheme" />
      <GameStats :theme="currentTheme" />
      
      <button
        @click="store.resetStats"
        class="w-full py-3 bg-red-600/50 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-red-700/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Reiniciar Estadísticas
      </button>
    </div>
  </div>
</template>