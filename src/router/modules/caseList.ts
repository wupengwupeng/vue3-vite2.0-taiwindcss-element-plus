const Layout = () => import('@/layout/index.vue')

const homeRouter = {
  path: '/staff',
  component: Layout,
  redirect: 'staff/general/caselist',
  meta: {
    icon: 'fn-tuodon',
    title: '案件列表',
    i18n: false,
    rank: 14,
  },
  children: [
    {
      path: '/staff/general/caselist',
      name: 'CaseGeneralList',
      component: () => import('@/views/components/tableMerge/index.vue'),
      meta: {
        title: '普通案件',
        i18n: false,
        icon: 'fn-tuodon',
      },
    },
    {
      path: '/staff/merge/list',
      name: 'CaseList1',
      component: () => import('@/views/components/tableMerge/index.vue'),
      meta: {
        title: '合并审理案件',
        i18n: false,
        icon: 'fn-tuodon',
      },
    },
    {
      path: '/staff/migration/list',
      name: 'CaseList2',
      component: () => import('@/views/components/editWang/index.vue'),
      meta: {
        title: '老系统迁移案件',
        i18n: false,
        icon: 'fn-tuodon',
      },
    },
  ],
}

export default homeRouter
