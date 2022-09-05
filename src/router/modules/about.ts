const Layout = () => import("@/layout/index.vue");

const aboutRouter = {
  path: "/about",
  component: Layout,
  redirect: "/about/index",
  meta: {
    icon: "fn-pen",
    title: "其他管理",
    i18n: false,
  },
  children: [
    {
      path: "/about/index",
      name: "About",
      component: () => import("@/views/other/index.vue"),
      meta: {
        title: "其他管理",
        i18n: false,
        icon: "fn-shezhiq"
      },
    },
  ]
};

export default aboutRouter;
