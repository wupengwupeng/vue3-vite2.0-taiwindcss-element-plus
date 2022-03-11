import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LayOut from '@/layout/index.vue'
import nProgress from "nprogress"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LayOut,
    children: [
      {
        path: '',
        redirect: '/menuTwo',
      },
      {
        path: '/test',
        component: () => import('@/views/testTwo/index.vue')
      },
      {
        path: '/menuTwo',
        component: () => import('@/views/test/index.vue')
      },
      {
        path: '/menuThree',
        component: () => import('@/views/threes/index.vue')
      }

    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
  routes,
})

router.beforeEach((from, to, next) => nProgress.start() && next());

router.afterEach(() => nProgress.done());

export default router;