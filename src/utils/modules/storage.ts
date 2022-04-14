import storage from 'store'

const THEME = 'THEME'

export const getTheme = (): string => storage.get(THEME, '')
export const setTheme = (theme: string) => storage.set(THEME, theme)

