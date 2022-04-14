
import { RouteRecordRaw } from 'vue-router'
export interface RootState {
  name: string
  theme: string
  routes: RouteRecordRaw[]
  tags: Array<any>
}

export enum RootMutations {
  SET_THEME = 'SET_THEME',
  SET_ROUTES = 'SET_ROUTES',
  SET_TAGS = 'SET_TAGS',
  REMOVE_TAGS = 'REMOVE_TAGS'
}


