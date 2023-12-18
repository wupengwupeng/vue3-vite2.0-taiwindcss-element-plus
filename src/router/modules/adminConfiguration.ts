const Layout = () => import('@/layout/index.vue')

const bgconfig = {
  path: '/bgconfig',
  component: Layout,
  redirect: '/bgconfig/organization',
  meta: {
    icon: 'fn-tuodon',
    title: '后台配置',
    i18n: false,
    rank: 14,
  },
  children: [
    {
      path: '/bgconfig/organization',
      name: 'Organization',
      component: () => import('@/views/admin/organization/index.vue'),
      meta: {
        title: '机构管理',
        i18n: false,
        icon: 'fn-tuodon',
      },
    },
    {
      path: '/bgconfig/menuManage',
      name: 'MenuManage',
      component: () => import('@/views/admin/menuManage/index.vue'),
      meta: {
        title: '菜单接口',
        i18n: false,
        icon: 'fn-tuodon',
      },
    },
  ],
}

export default bgconfig
