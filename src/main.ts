import { createApp, Directive, nextTick } from 'vue'
import App from './App.vue'
import i18n from './locales/index'
import router from '@/router/index'
import { store, key } from '@/store/index'

// eventBus
import mitt from 'mitt'
import 'virtual:svg-icons-register'
import '~/styles/index.scss'
import 'nprogress/nprogress.css'
import 'driver.js/dist/driver.min.css'
import { createElementPlus } from '@/utils/plugin/element'
import directives from './directives/index'

const app = createApp(App)
createElementPlus(app, { isAll: true })
app.use(router).use(i18n).use(store, key).use(directives).mount('#app')
app.config.globalProperties.$myBus = mitt()
