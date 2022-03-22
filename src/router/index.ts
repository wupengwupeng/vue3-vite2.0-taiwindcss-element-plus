import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import nProgress from "nprogress"

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        redirect: '/menuTwo',
        meta: {
          isShow: false
        }
      },
      {
        path: '/test',
        meta: {
          title: '测试页面一',
          isShow: true,
          iconName: 'fn-shezhiq',
        },
        component: () => import('@/views/testTwo/index.vue')
      },
      {
        path: '/menuTwo',
        meta: {
          title: '主页',
          isShow: true,
          iconName: 'fn-pen',
        },
        component: () => import('@/views/test/index.vue')
      },
      {
        path: '/menuThree',
        meta: {
          title: 'buttons',
          isShow: true,
          iconName: 'fn-shezhiq',
        },
        component: () => import('@/views/threes/index.vue')
      },
      {
        path: '/logicFlow',
        meta: {
          title: '流程图',
          isShow: true,
          iconName: 'fn-pen',
        },
        component: () => import('@/views/flowTest/index.vue')
      },
      {
        path: '/scroll',
        meta: {
          title: '滚动',
          isShow: true,
          iconName: 'fn-pen',
        },
        component: () => import('@/views/scroll/index.vue')
      },
      {
        path: '/selectDown',
        meta: {
          title: '下拉树形选择',
          isShow: true,
          iconName: 'fn-pen',
        },
        component: () => import('@/views/selectDown/index.vue')
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
router.beforeEach((from, to, next) => {
  nProgress.start() && next()
});

router.afterEach(() => nProgress.done());

export default router;