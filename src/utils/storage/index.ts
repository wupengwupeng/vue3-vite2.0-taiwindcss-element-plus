import storage from 'store'

const THEME = 'THEME'
const SETTINGNAV = 'SETTINGNAV'


export const getTheme = (): string => storage.get(THEME, '')
export const setTheme = (theme: string) => storage.set(THEME, theme)
export const removeTheme = () => storage.remove(THEME)

// 设置框架的结构
export const getNav = (): string => storage.get(SETTINGNAV, '')
export const setNav = (type: string) => storage.set(SETTINGNAV, type)
export const removeNav = () => storage.remove(SETTINGNAV)
