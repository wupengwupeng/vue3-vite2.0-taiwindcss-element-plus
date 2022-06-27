
import { getCurrentInstance, App, provide } from "vue"

//设置组件的命名
export default {
  install(app: any, optons: any) {
    function setComponentName(name: string) {
      const instance: any = getCurrentInstance()
      instance!.type!.name = name
    }
    app.provide('setComponentName', setComponentName)
  }
}