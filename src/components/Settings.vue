<template>
  <div class="space-y-6">
    <h2 :class="[themes[theme].textColor, 'text-2xl font-bold mb-4']">
      {{ $t('settings.title') }}
    </h2>
    
    <div class="space-y-4">
      <div class="p-4 bg-white/5 backdrop-blur-sm rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">
          {{ $t('settings.language.title') }}
        </h3>
        <div class="flex gap-2">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="changeLanguage(lang.code)"
            :class="[
              'px-4 py-2 rounded-lg transition-all duration-300',
              store.language === lang.code
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:text-white/80'
            ]"
          >
            {{ $t(`settings.language.${lang.code}`) }}
          </button>
        </div>
      </div>

      <div class="p-4 bg-white/5 backdrop-blur-sm rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">
          {{ $t('settings.data.title') }}
        </h3>
        <p class="text-white/60 text-sm mb-4">
          {{ $t('settings.data.description') }}
        </p>
        <button
          @click="$emit('openDeleteModal')"
          class="w-full py-3 bg-red-600/50 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-red-700/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          {{ $t('settings.data.deleteButton') }}
        </button>
      </div>
      
      <div class="p-4 bg-white/5 backdrop-blur-sm rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">
          {{ $t('settings.info.title') }}
        </h3>
        <p class="text-white/60 text-sm">
          {{ $t('settings.info.version') }}<br>
          {{ $t('settings.info.developer') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/game'
import { themes } from '../config/themes'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const store = useGameStore()

defineProps<{
  theme: string
}>()

defineEmits<{
  (e: 'openDeleteModal'): void
}>()

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' }
]

const changeLanguage = (lang: string) => {
  store.setLanguage(lang)
  locale.value = lang
}

</script>