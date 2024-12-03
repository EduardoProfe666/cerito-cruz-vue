import { Theme } from '../types/game'
export const themes: Record<string, Theme> = {
  default: {
    id: 'default',
    name: "Predeterminado",
    background: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
    playerX: 'text-blue-400',
    playerO: 'text-red-400',
    boardBg: 'bg-white/5',
    cellBg: 'bg-white/10',
    textColor: 'text-white'
  },
  retro: {
    id: 'retro',
    name: 'Konami',
    background: 'bg-gradient-to-br from-green-900 via-green-800 to-green-900',
    playerX: 'text-green-400',
    playerO: 'text-yellow-400',
    boardBg: 'bg-black/50',
    cellBg: 'bg-black/30',
    textColor: 'text-green-400'
  },
  neon: {
    id: 'neon',
    name: 'Neón',
    background: 'bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900',
    playerX: 'text-cyan-400',
    playerO: 'text-pink-400',
    boardBg: 'bg-black/50',
    cellBg: 'bg-black/30',
    textColor: 'text-white'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    background: 'bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-600 to-cyan-500',
    playerX: 'text-yellow-300',
    playerO: 'text-cyan-300',
    boardBg: 'bg-purple-900/70',
    cellBg: 'bg-purple-800/50',
    textColor: 'text-yellow-200'
  },
  nature: {
    id: 'nature',
    name: 'Naturalista',
    background: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-600 via-emerald-500 to-teal-400',
    playerX: 'text-emerald-300',
    playerO: 'text-teal-200',
    boardBg: 'bg-green-900/30',
    cellBg: 'bg-green-800/20',
    textColor: 'text-emerald-100'
  },
  sunset: {
    id: 'sunset',
    name: 'Atardecer',
    background: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-orange-500 via-red-500 to-purple-600',
    playerX: 'text-orange-300',
    playerO: 'text-purple-300',
    boardBg: 'bg-red-900/30',
    cellBg: 'bg-red-800/20',
    textColor: 'text-orange-100'
  },
  galaxy: {
    id: 'galaxy',
    name: 'Galáctico',
    background: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-indigo-900 to-purple-900',
    playerX: 'text-blue-300',
    playerO: 'text-purple-300',
    boardBg: 'bg-indigo-900/30',
    cellBg: 'bg-indigo-800/20',
    textColor: 'text-blue-100'
  },
  candy: {
    id: 'candy',
    name: 'Acaramelado',
    background: 'bg-gradient-to-br from-pink-500 via-red-400 to-yellow-400',
    playerX: 'text-pink-300',
    playerO: 'text-yellow-300',
    boardBg: 'bg-pink-900/30',
    cellBg: 'bg-pink-800/20',
    textColor: 'text-pink-100'
  }
}