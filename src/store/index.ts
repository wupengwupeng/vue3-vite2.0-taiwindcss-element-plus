import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { createStore, useStore as baseUseStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import { RootState } from './type'
import { getTheme } from '@/utils/storage'
import { test } from '@/store/modules/test/index'
import { changeTheme } from '@/utils/index'


// 主题默认值
const defaultColor = '#0780F1'
// 初始化主题
let theme: string = getTheme() || defaultColor // 可能为空字符串或不在已有主题里面
if (theme) changeTheme(theme)

export function getDefaultRootState() {
  const state = {
    name: '',
    theme,
  }
  return state
}
const state = getDefaultRootState()
export const key: InjectionKey<Store<RootState>> = Symbol()
export const store = createStore({
  strict: true,
  state,
  getters,
  mutations,
  modules: {
    test
  }
})
export function useStore() {
  return baseUseStore(key)
}
