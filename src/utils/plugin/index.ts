import { getCurrentInstance, App, provide } from 'vue'
import { createElementPlus } from './element'
//设置组件的命名
const installSetComponetNamefun = {
  install(app: any, optons: any) {
    function setComponentName(name: string) {
      const instance: any = getCurrentInstance()
      instance!.type!.name = name
    }
    app.provide('setComponentName', setComponentName)
  },
}
export default {
  installSetComponetNamefun,
  createElementPlus,
}
