function randomInRange(from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1)) + from
}

function parseNumber(value: string | number | undefined, defaultValue: number) {
    if (typeof value === 'number') return value
    if (typeof value === 'string') {
        const parsed = Number(value)

        return isNaN(parsed) || !isFinite(parsed) ? defaultValue : parsed
    }
    return defaultValue
}

export const Utils = {
    randomInRange,
    parseNumber
}