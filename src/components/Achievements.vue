<template>
  <div class="space-y-4">
    <h2 :class="[themes[store.theme].textColor, 'text-2xl font-bold mb-4']">
      {{ $t('achievements.title') }}
    </h2>

    <div class="bg-white/10 backdrop-blur-md rounded-xl p-6">
      <!-- Game Mastery -->
      <AchievementSection :title="$t('achievements.sections.mastery')" icon="🎯">
        <AchievementCard
            :name="$t('achievements.masterX.name')"
            :description="$t('achievements.masterX.description')"
            :is-unlocked="store.xWins >= 3"
            emoji="⭕"
        />
        <AchievementCard
            :name="$t('achievements.masterO.name')"
            :description="$t('achievements.masterO.description')"
            :is-unlocked="store.oWins >= 3"
            emoji="❌"
        />
        <AchievementCard
            :name="$t('achievements.peacemaker.name')"
            :description="$t('achievements.peacemaker.description')"
            :is-unlocked="store.draws >= 3"
            emoji="🤝"
        />
      </AchievementSection>

      <!-- Experience -->
      <AchievementSection :title="$t('achievements.sections.experience')" icon="👑">
        <AchievementCard
            :name="$t('achievements.veteran.name')"
            :description="$t('achievements.veteran.description')"
            :is-unlocked="store.gamesPlayed >= 10"
            emoji="🎮"
        />
        <AchievementCard
            :name="$t('achievements.expert.name')"
            :description="$t('achievements.expert.description')"
            :is-unlocked="store.gamesPlayed >= 15"
            emoji="🏆"
        />
        <AchievementCard
            :name="$t('achievements.balanced.name')"
            :description="$t('achievements.balanced.description')"
            :is-unlocked="store.xWins >= 5 && store.oWins >= 5"
            emoji="⚖️"
        />
      </AchievementSection>

      <!-- AI Challenges -->
      <AchievementSection :title="$t('achievements.sections.aiChallenges')" icon="🤖">
        <AchievementCard
            :name="$t('achievements.aiShooter.name')"
            :description="$t('achievements.aiShooter.description')"
            :is-unlocked="store.gamesWinAI >= 5"
            emoji="🎯"
        />
        <AchievementCard
            :name="$t('achievements.aiKiller.name')"
            :description="$t('achievements.aiKiller.description')"
            :is-unlocked="store.gamesWinAI >= 10"
            emoji="⚔️"
        />
        <AchievementCard
            :name="$t('achievements.aiMaster.name')"
            :description="$t('achievements.aiMaster.description')"
            :is-unlocked="store.gamesWinAI >= 15"
            emoji="👑"
        />
      </AchievementSection>

      <!-- Difficulty Conquests -->
      <AchievementSection :title="$t('achievements.sections.difficulty')" icon="🎮">
        <AchievementCard
            :name="$t('achievements.easyPeasy.name')"
            :description="$t('achievements.easyPeasy.description')"
            :is-unlocked="store.easyAIWins >= 7"
            emoji="🌱"
        />
        <AchievementCard
            :name="$t('achievements.mediumBreezy.name')"
            :description="$t('achievements.mediumBreezy.description')"
            :is-unlocked="store.mediumAIWins >= 7"
            emoji="⚡"
        />
        <AchievementCard
            :name="$t('achievements.hardAsHell.name')"
            :description="$t('achievements.hardAsHell.description')"
            :is-unlocked="store.hardAIWins >= 7"
            emoji="🔥"
        />
      </AchievementSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/game'
import { themes } from '../config/themes'
import AchievementCard from './achievements/AchievementCard.vue'
import AchievementSection from './achievements/AchievementSection.vue'

const store = useGameStore()
</script>