<script setup lang="ts">
import { computed } from 'vue'
import type { Theme } from '../../types/game'
import ThemePreview from './ThemePreview.vue'

defineProps<{
  theme: Theme
  name: string
  isUnlocked: boolean
  isSelected: boolean
}>()

const themeMotion = computed(() => ({
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
}))
</script>

<template>
  <div
      v-motion="themeMotion"
      :class="[
      'relative group rounded-xl p-4 transition-all duration-300 transform hover:scale-102',
      isUnlocked ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-800/50',
      isSelected ? 'ring-2 ring-white scale-102' : ''
    ]"
  >
    <!-- Theme Preview -->
    <div class="mb-4 overflow-hidden rounded-lg">
      <ThemePreview v-if="isUnlocked" :theme="theme" />
      <div v-else class="aspect-square bg-gray-900/50 rounded-lg flex items-center justify-center">
        <span class="text-4xl opacity-50">🔒</span>
      </div>
    </div>

    <!-- Theme Info -->
    <div class="space-y-2">
      <h3 :class="[
        'font-medium text-lg transition-colors duration-300',
        isUnlocked ? theme.textColor : 'text-gray-400'
      ]">
        {{ name }}
      </h3>
      <div class="flex items-center gap-2">
        <div
            v-if="isUnlocked"
            :class="[theme.background, 'w-3 h-3 rounded-full']"
        ></div>
        <span class="text-sm text-white/60">
          {{ isUnlocked ? $t('themes.unlocked') : $t('themes.locked') }}
        </span>
      </div>
    </div>

    <!-- Selected Indicator -->
    <div
        v-if="isSelected"
        class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
    >
      <span class="text-black text-sm">✓</span>
    </div>

    <!-- Unlock Hint -->
    <div
        v-if="!isUnlocked"
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <span class="text-sm text-white/80 bg-black/80 px-3 py-2 rounded-lg backdrop-blur-sm">
        {{ $t('themes.unlockHint') }}
      </span>
    </div>
  </div>
</template>