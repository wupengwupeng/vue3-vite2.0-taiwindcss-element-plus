const Layout = () => import("@/layout/index.vue");

const homeRouter = {
  path: "/",
  component: Layout,
  redirect: "/home",
  meta: {
    icon: "fn-tuodon",
    title: "主页",
    i18n: false,
    rank: 14
  },
  children: [
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/home/index.vue"),
      meta: {
        title: "主页",
        i18n: false,
        icon: "fn-tuodon"
      },
    },
  ]
};

export default homeRouter;
