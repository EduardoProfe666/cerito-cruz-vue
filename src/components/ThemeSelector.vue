<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import { themes } from '../config/themes'
import ThemeCard from './theme/ThemeCard.vue'
import ThemeGrid from './theme/ThemeGrid.vue'

const store = useGameStore()

const totalThemes = Object.keys(themes).length

const availableThemes = computed(() =>
    Object.values(themes).filter(theme => store.unlockedThemes.includes(theme.id))
)

const lockedThemes = computed(() =>
    Object.values(themes).filter(theme => !store.unlockedThemes.includes(theme.id))
)

const progress = computed(() => {
  const percentage = (availableThemes.value.length / totalThemes) * 100
  return Math.round(percentage)
})
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 :class="[themes[store.theme].textColor, 'text-2xl font-bold flex items-center gap-2']">
          <span class="text-2xl">🎨</span>
          {{ $t('themes.title') }}
        </h2>
        <div class="text-sm text-white/60">
          {{ availableThemes.length }}/{{ totalThemes }} {{ $t('themes.unlocked').toLowerCase() }}
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-white/5 rounded-full h-2 overflow-hidden">
        <div
            :class="[themes[store.theme].background, 'h-full transition-all duration-1000 ease-out']"
            :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Available Themes -->
    <ThemeGrid :themes="availableThemes" :title="$t('themes.unlocked')">
      <button
          v-for="theme in availableThemes"
          :key="theme.id"
          @click="store.setTheme(theme.id)"
      >
        <ThemeCard
            :theme="theme"
            :name="$t(`themes.${theme.id}`)"
            :is-unlocked="true"
            :is-selected="store.theme === theme.id"
        />
      </button>
    </ThemeGrid>

    <!-- Locked Themes -->
    <ThemeGrid
        v-if="lockedThemes.length > 0"
        :themes="lockedThemes"
        :title="$t('themes.locked')"
        is-locked
    >
      <div v-for="theme in lockedThemes" :key="theme.id">
        <ThemeCard
            :theme="theme"
            :name="'???'"
            :is-unlocked="false"
            :is-selected="false"
        />
      </div>
    </ThemeGrid>
  </div>
</template>