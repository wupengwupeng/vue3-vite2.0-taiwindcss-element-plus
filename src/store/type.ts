import { RouteRecordRaw } from 'vue-router'
type DayDark = '1' | '2'
type Nav = '1' | '2' | '3'
export type Config = {
  nav: Nav
  dayDark: DayDark
  lang: string
}
export interface RootState {
  name: string
  theme: string
  routes: RouteRecordRaw[]
  tags: Array<any>
  config: Config
  token: String
  loginInfo: any
  refreshToken: string
  menuList: any[]
}

export enum RootMutations {
  SET_THEME = 'SET_THEME',
  SET_ROUTES = 'SET_ROUTES',
  SET_TAGS = 'SET_TAGS',
  REMOVE_TAGS = 'REMOVE_TAGS',
  REMOVE_ALLTAGS = 'REMOVE_ALLTAGS',
  SET_NAV = 'SET_NAV',
  SET_DATDARK = 'SET_DATDARK',
  SET_LANG = 'SET_LANG',
  SET_TOKEN = 'SET_TOKEN',
  SET_LOGININFO = 'SET_LOGININFO',
  SET_REFRESHTOKEN = 'SET_REFRESHTOKEN',
  SET_MENULIST = 'SET_MENULIST',
}
