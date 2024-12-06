export interface StatColorConfig {
    bg: string
    text: string
    accent: string
}

export const statColors: Record<string, StatColorConfig> = {
    blue: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-200',
        accent: 'text-blue-100'
    },
    red: {
        bg: 'bg-red-500/20',
        text: 'text-red-200',
        accent: 'text-red-100'
    },
    purple: {
        bg: 'bg-purple-500/20',
        text: 'text-purple-200',
        accent: 'text-purple-100'
    },
    pink: {
        bg: 'bg-pink-500/20',
        text: 'text-pink-200',
        accent: 'text-pink-100'
    },
    yellow: {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-200',
        accent: 'text-yellow-100'
    },
    gray: {
        bg: 'bg-gray-500/20',
        text: 'text-gray-200',
        accent: 'text-gray-100'
    },
    indigo: {
        bg: 'bg-indigo-500/20',
        text: 'text-indigo-200',
        accent: 'text-indigo-100'
    },
    teal: {
        bg: 'bg-teal-500/20',
        text: 'text-teal-200',
        accent: 'text-teal-100'
    },
    green: {
        bg: 'bg-green-500/20',
        text: 'text-green-200',
        accent: 'text-green-100'
    }
}