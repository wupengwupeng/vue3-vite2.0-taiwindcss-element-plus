import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import nProgress from "nprogress"
import errorRouter from './errorRouter'
import { routes as defaultRoutes } from './modules/index'
export const routes: Array<RouteRecordRaw> = [
  ...defaultRoutes,
  ...errorRouter,
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
  routes,
})
router.beforeEach((from, to, next) => {
  nProgress.start() && next()
  // 判断是否登录

});

router.afterEach(() => nProgress.done());

export default router;