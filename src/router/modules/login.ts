const homeRouter = {
  path: '/',
  redirect: '/login',
  meta: {
    icon: 'fn-tuodon',
    title: '登录',
    i18n: false,
    rank: 14,
  },
  children: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        icon: 'fn-tuodon',
        title: '登录',
        i18n: false,
        rank: 15,
      },
    },
  ],
}

export default homeRouter
