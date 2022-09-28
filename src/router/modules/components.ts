import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

const componentsRouter: RouteRecordRaw = {
  path: '/components',
  component: Layout,
  redirect: '/components/button',
  meta: {
    icon: 'icon-servers',
    title: '组件集合',
  },
  children: [
    {
      path: '/components/button',
      name: 'Button',
      component: () => import('@/views/components/button/index.vue'),
      meta: {
        title: '按钮',
        icon: 'more',
        isAuth: false,
      },
    },
    {
      path: '/components/animation',
      name: 'Animation',
      component: () => import('@/views/components/animation/index.vue'),
      meta: {
        title: '动画',
        icon: 'icon-settings',
      },
    },
    {
      path: '/components/flowTest',
      name: 'FlowTest',
      component: () => import('@/views/components/flowTest/index.vue'),
      meta: {
        title: '流程图',
        icon: 'icon-search-mid',
      },
    },
    {
      path: '/components/selectDown',
      name: 'SelectDown',
      component: () => import('@/views/components/selectDown/index.vue'),
      meta: {
        title: '树形下拉框',
        icon: 'icon-cloud-upload',
      },
    },
    {
      path: '/components/tableMerge',
      name: 'TableMerge',
      component: () => import('@/views/components/tableMerge/index.vue'),
      meta: {
        title: 'table合并',
        icon: 'fn-tuodon',
      },
    },
    {
      path: '/components/editWang',
      name: 'EditWang',
      component: () => import('@/views/components/editWang/index.vue'),
      meta: {
        title: '富文本',
        icon: 'fn-restart',
      },
    },
    {
      path: '/components/doubbleColor',
      name: 'DoubbleColor',
      component: () => import('@/views/components/doubbleColor/index.vue'),
      meta: {
        title: '双色球',
        icon: 'fn-email',
      },
    },
    {
      path: '/components/menu',
      name: 'Menu',
      component: () => import('@/views/components/menu/index.vue'),
      meta: {
        title: '菜单',
        icon: 'icon-apps-add',
      },
    },
    {
      path: '/components/dialog',
      name: 'Dialog',
      component: () => import('@/views/components/dialog/index.vue'),
      meta: {
        title: '侧边栏&弹框',
        icon: 'icon-apps-add',
      },
    },
    {
      path: '/components/theme',
      name: 'Theme',
      component: () => import('@/views/components/theme/index.vue'),
      meta: {
        title: 'theme主题组件',
        icon: 'fn-shezhiq',
      },
    },
    {
      path: '/components/form',
      name: 'Form',
      component: () => import('@/views/components/form/index.vue'),
      meta: {
        title: '自定义form组件',
        icon: 'icon-apps-add',
      },
    },
  ],
}

export default componentsRouter
