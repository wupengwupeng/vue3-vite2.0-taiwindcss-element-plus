import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import nProgress from "nprogress"
import { setRoutes } from '@/utils/storage/index'
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
          title: '测试页面三',
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
      }, {
        path: '/WUPENG',
        meta: {
          title: 'ADF',
          isShow: true,
          iconName: 'fn-pen',
        },
        component: () => import('@/views/flowTest/index.vue')
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
  setRoutes(routes)
  nProgress.start() && next()

});

router.afterEach(() => nProgress.done());

export default router;