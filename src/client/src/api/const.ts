const ENDPOINTS = {
    SHOW_TMKOC: 'shows/taarak-mehta-ka-ooltah-chashmah',
} as const

const MODES = {
    RANDOM: 'random',
    MOST_LIKED: 'most_liked',
    LEAST_LIKED: 'least_liked',
    MOST_VIEWED: 'most_viewed',
    LEAST_VIEWED: 'least_viewed',
    MOST_COMMENTED: 'most_commented',
    LEAST_COMMENTED: 'least_commented',
} as const

export { ENDPOINTS, MODES }