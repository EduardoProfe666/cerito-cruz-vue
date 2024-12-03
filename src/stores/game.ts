import { defineStore } from 'pinia'
import { GameState } from '../types/game'

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    xWins: 0,
    oWins: 0,
    gamesPlayed: 0,
    draws: 0,
    secretCode: '',
    unlockedThemes: ['default'],
    theme: 'default',
    language: navigator.language.split('-')[0] || 'es'
  }),
  actions: {
    incrementWins(player: 'X' | 'O') {
      if (player === 'X') this.xWins++
      else this.oWins++
      this.gamesPlayed++
      this.checkAchievements()
    },
    incrementDraws() {
      this.draws++
      this.gamesPlayed++
      this.checkAchievements()
    },
    resetStats() {
      this.xWins = 0
      this.oWins = 0
      this.gamesPlayed = 0
      this.draws = 0
      this.unlockedThemes = ['default']
      this.theme = 'default'
    },
    setLanguage(lang: string) {
      this.language = lang
    },
    unlockTheme(themeId: string) {
      if (!this.unlockedThemes.includes(themeId)) {
        this.unlockedThemes.push(themeId)
        this.theme = themeId
      }
    },
    checkAchievements() {
      if (this.xWins === 3) this.unlockTheme('neon')
      if (this.oWins === 3) this.unlockTheme('cyberpunk')
      if (this.draws === 3) this.unlockTheme('nature')
      if (this.gamesPlayed === 10) this.unlockTheme('sunset')
      if (this.gamesPlayed === 15) this.unlockTheme('galaxy')
      if (this.xWins >= 5 && this.oWins >= 5) this.unlockTheme('candy')
    },
    setTheme(themeId: string) {
      this.theme = themeId
    }
  },
  persist: true
})