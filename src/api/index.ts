// const modules = import.meta.globEager('./*.ts')
// type Page = 'task' | 'tastTwo'
// console.log(modules, "modules")
// const reg = new RegExp(/^.\/(\w+).ts/, 'ig')
// type TypeObj<T> = {
//   [key in keyof T]: T[key]
// }

// const obj: TypeObj<typeof modules> = {}
// function callBackKey(match: string, p1: string) {
//   return p1
// }
// for (const key in modules) {
//   const keyName = key.replace(reg, callBackKey)
//   if (!Object.prototype.hasOwnProperty.call(obj, keyName)) {
//     obj[keyName] = modules[key].default
//   }
// }
import task from './task'
import tastTwo from './tastTwo'
const api = {
  task,
  tastTwo,
}
console.log(api, "api")
export default api