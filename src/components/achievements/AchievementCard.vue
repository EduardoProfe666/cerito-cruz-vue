<template>
  <div
      class="p-4 rounded-lg transition-all duration-300 transform hover:scale-102"
      :class="[
      isUnlocked
        ? 'bg-white/20 backdrop-blur-sm'
        : 'bg-white/5 backdrop-blur-sm opacity-50'
    ]"
  >
    <div class="flex items-center gap-4">
      <div
          class="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          :class="[
          isUnlocked
            ? 'bg-green-500/20 text-green-300'
            : 'bg-gray-500/20 text-gray-400'
        ]"
      >
        {{ isUnlocked ? emoji : '🔒' }}
      </div>
      <div>
        <h3 class="font-semibold text-white">{{ name }}</h3>
        <p class="text-sm text-white/60">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description: string
  isUnlocked: boolean
  emoji: string
}>()
</script>