export type Player = 'X' | 'O'
export type CellValue = Player | ''
export type Board = CellValue[]
export type WinningLine = number[] | null
export type GameMode = 'AI' | 'PVP'
export type AIDifficulty = 'easy' | 'medium' | 'hard'

export interface GameState {
  xWins: number
  oWins: number
  gamesPlayed: number
  gamesLostIA: number
  gamesWinIA: number
  draws: number
  secretCode: string
  unlockedThemes: string[]
  language: string
  theme: string
}

export interface Theme {
  id: string
  name: string
  background: string
  playerX: string
  playerO: string
  boardBg: string
  cellBg: string
  textColor: string
}