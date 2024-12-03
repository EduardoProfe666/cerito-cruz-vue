export type Player = 'X' | 'O'
export type CellValue = Player | ''
export type Board = CellValue[]
export type WinningLine = number[] | null

export interface GameState {
  xWins: number
  oWins: number
  gamesPlayed: number
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