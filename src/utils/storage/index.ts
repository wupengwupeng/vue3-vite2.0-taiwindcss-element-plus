import storage from 'store'
import { RouteRecordRaw } from 'vue-router'
const THEME = 'THEME'
const ROUTE = 'ROUTE'

export const getTheme = (): string => storage.get(THEME, '')
export const setTheme = (theme: string) => storage.set(THEME, theme)


export const getRoutes = (): Array<RouteRecordRaw> => storage.get(ROUTE, '')
export const setRoutes = (routes: Array<RouteRecordRaw>) => storage.set(ROUTE, routes)