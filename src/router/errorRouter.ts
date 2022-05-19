export default [
  {
    path: '/401',
    component: () => import('@/views/errorPage/401.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
  },
  {
    path: '/500',
    component: () => import('@/views/errorPage/500.vue'),
  },
]