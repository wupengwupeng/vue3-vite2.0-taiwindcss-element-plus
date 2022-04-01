/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "nprogress" {
  import nProgresss from "nprogress";
  const progree: any;
  export default progree
}
declare module "vue3-treeselect" {
  import selectTree from ' vue3-treeselect'
  const selectVue3: any;
  export default selectTree
}

declare module "print-js" {
  import printJS from 'print-js'
  const print: any;
  export default print
}




