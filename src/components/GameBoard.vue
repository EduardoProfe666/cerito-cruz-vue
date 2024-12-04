<template>
  <div :class="[themes[theme].boardBg, 'backdrop-blur-md rounded-xl p-6']">
    <div v-if="!gameStarted" class="text-center mb-6">
      <GameSetupFlow @game-setup="handleGameSetup" />
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
          :disabled="cell !== '' || winner !== null || (gameMode === 'AI' && currentPlayer === aiPlayer)"
          @click="handleCellClick"
        />
      </div>

      <div class="flex gap-4">
        <button
          @click="resetGame"
          class="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ $t('game.resetButton') }}
        </button>
        <button
          @click="resetGameSetup"
          class="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {{ $t('game.changeSettings') }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useSound } from '../composables/useSound'
import { useI18n } from 'vue-i18n'
import GameCell from './GameCell.vue'
import GameSetupFlow from './GameSetupFlow.vue'
import { getAIMove } from '../utils/ai'
import { Player, Board, WinningLine, GameMode, AIDifficulty } from '../types/game'
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
const gameMode = ref<GameMode | null>(null)
const aiDifficulty = ref<AIDifficulty>('easy')
const aiPlayer = ref<Player | null>(null)
const initialPlayer = ref<Player | null>(null)

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

const handleGameSetup = (mode: GameMode, player: Player, difficulty?: AIDifficulty) => {
  gameMode.value = mode
  initialPlayer.value = player
  currentPlayer.value = gameMode.value === 'AI' ? 'X' as Player : initialPlayer.value as Player
  if (mode === 'AI') {
    aiDifficulty.value = difficulty as AIDifficulty
    aiPlayer.value = player === 'X' ? 'O' : 'X'
  }
  gameStarted.value = true
  playSound('click')
  
  if (mode === 'AI' && currentPlayer.value === aiPlayer.value) {
    setTimeout(makeAIMove, 500)
  }
}

const handleCellClick = (index: number) => {
  if (board.value[index] === '' && !winner.value) {
    makeMove(index)
    
    if (gameMode.value === 'AI' && !winner.value && !board.value.every(cell => cell !== '')) {
      setTimeout(makeAIMove, 500)
    }
  }
}

const makeMove = (index: number) => {
  board.value[index] = currentPlayer.value
  playSound('click')
  checkWinner()
  if (!winner.value) {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

const makeAIMove = () => {
  if (aiPlayer.value && !winner.value) {
    const aiMove = getAIMove(board.value, aiDifficulty.value, aiPlayer.value)
    makeMove(aiMove)
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
      if(gameMode.value === 'AI'){
        if(initialPlayer.value !== winner.value){
          store.incrementGamesLost()
          playSound('draw')
        } else{
          store.incrementGamesWinIA(board.value[a] as Player)
          playSound('win')
        }
      }
      else{
        store.incrementWins(board.value[a] as Player)
        playSound('win')
      }
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
  currentPlayer.value = gameMode.value === 'AI' ? 'X' as Player : initialPlayer.value as Player
  
  if (gameMode.value === 'AI' && currentPlayer.value === aiPlayer.value) {
    setTimeout(makeAIMove, 500)
  }
}

const resetGameSetup = () => {
  resetGame()
  gameStarted.value = false
  gameMode.value = null
  aiPlayer.value = null
  initialPlayer.value = null
}

const isWinningCell = (index: number) => {
  return winningLine.value?.includes(index) ?? false
}
</script>