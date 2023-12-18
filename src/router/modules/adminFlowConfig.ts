const Layout = () => import('@/layout/index.vue')

const flowConfig = {
  path: '/admin',
  component: Layout,
  redirect: '/admin/formManage',
  meta: {
    icon: 'fn-tuodon',
    title: '流程配置',
    i18n: false,
    rank: 14,
  },
  children: [
    {
      path: '/admin/formManage',
      name: 'FormManage',
      component: () => import('@/views/admin/formManage/index.vue'),
      meta: {
        title: '表单配置',
        i18n: false,
        icon: 'fn-tuodon',
      },
    },
  ],
}

export default flowConfig
