import { createApp } from "vue";
import App from "./App.vue";
import router from '@/router/index'
import "~/styles/index.scss";
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入


const app = createApp(App);
app.use(router).mount("#app");
