<template>
  <div class="space-y-4">
    <h2 :class="[themes[store.theme].textColor, 'text-2xl font-bold mb-4 flex items-center gap-2']">
      <span class="text-2xl">📊</span>
      {{ $t('stats.title') }}
    </h2>

    <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
      <!-- Player Stats -->
      <StatSection :title="$t('stats.playerStats')" icon="👥" columns="grid-cols-2">
        <StatCard
            :title="$t('stats.xWins')"
            :value="store.xWins"
            :percentage="xWinPercentage"
            color="blue"
            icon="⭕"
        />
        <StatCard
            :title="$t('stats.oWins')"
            :value="store.oWins"
            :percentage="oWinPercentage"
            color="red"
            icon="❌"
        />
      </StatSection>

      <!-- Draw Stats -->
      <StatSection :title="$t('stats.drawStats')" icon="🤝" columns="grid-cols-1">
        <StatCard
            :title="$t('stats.draws')"
            :value="store.draws"
            color="purple"
            icon="🔄"
        />
      </StatSection>

      <!-- AI Stats -->
      <StatSection :title="$t('stats.aiStats')" icon="🤖" columns="grid-cols-2">
        <StatCard
            :title="$t('stats.wins')"
            :value="store.gamesWinAI"
            color="pink"
            icon="🏆"
        />
        <StatCard
            :title="$t('stats.lost')"
            :value="store.gamesLostAI"
            color="yellow"
            icon="💔"
        />
      </StatSection>

      <!-- Difficulty Stats -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span class="text-2xl">🎮</span>
          {{ $t('stats.difficultyStats') }}
        </h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <StatCard
                :title="$t('stats.easyWins')"
                :value="store.easyAIWins"
                color="gray"
                icon="🌱"
            />
            <StatCard
                :title="$t('stats.mediumWins')"
                :value="store.mediumAIWins"
                color="indigo"
                icon="⚡"
            />
          </div>
          <div class="flex justify-center">
            <div class="w-1/2">
              <StatCard
                  :title="$t('stats.hardWins')"
                  :value="store.hardAIWins"
                  color="teal"
                  icon="🔥"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Total Games -->
      <StatSection :title="$t('stats.overallStats')" icon="🎯" columns="grid-cols-1">
        <StatCard
            :title="$t('stats.totalGames')"
            :value="store.gamesPlayed"
            color="green"
            icon="🎲"
        />
      </StatSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import { themes } from '../config/themes'
import StatCard from './stats/StatCard.vue'
import StatSection from './stats/StatSection.vue'

const store = useGameStore()

const xWinPercentage = computed(() => {
  if (store.gamesPlayed === 0) return 0
  return Math.round((store.xWins / store.gamesPlayed) * 100)
})

const oWinPercentage = computed(() => {
  if (store.gamesPlayed === 0) return 0
  return Math.round((store.oWins / store.gamesPlayed) * 100)
})
</script>