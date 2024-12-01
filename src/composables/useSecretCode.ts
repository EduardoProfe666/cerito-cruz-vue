import { ref } from 'vue'
import { useGameStore } from '../stores/game'
import { useSound } from './useSound'

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useSecretCode() {
  const store = useGameStore()
  const { playSound } = useSound()
  const inputSequence = ref<string[]>([])

  const handleKeydown = (event: KeyboardEvent) => {
    inputSequence.value.push(event.key)
    
    if (inputSequence.value.length > KONAMI_CODE.length) {
      inputSequence.value.shift()
    }

    if (JSON.stringify(inputSequence.value) === JSON.stringify(KONAMI_CODE)) {
      store.unlockTheme('retro')
      playSound('unlock')
      inputSequence.value = []
    }
  }

  return {
    handleKeydown
  }
}