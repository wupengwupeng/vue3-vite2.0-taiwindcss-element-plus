const Layout = () => import('@/layout/index.vue')

const homeRouter = {
  path: '/userpages',
  component: Layout,
  redirect: '/userpages/watiList',
  meta: {
    icon: 'fn-tuodon',
    title: '待办事项',
    i18n: false,
    rank: 14,
  },
  children: [
    {
      path: '/userpages/watiList',
      name: 'WatiList',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '待办事项',
        i18n: false,
        icon: 'fn-tuodon',
      },
    },
  ],
}

export default homeRouter
