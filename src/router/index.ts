import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import nProgress from "nprogress"
import errorRouter from './errorRouter'

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
      },
      {
        path: '/editWang',
        meta: {
          title: '编辑器',
          isShow: true,
          iconName: 'fn-shezhiq',
        },
        component: () => import('@/views/editWang/index.vue')
      },
      {
        path: '/table',
        meta: {
          title: '表格',
          isShow: true,
          iconName: 'fn-shezhiq'
        },
        component: () => import('@/views/table/index.vue')
      },
      {
        path: '/amap',
        meta: {
          title: '地图',
          isShow: true,
          iconName: 'fn-shezhiq'
        },
        component: () => import('@/views/map/index.vue')
      },
      {
        path: '/test2',
        meta: {
          title: 'ces',
          isShow: true,
          iconName: 'fn-shezhiq'
        },
        component: () => import('@/views/testTwo/index.vue')
      },
      {
        path: '/virtualList',
        meta: {
          title: '虚拟滚动',
          isShow: true,
          iconName: 'fn-shezhiq'
        },
        component: () => import('@/views/virtualList/index.vue')
      },
      {
        path: '/virtualListVue',
        meta: {
          title: '虚拟滚动vueuse',
          isShow: true,
          iconName: 'fn-shezhiq'
        },
        component: () => import('@/views/vueuseVirtualList/index.vue')
      },
      {
        path: '/doubbleColor',
        meta: {
          isShow: true,
          title: '双色球模拟',
          iconName: 'fn-shezhiq',
        },
        component: () => import('@/views/doubbleColor/index.vue')
      }
    ]
  },
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
});

router.afterEach(() => nProgress.done());

export default router;