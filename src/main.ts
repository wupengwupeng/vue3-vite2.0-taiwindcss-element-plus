import { createApp } from "vue";
import App from "./App.vue";
import router from '@/router/index'
import { store, key } from '@/store/index'
// eventBus
import mitt from 'mitt'
import 'virtual:svg-icons-register'
import "~/styles/index.scss";
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
import { install } from '@/utils' // 注册全局方法
import { installAllComponents } from '@/components/index'
import plugin from '@/utils/plugin'
const app = createApp(App);

// 注册components全局组件
installAllComponents(app)
// 注册element plus
plugin.createElementPlus(app, { isAll: false })


app.config.globalProperties.$myBus = mitt()
app.use(router).use(store, key).use(install).mount("#app");
