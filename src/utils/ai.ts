import { Board, Player } from '../types/game'

export class TicTacToeAI {
  private maxDepth: number

  constructor(difficulty: 'easy' | 'medium' | 'hard') {
    switch (difficulty) {
      case 'easy':
        this.maxDepth = 2
        break
      case 'medium':
        this.maxDepth = 4
        break
      case 'hard':
        this.maxDepth = 9 // Essentially perfect play
        break
    }
  }

  getAIMove(board: Board, aiPlayer: Player): number {
    const move = this.minimax(board, aiPlayer, this.maxDepth, -Infinity, Infinity, true)
    return move.index
  }

  private minimax(
      board: Board,
      aiPlayer: Player,
      depth: number,
      alpha: number,
      beta: number,
      isMaximizing: boolean
  ): { score: number, index: number } {
    const humanPlayer = aiPlayer === 'X' ? 'O' : 'X'
    const gameState = this.checkGameState(board)

    // Termination conditions
    if (depth === 0 || gameState !== null) {
      return {
        score: this.evaluateBoard(board, aiPlayer, gameState),
        index: -1
      }
    }

    let bestMove = { score: isMaximizing ? -Infinity : Infinity, index: -1 }

    // Generate possible moves
    const availableMoves = board
        .map((cell, index) => cell === '' ? index : -1)
        .filter(index => index !== -1)

    for (const move of availableMoves) {
      // Create a copy of the board and make the move
      const newBoard = [...board]
      newBoard[move] = isMaximizing ? aiPlayer : humanPlayer

      // Recursive call with updated board and switched player
      const result = this.minimax(
          newBoard,
          aiPlayer,
          depth - 1,
          alpha,
          beta,
          !isMaximizing
      )

      // Update best move based on maximizing or minimizing player
      if (isMaximizing) {
        if (result.score > bestMove.score) {
          bestMove = { score: result.score, index: move }
          alpha = Math.max(alpha, result.score)
        }
      } else {
        if (result.score < bestMove.score) {
          bestMove = { score: result.score, index: move }
          beta = Math.min(beta, result.score)
        }
      }

      // Alpha-beta pruning
      if (beta <= alpha) {
        break
      }
    }

    return bestMove
  }

  private checkGameState(board: Board): 'win' | 'draw' | null {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ]

    // Check for win
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return 'win'
      }
    }

    // Check for draw
    if (board.every(cell => cell !== '')) {
      return 'draw'
    }

    return null
  }

  private evaluateBoard(board: Board, aiPlayer: Player, gameState: 'win' | 'draw' | null): number {
    const humanPlayer = aiPlayer === 'X' ? 'O' : 'X'

    if (gameState === 'win') {
      // If the last move resulted in a win, determine the winner
      const winningPlayer = this.checkWinner(board)
      if (winningPlayer === aiPlayer) return 100
      if (winningPlayer === humanPlayer) return -100
    }

    if (gameState === 'draw') return 0

    // Additional heuristics to improve strategic play
    return this.calculatePositionalScore(board, aiPlayer)
  }

  private checkWinner(board: Board): Player | null {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ]

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }

    return null
  }

  private calculatePositionalScore(board: Board, aiPlayer: Player): number {
    const humanPlayer = aiPlayer === 'X' ? 'O' : 'X'
    let score = 0

    // Center control
    if (board[4] === aiPlayer) score += 10
    if (board[4] === humanPlayer) score -= 10

    // Corner control
    const corners = [0, 2, 6, 8]
    corners.forEach(corner => {
      if (board[corner] === aiPlayer) score += 5
      if (board[corner] === humanPlayer) score -= 5
    })

    // Potential win lines
    const strategies = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ]

    strategies.forEach(line => {
      const aiCount = line.filter(i => board[i] === aiPlayer).length
      const humanCount = line.filter(i => board[i] === humanPlayer).length

      if (aiCount > 0 && humanCount === 0) {
        score += aiCount * 2
      }
      if (humanCount > 0 && aiCount === 0) {
        score -= humanCount * 2
      }
    })

    return score
  }
}

export function getAIMove(board: Board, difficulty: 'easy' | 'medium' | 'hard', aiPlayer: Player): number {
  const ai = new TicTacToeAI(difficulty)
  return ai.getAIMove(board, aiPlayer)
}