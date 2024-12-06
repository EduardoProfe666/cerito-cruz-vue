export default {
  game: {
    title: 'Tic Tac Toe ⭕❌',
    mode: 'Mode',
    difficulty: 'Difficulty',
    player: 'Player',
    selectMode: 'Select Game Mode',
    selectPlayer: 'Select Your Symbol',
    selectDifficulty: 'Select AI Difficulty',
    currentTurn: "Player {player}'s turn",
    winner: 'Player {player} wins!',
    draw: "It's a draw!",
    resetButton: 'Reset Game',
    changeSettings: 'Change Settings',
    back: 'Back',
    next: 'Next',
    start: 'Start Game',
    modes: {
      ai: 'vs AI',
      pvp: '2 Players',
    },
    difficulties: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard'
    }
  },
  tabs: {
    stats: 'Statistics',
    achievements: 'Achievements',
    themes: 'Themes',
    settings: 'Settings'
  },
  stats: {
    title: 'Statistics',
    xWins: 'X Wins',
    oWins: 'O Wins',
    draws: 'Draws',
    lost: 'Losses AI',
    wins: 'AI Wins',
    totalGames: 'Total Games',
    winRate: 'Win Rate',
    easyWins: 'Easy Wins',
    mediumWins: 'Medium Wins',
    hardWins: 'Hard Wins',
  },
  themes: {
    title: 'Themes',
    default: 'Default',
    neon: 'Neon',
    cyberpunk: 'Cyberpunk',
    nature: 'Nature',
    sunset: 'Sunset',
    galaxy: 'Galaxy',
    candy: 'Candy',
    retro: 'Konami',
    thanksgiving: 'Thanksgiving',
    halloween: 'Halloween',
    christmas: 'Christmas',
    tropical: 'Tropical Party',
    medieval: 'Medieval Era',
    space: 'Outer Space',
    locked: 'Locked',
    unlockHint: 'Keep playing to unlock!',
  },
  achievements: {
    title: 'Achievements',
    masterX: {
      name: 'X Master',
      description: 'Win 3 games as X'
    },
    masterO: {
      name: 'O Master',
      description: 'Win 3 games as O'
    },
    peacemaker: {
      name: 'Peacemaker',
      description: 'Get 3 draws'
    },
    veteran: {
      name: 'Veteran',
      description: 'Play 10 games'
    },
    expert: {
      name: 'Expert',
      description: 'Play 15 games'
    },
    balanced: {
      name: 'Balanced',
      description: 'Get 5 wins with each player'
    },
    aiShooter: {
      name: 'AI Shooter',
      description: 'Get 5 wins against AI'
    },
    aiKiller: {
      name: 'AI Killer',
      description: 'Get 10 wins against AI'
    },
    aiMaster: {
      name: 'AI Master',
      description: 'Get 15 wins against AI'
    },
    easyPeasy: {
      name: 'Easy Peasy',
      description: 'Get 7 wins against AI in easy difficulty'
    },
    mediumBreezy: {
      name: 'Medium Breezy',
      description: 'Get 15 wins against AI in medium difficulty'
    },
    hardAsHell: {
      name: 'Hard as Hell',
      description: 'Get 15 wins against AI in hard difficulty'
    },
  },
  settings: {
    title: 'Settings',
    language: {
      title: 'Language',
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      it: 'Italian',
      de: 'German',
      pt: 'Portuguese',
      la: 'Latin'
    },
    data: {
      title: 'Game Data',
      description: 'Delete all progress, including statistics and unlocked themes',
      deleteButton: 'Delete Data',
      confirmTitle: 'Delete all data?',
      confirmDescription: 'This action will permanently delete all statistics and unlocked themes. This action cannot be undone.',
      confirmButton: 'Yes, delete data',
      cancelButton: 'Cancel'
    },
    info: {
      title: 'Information',
      version: 'Version:',
      developer: 'Developed by'
    }
  }
}