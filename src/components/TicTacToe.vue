<template>
  <div :class="[themes[currentTheme].background, 'min-h-screen flex items-center justify-center p-4']">
    <div class="max-w-4xl w-full space-y-6">
      <h1 :class="[themes[currentTheme].textColor, 'text-4xl font-bold text-center mb-8 animate-pulse']">
        {{ $t('game.title') }}
      </h1>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-6">
          <GameBoard :theme="currentTheme" />
        </div>
        
        <div class="space-y-6">
          <TabNavigation 
            :theme="currentTheme" 
            @open-delete-modal="isDeleteModalOpen = true"
          />
        </div>
      </div>
    </div>
  </div>

  <DeleteDataModal 
    :is-open="isDeleteModalOpen" 
    :theme="currentTheme"
    @close="isDeleteModalOpen = false"
    @confirm="handleDeleteData"
  />
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed} from 'vue'
import GameBoard from './GameBoard.vue'
import TabNavigation from './TabNavigation.vue'
import DeleteDataModal from './DeleteDataModal.vue'
import { useGameStore } from '../stores/game'
import { useSecretCode } from '../composables/useSecretCode'
import { themes } from '../config/themes'
import {useI18n} from "vue-i18n";

const store = useGameStore()
const { handleKeydown } = useSecretCode()
const currentTheme = computed(() => store.theme)
const isDeleteModalOpen = ref(false)

const handleDeleteData = () => {
  store.resetStats()
  isDeleteModalOpen.value = false
}

const { locale } = useI18n()
store.setLanguage(store.language)
locale.value = store.language

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>