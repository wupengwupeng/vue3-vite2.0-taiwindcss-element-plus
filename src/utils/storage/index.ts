import storage from 'store'

const THEME = 'THEME'
const SETTINGNAV = 'SETTINGNAV'
const DAYDARK = 'DAYDARK'
const LANG = 'LANG'

// 设置语言环境
export const getLang = (): string => storage.get(LANG, '')
export const setLang = (lang: string) => storage.set(LANG, lang)
export const removeLang = () => storage.remove(LANG)

// 设置主题色
export const getTheme = (): string => storage.get(THEME, '')
export const setTheme = (theme: string) => storage.set(THEME, theme)
export const removeTheme = () => storage.remove(THEME)

// 设置框架的结构
export const getNav = (): string => storage.get(SETTINGNAV, '')
export const setNav = (type: string) => storage.set(SETTINGNAV, type)
export const removeNav = () => storage.remove(SETTINGNAV)

// 设置主题
export const getDayDark = (): string => storage.get(DAYDARK, '')
export const setDayDark = (theme: string) => storage.set(DAYDARK, theme)
export const removeDayDark = () => storage.remove(DAYDARK)

// 新手指引
export const getDriver = (driverName): string => storage.get(driverName, '')
export const setDriver = (driverName, driver: boolean) => storage.set(driverName, driver)
export const removeDriver = driverName => storage.remove(driverName)
