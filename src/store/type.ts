import { RouteRecordRaw } from 'vue-router'
type Nav = '1' | '2'
export type Config = {
  nav: Nav
  dayDark: Nav
  lang: string
}
export interface RootState {
  name: string
  theme: string
  routes: RouteRecordRaw[]
  tags: Array<any>
  config: Config
}

export enum RootMutations {
  SET_THEME = 'SET_THEME',
  SET_ROUTES = 'SET_ROUTES',
  SET_TAGS = 'SET_TAGS',
  REMOVE_TAGS = 'REMOVE_TAGS',
  SET_NAV = 'SET_NAV',
  SET_DATDARK = 'SET_DATDARK',
  SET_LANG = 'SET_LANG',
}
