<template>
  <div class="space-y-4">
    <h2 :class="[themes[store.theme].textColor, 'text-2xl font-bold mb-4']">{{ $t('achievements.title') }}</h2>
    
    <div class="grid gap-4">
      <div
        v-for="achievement in achievements"
        :key="achievement.id"
        class="p-4 rounded-lg transition-all duration-300 transform hover:scale-102"
        :class="[
          isUnlocked(achievement)
            ? 'bg-white/20 backdrop-blur-sm'
            : 'bg-white/5 backdrop-blur-sm opacity-50'
        ]"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            :class="[
              isUnlocked(achievement)
                ? 'bg-green-500/20 text-green-300'
                : 'bg-gray-500/20 text-gray-400'
            ]"
          >
            {{ isUnlocked(achievement) ? '🏆' : '🔒' }}
          </div>
          <div>
            <h3 class="font-semibold text-white">{{ achievement.name }}</h3>
            <p class="text-sm text-white/60">{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/game'
import { themes } from '../config/themes'
import {useI18n} from "vue-i18n";


const store = useGameStore()
const { t } = useI18n()

const achievements = [
  {
    id: 'neon',
    name: t('achievements.masterX.name'),
    description: t('achievements.masterX.description'),
    condition: () => store.xWins >= 3
  },
  {
    id: 'cyberpunk',
    name: t('achievements.masterO.name'),
    description: t('achievements.masterO.description'),
    condition: () => store.oWins >= 3
  },
  {
    id: 'nature',
    name: t('achievements.peacemaker.name'),
    description: t('achievements.peacemaker.description'),
    condition: () => store.draws >= 3
  },
  {
    id: 'sunset',
    name: t('achievements.veteran.name'),
    description: t('achievements.veteran.description'),
    condition: () => store.gamesPlayed >= 10
  },
  {
    id: 'galaxy',
    name: t('achievements.expert.name'),
    description: t('achievements.expert.description'),
    condition: () => store.gamesPlayed >= 15
  },
  {
    id: 'candy',
    name: t('achievements.balanced.name'),
    description: t('achievements.balanced.description'),
    condition: () => store.xWins >= 5 && store.oWins >= 5
  },
  {
    id: 'thanksgiving',
    name: t('achievements.aiShooter.name'),
    description: t('achievements.aiShooter.description'),
    condition: () => store.gamesWinAI >= 5
  },
  {
    id: 'halloween',
    name: t('achievements.aiKiller.name'),
    description: t('achievements.aiKiller.description'),
    condition: () => store.gamesWinAI >= 10
  },
  {
    id: 'christmas',
    name: t('achievements.aiMaster.name'),
    description: t('achievements.aiMaster.description'),
    condition: () => store.gamesWinAI >= 15
  },
  {
    id: 'tropical',
    name: t('achievements.easyPeasy.name'),
    description: t('achievements.easyPeasy.description'),
    condition: () => store.easyAIWins >= 7
  },
  {
    id: 'medieval',
    name: t('achievements.mediumBreezy.name'),
    description: t('achievements.mediumBreezy.description'),
    condition: () => store.mediumAIWins >= 7
  },
  {
    id: 'space',
    name: t('achievements.hardAsHell.name'),
    description: t('achievements.hardAsHell.description'),
    condition: () => store.hardAIWins >= 7
  },
]

const isUnlocked = (achievement: typeof achievements[0]) => {
  return achievement.condition()
}
</script>