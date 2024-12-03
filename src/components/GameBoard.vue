<template>
  <div :class="[themes[theme].boardBg, 'backdrop-blur-md rounded-xl p-6 mb-6']">
    <div v-if="!gameStarted" class="text-center mb-6">
      <h3 class="text-xl font-bold text-white mb-4">{{ $t('game.selectPlayer') }}</h3>
      <div class="flex gap-4 justify-center">
        <button
          v-for="player in ['X', 'O']"
          :key="player"
          @click="startGame(player)"
          :class="[
            'px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105',
            player === 'X' ? themes[theme].playerX : themes[theme].playerO,
            'bg-white/10 hover:bg-white/20'
          ]"
        >
          {{ player }}
        </button>
      </div>
    </div>

    <template v-else>
      <div class="text-center mb-6">
        <p
          class="text-2xl font-bold"
          :class="[
            winner ? 'text-green-400' : currentPlayer === 'X'
              ? themes[theme].playerX
              : themes[theme].playerO
          ]"
        >
          {{ gameStatus }}
        </p>
      </div>

      <div class="grid grid-cols-3 gap-3 mb-6">
        <GameCell
          v-for="(cell, index) in board"
          :key="index"
          :value="cell"
          :index="index"
          :is-winning="isWinningCell(index)"
          :theme="theme"
          :disabled="cell !== '' || winner !== null"
          @click="handleCellClick"
        />
      </div>

      <button
        @click="resetGame"
        class="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ $t('game.resetButton') }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useSound } from '../composables/useSound'
import { useI18n } from 'vue-i18n'
import GameCell from './GameCell.vue'
import { Player, Board, WinningLine } from '../types/game'
import { themes } from '../config/themes'

const { t } = useI18n()

defineProps<{
  theme: string
}>()

const store = useGameStore()
const { playSound } = useSound()

const board = ref<Board>(Array(9).fill(''))
const currentPlayer = ref<Player>('X')
const winner = ref<Player | null>(null)
const winningLine = ref<WinningLine>(null)
const gameStarted = ref(false)

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

const gameStatus = computed(() => {
  if (winner.value) {
    return t('game.winner', { player: winner.value })
  }
  if (board.value.every(cell => cell !== '')) {
    return t('game.draw')
  }
  return t('game.currentTurn', { player: currentPlayer.value })
})

const startGame = (player: Player) => {
  currentPlayer.value = player
  gameStarted.value = true
  playSound('click')
}

const handleCellClick = (index: number) => {
  if (board.value[index] === '' && !winner.value) {
    board.value[index] = currentPlayer.value
    playSound('click')
    checkWinner()
    if (!winner.value) {
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    }
  }
}

const checkWinner = () => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination
    if (
      board.value[a] &&
      board.value[a] === board.value[b] &&
      board.value[a] === board.value[c]
    ) {
      winner.value = board.value[a] as Player
      winningLine.value = combination
      store.incrementWins(board.value[a] as Player)
      playSound('win')
      return
    }
  }
  if (board.value.every(cell => cell !== '')) {
    store.incrementDraws()
    playSound('draw')
  }
}

const resetGame = () => {
  board.value = Array(9).fill('')
  winner.value = null
  winningLine.value = null
  gameStarted.value = false
}

const isWinningCell = (index: number) => {
  return winningLine.value?.includes(index) ?? false
}
</script>