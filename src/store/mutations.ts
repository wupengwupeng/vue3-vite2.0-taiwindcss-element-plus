import type { MutationTree } from 'vuex'
import type { RootState } from './type'
import { RootMutations } from './type'
import { changeTheme, darkTheme } from '@/utils/index'
import { RouteRecordRaw } from 'vue-router'
import { isDark } from '@/utils/config/index'
import { setToken, setLoginIfo, setRefreshToken, setMenuList } from '@/utils/storage/index'

const mutations: MutationTree<RootState> = {
  [RootMutations.SET_THEME](state, theme: string) {
    state.theme = theme
    changeTheme(theme)
    darkTheme(isDark.value, theme)
  },
  [RootMutations.SET_ROUTES](state, routes: Array<RouteRecordRaw>) {
    state.routes = routes
  },
  [RootMutations.SET_TAGS](state, tag) {
    if (state.tags.length) {
      // length > 1
      const index = state.tags.findIndex(res => res.name === tag.name)
      if (index === -1) {
        state.tags.push(tag)
      }
    } else {
      // init tags
      state.tags.push(tag)
    }
  },
  [RootMutations.REMOVE_TAGS](state, tag) {
    if (state.tags.length === 1) {
      return
    } else {
      const index = state.tags.findIndex(res => res.name === tag)
      state.tags.splice(index, 1)
    }
  },
  [RootMutations.REMOVE_ALLTAGS](state, tag) {
    state.tags = state.tags?.filter(res => res.name == tag.name)
  },
  [RootMutations.SET_NAV](state, type) {
    state.config.nav = type
  },
  [RootMutations.SET_DATDARK](state, type) {
    state.config.dayDark = type
  },
  [RootMutations.SET_LANG](state, type) {
    state.config.lang = type
  },
  [RootMutations.SET_TOKEN](state, token) {
    state.token = token
    setToken(token)
  },
  [RootMutations.SET_LOGININFO](state, userInfo) {
    state.loginInfo = userInfo
    setLoginIfo(userInfo)
  },
  [RootMutations.SET_REFRESHTOKEN](state, token) {
    state.refreshToken = token
    setRefreshToken(token)
  },
  [RootMutations.SET_MENULIST](state, menu) {
    state.menuList = menu
    setMenuList(menu)
  },
}

export default mutations
