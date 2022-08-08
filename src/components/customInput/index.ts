import { App } from 'vue'
import CustomInput from './index.vue'
import onlyNumber from '@/directives/onlyNumber'
export default {
  install(Vue: App) {
    Vue.component(CustomInput.name, CustomInput)
    Vue.use(onlyNumber)
  }
}