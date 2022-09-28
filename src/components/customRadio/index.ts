import { App } from 'vue'
import CustomRadio from './index.vue'

export default {
  install(Vue: App) {
    Vue.component(CustomRadio.name, CustomRadio)
  },
}
