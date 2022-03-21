
import { RouteRecordRaw } from 'vue-router'
export interface RootState {
  name: string
  theme: string
  routes: RouteRecordRaw[]
}

export enum RootMutations {
  SET_THEME = 'SET_THEME',
  SET_ROUTES = 'SET_ROUTES'
}


