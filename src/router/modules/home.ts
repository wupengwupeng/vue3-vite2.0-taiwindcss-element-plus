const Layout = () => import('@/layout/index.vue')

const homeRouter = {
  path: '/staff',
  component: Layout,
  redirect: '/staff/watiList',
  meta: {
    icon: 'fn-tuodon',
    title: '待办事项',
    i18n: false,
    rank: 14,
  },
  children: [
    {
      path: '/staff/watiList',
      name: 'Home',
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
