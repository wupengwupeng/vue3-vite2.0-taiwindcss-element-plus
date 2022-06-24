import { App } from 'vue'
import CustomInput from './index.vue'

export default {
  install(Vue: App) {
    Vue.component(CustomInput.name, CustomInput)
  }
}