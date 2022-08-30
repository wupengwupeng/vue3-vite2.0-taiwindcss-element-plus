import { createApp, Directive, nextTick } from "vue";
import App from "./App.vue";
import router from '@/router/index'
import { store, key } from '@/store/index'

// eventBus
import mitt from 'mitt'
import 'virtual:svg-icons-register'
import "~/styles/index.scss";
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
// import { install } from '@/utils' // 注册全局方法
// import { installAllComponents } from '@/components/index'
// import plugin from '@/utils/plugin'
import * as directives from './directives/index'



const app = createApp(App)
// 注册element plus
// plugin.createElementPlus(app, { isAll: false })
app.use(router).use(store, key).mount("#app");
// 自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})
app.config.globalProperties.$myBus = mitt()



