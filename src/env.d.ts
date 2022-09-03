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

declare module "vue-3d-model" {
  import { ModelObj } from 'vue-3d-model'
  const mObj: any;
  export default mObj;
}
declare module "vue3-virtual-scroll-list" {
  import VirtualList from 'vue3-virtual-scroll-list';
  const virList: any;
  export default virList;
}

declare module "only-number-input" {
  import numberInput from 'only-number-input'
  const numb: any
  export default numb
}


declare module "css-color-function" {
  import { convert } from 'css-color-function'
  const con: any;
  export { convert };
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}




