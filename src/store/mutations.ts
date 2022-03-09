import { setTheme } from '@/utils/storage'
import type { MutationTree } from 'vuex'
import type { RootState } from './type'
import { RootMutations } from './type'
import { changeTheme } from '@/utils/index'
const mutations: MutationTree<RootState> = {
  [RootMutations.SET_THEME](state, theme: string) {
    state.theme = theme
    setTheme(theme)
    changeTheme(theme)
  }
}

export default mutations
