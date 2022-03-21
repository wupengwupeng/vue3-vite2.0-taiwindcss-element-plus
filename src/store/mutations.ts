import { setTheme } from '@/utils/storage'
import type { MutationTree } from 'vuex'
import type { RootState } from './type'
import { RootMutations } from './type'
import { changeTheme } from '@/utils/index'
import { RouteRecordRaw } from 'vue-router'
const mutations: MutationTree<RootState> = {
  [RootMutations.SET_THEME](state, theme: string) {
    state.theme = theme
    setTheme(theme)
    changeTheme(theme)
  },
  [RootMutations.SET_ROUTES](state, routes: Array<RouteRecordRaw>) {
    state.routes = routes
  }
}

export default mutations
