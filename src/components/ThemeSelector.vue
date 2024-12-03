<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import { themes } from '../config/themes'

const store = useGameStore()
const availableThemes = computed(() => 
  Object.values(themes).filter(theme => store.unlockedThemes.includes(theme.id))
)

const lockedThemes = computed(() => 
  Object.values(themes).filter(theme => !store.unlockedThemes.includes(theme.id))
)

const themeMotion = {
  initial: { scale: 0.8, opacity: 0 },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 15
    }
  }
}
</script>

<template>
  <div class="mb-4 space-y-4">
    <h2 :class="[themes[store.theme].textColor, 'text-2xl font-bold mb-4']">{{ $t('themes.title') }}</h2>

    <div class="flex gap-2 justify-center flex-wrap">
      <button
        v-for="theme in availableThemes"
        :key="theme.id"
        v-motion="themeMotion"
        @click="store.setTheme(theme.id)"
        class="p-3 rounded-lg transition-all duration-300 transform hover:scale-105 relative group"
        :class="[
          store.theme === theme.id ? 'ring-2 ring-white scale-105' : 'opacity-50',
          theme.background
        ]"
      >
        <span class="text-sm font-medium" :class="theme.textColor">
          {{ $t(`themes.${theme.id}`) }}
        </span>
        <div
          v-if="store.theme === theme.id"
          class="absolute inset-0 bg-white/10 rounded-lg animate-pulse"
        ></div>
      </button>
    </div>
    
    <div v-if="lockedThemes.length > 0" class="text-center space-y-2">
      <p class="text-white/60 text-sm">{{ $t('themes.locked') }}:</p>
      <div class="flex gap-2 justify-center flex-wrap">
        <div
          v-for="theme in lockedThemes"
          :key="theme.id"
          class="p-3 rounded-lg bg-gray-800/50 cursor-not-allowed relative group"
        >
          <span class="text-sm font-medium text-gray-400">???</span>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="text-xs text-white/80 bg-black/80 px-2 py-1 rounded">
              {{ $t('themes.unlockHint') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>