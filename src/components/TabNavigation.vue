<template>
  <div :class="[themes[props.theme].boardBg, 'backdrop-blur-md rounded-xl p-6']">
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="currentTab = tab.id"
        :class="[
          'px-4 py-2 rounded-lg transition-all duration-300 font-semibold',
          currentTab === tab.id
            ? `${themes[props.theme].textColor} bg-white/10`
            : 'text-white/60 hover:text-white/80'
        ]"
      >
        {{ $t(`tabs.${tab.id}`) }}
      </button>
    </div>

    <div class="min-h-[400px]">
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform -translate-x-full opacity-0"
      >
        <div v-if="currentTab === 'stats'" key="stats">
          <GameStats :theme="props.theme" />
        </div>
        <div v-if="currentTab === 'achievements'" key="achievements">
          <Achievements :theme="props.theme" />
        </div>
        <div v-if="currentTab === 'themes'" key="themes">
          <ThemeSelector />
        </div>
        <div v-if="currentTab === 'settings'" key="settings">
          <Settings :theme="props.theme" @open-delete-modal="$emit('openDeleteModal')" />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GameStats from './GameStats.vue'
import Achievements from './Achievements.vue'
import ThemeSelector from './ThemeSelector.vue'
import Settings from './Settings.vue'
import { themes } from '../config/themes'

const props = defineProps<{
  theme: string
}>()

defineEmits<{
  (e: 'openDeleteModal'): void
}>()

const tabs = [
  { id: 'stats' },
  { id: 'achievements' },
  { id: 'themes' },
  { id: 'settings' }
]

const currentTab = ref('stats')
</script>