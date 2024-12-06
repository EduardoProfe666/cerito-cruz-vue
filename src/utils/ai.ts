import {Board, Player} from '../types/game'

export function getAIMove(board: Board, difficulty: string, aiPlayer: Player): number {
  switch (difficulty) {
    case 'easy':
      return getEasyMove(board)
    case 'medium':
      return getMediumMove(board, aiPlayer)
    case 'hard':
      return getHardMove(board, aiPlayer)
    default:
      return getEasyMove(board)
  }
}

function getEasyMove(board: Board): number {
  const availableMoves = board
    .map((cell, index) => (cell === '' ? index : -1))
    .filter(index => index !== -1)
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

function getMediumMove(board: Board, aiPlayer: Player): number {
  // 50% chance of making a smart move, 50% chance of making a random move
  if (Math.random() < 0.5) {
    return getHardMove(board, aiPlayer)
  }
  return getEasyMove(board)
}

function getHardMove(board: Board, aiPlayer: Player): number {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X'
  
  // Try to win
  const winningMove = findWinningMove(board, aiPlayer)
  if (winningMove !== -1) return winningMove
  
  // Block opponent from winning
  const blockingMove = findWinningMove(board, humanPlayer)
  if (blockingMove !== -1) return blockingMove
  
  // Take center if available
  if (board[4] === '') return 4
  
  // Take corners
  const corners = [0, 2, 6, 8]
  const availableCorners = corners.filter(i => board[i] === '')
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)]
  }
  
  // Take any available edge
  const edges = [1, 3, 5, 7]
  const availableEdges = edges.filter(i => board[i] === '')
  if (availableEdges.length > 0) {
    return availableEdges[Math.floor(Math.random() * availableEdges.length)]
  }
  
  // Take any available move
  return getEasyMove(board)
}

function findWinningMove(board: Board, player: Player): number {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ]

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern
    const line = [board[a], board[b], board[c]]
    const playerCount = line.filter(cell => cell === player).length
    const emptyCount = line.filter(cell => cell === '').length

    if (playerCount === 2 && emptyCount === 1) {
      return pattern[line.indexOf('')]
    }
  }

  return -1
}