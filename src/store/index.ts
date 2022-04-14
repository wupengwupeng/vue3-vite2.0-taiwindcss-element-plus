import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { createStore, useStore as baseUseStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import { RootState } from './type'
import { getTheme } from '@/utils/storage'
import { test } from '@/store/modules/test/index'
import { changeTheme, setRoutes } from '@/utils/index'
import { routes } from '@/router'
// Default topic
const defaultColor = '#0780F1'
// Init topic
let theme: string = getTheme() || defaultColor // It may be an empty string or not in an existing topic
if (theme) changeTheme(theme)

export function getDefaultRootState() {
  const state: RootState = {
    name: '',
    theme,
    routes: setRoutes(routes),
    tags: []
  } as any
  return state
}
const state = getDefaultRootState()
export const store = createStore({
  strict: true,
  state,
  getters,
  mutations,
  modules: {
    test
  }
})
export const key: InjectionKey<Store<RootState>> = Symbol()

export function useStore() {
  return baseUseStore(key)
}
