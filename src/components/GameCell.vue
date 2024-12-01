<script setup lang="ts">
import { computed } from 'vue'
import { CellValue } from '../types/game'
import { useSound } from '../composables/useSound'
import { themes } from '../config/themes'
import gsap from 'gsap'

const props = defineProps<{
  value: CellValue
  index: number
  isWinning: boolean
  theme: string
  disabled: boolean
}>()

const { playSound } = useSound()

const emit = defineEmits<{
  (e: 'click', index: number): void
}>()

const handleClick = () => {
  if (!props.disabled) {
    playSound('click')
    emit('click', props.index)
  }
}

const cellMotion = computed(() => ({
  initial: { scale: 0, opacity: 0 },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 8,
      delay: props.index * 50
    }
  }
}))


const glowEffect = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  gsap.to(button, {
    '--x': `${x}px`,
    '--y': `${y}px`,
    duration: 0.3,
    ease: 'power2.out'
  })
}
</script>

<template>
  <button
    v-motion="cellMotion"
    @click="handleClick"
    @mousemove="glowEffect"
    class="aspect-square rounded-lg text-6xl font-bold flex items-center justify-center transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative overflow-hidden before:absolute before:w-32 before:h-32 before:bg-white/10 before:rounded-full before:blur-xl before:transition-all before:duration-300 before:opacity-0 hover:before:opacity-100 before:transform hover:before:scale-150"
    :style="{
      '--x': '0px',
      '--y': '0px'
    }"
    :class="[
      theme === 'retro' ? 'font-mono' : 'font-game',
      value === 'X' ? themes[theme].playerX : themes[theme].playerO,
      isWinning ? 'bg-green-400/20' : themes[theme].cellBg,
      disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer',
      isWinning ? 'animate-bounce shadow-lg' : ''
    ]"
  >
    <span
      v-if="value"
      class="transform transition-all duration-300 relative z-10 hover:scale-110"
      :class="{ 'rotate-180': isWinning }"
    >
      {{ value }}
    </span>
    <div
      v-if="isWinning"
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
    ></div>
  </button>
</template>

<style scoped>
.font-game {
  font-family: 'Segoe UI', system-ui, sans-serif;
  text-shadow: 0 0 10px currentColor;
}

button::before {
  transform: translate(calc(var(--x) - 50%), calc(var(--y) - 50%));
}
</style>