import type { GetterTree } from 'vuex'
import type { RootState } from './type'

const getters: GetterTree<RootState, RootState> = {
  getLoginInfo(state) {
    return state.loginInfo
  },
}

export default getters
