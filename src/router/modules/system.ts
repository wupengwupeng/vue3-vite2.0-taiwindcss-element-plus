const Layout = () => import("@/layout/index.vue");

const systemRouter = {
  path: "/system",
  component: Layout,
  redirect: "/system/user",
  meta: {
    icon: "fn-pen",
    title: "系统管理",
    i18n: false,
    rank: 14
  },
  children: [
    {
      path: "/system/user",
      name: "User",
      component: () => import("@/views/system/user/index.vue"),
      meta: {
        title: "用户管理",
        i18n: false,
        icon: "fn-shezhiq"
      }
    },
    {
      path: "/system/menu",
      name: "Menus", // ?menu
      redirect: "/system/menu/test",
      component: () => import("@/views/system/menu/index.vue"),
      meta: {
        title: "菜单管理",
        i18n: false,
        icon: "fn-shezhiq"
      },
      children: [
        {
          path: "/system/menu/test",
          name: "Test",
          component: () => import("@/views/system/menu/index.vue"),
          meta: {
            title: "三级菜单1",
            i18n: false,
            icon: "fn-shezhiq"
          },
        },
        {
          path: "/system/menu/name",
          name: "Name",
          component: () => import("@/views/system/menu/index.vue"),
          meta: {
            title: "三级菜单2",
            i18n: false,
            icon: "fn-shezhiq"
          },
        }
      ]
    }
  ]
};

export default systemRouter;
