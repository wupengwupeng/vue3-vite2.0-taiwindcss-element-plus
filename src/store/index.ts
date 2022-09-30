import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { createStore, useStore as baseUseStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import { RootState } from './type'
import { getNav, getDayDark, getLang } from '@/utils/storage'
import { test } from '@/store/modules/test/index'
import { changeTheme, darkTheme } from '@/utils/index'
import { defaultTheme, isDark } from '@/utils/config/index'

if (defaultTheme) {
  darkTheme(isDark.value, defaultTheme)
  changeTheme(defaultTheme)
}

export function getDefaultRootState() {
  const state: RootState = {
    name: '',
    theme: defaultTheme,
    routes: [],
    tags: [],
    config: {
      nav: getNav() || '1', // 导航条类型 1竖屏2横屏
      dayDark: getDayDark() || '1',
      lang: getLang() || 'zh-CN', // 中英文切换
    },
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
    test,
  },
})
export const key: InjectionKey<Store<RootState>> = Symbol()

export function useStore() {
  return baseUseStore(key)
}
