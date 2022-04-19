import { createApp } from "vue";
import App from "./App.vue";
import router from '@/router/index'
import { store, key } from '@/store/index'
import mitt from 'mitt'
import 'virtual:svg-icons-register'
import "~/styles/index.scss";
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
import { install } from '@/utils' // 注册全局方法

const app = createApp(App);

app.config.globalProperties.$myBus = mitt()
app.use(router).use(store, key).use(install).mount("#app");
