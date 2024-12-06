import {defineStore} from 'pinia'
import {AIDifficulty, GameState} from '../types/game'

export const useGameStore = defineStore('game', {
    state: (): GameState => ({
        xWins: 0,
        oWins: 0,
        gamesPlayed: 0,
        gamesLostAI: 0,
        gamesWinAI: 0,
        easyAIWins: 0,
        mediumAIWins: 0,
        hardAIWins: 0,
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
        incrementGamesLost() {
            this.gamesLostAI++
            this.gamesPlayed++
            this.checkAchievements()
        },
        incrementGamesWinIA(player: 'X' | 'O', difficulty: AIDifficulty) {
            if(difficulty === 'easy')
                this.easyAIWins++;
            if(difficulty === 'medium')
                this.mediumAIWins++;
            if(difficulty === 'hard')
                this.hardAIWins++;
            this.gamesWinAI++
            this.incrementWins(player)
        },
        resetStats() {
            this.xWins = 0
            this.oWins = 0
            this.gamesLostAI = 0
            this.gamesPlayed = 0
            this.gamesWinAI = 0
            this.easyAIWins = 0
            this.mediumAIWins = 0
            this.hardAIWins = 0
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
            if (this.gamesWinAI >= 5) this.unlockTheme('thanksgiving')
            if (this.gamesWinAI >= 10) this.unlockTheme('halloween')
            if (this.gamesWinAI >= 15) this.unlockTheme('christmas')
            if (this.easyAIWins >= 7) this.unlockTheme('tropical')
            if (this.mediumAIWins >= 7) this.unlockTheme('medieval')
            if (this.hardAIWins >= 7) this.unlockTheme('space')
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