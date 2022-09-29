import { nextTick } from 'vue'
import { setTheme, getTheme } from '@/utils/storage/index'
import { RouteRecordRaw } from 'vue-router'
import printJS from 'print-js' // TODO
import type { App, Plugin } from 'vue'
import { shadeBgColor, writeNewStyle, createNewStyle } from '@/utils/theme/index'

interface deviceInter {
  match: Fn
}

const modules = import.meta.globEager('./modules/*.ts')
const newObj: any = {}
for (const key in modules) {
  for (const inKes in modules[key]) {
    if (!newObj.hasOwnProperty(inKes)) {
      newObj[inKes] = modules[key][inKes]
    }
  }
}

type StringNumber = string | number
export const mix = (color1: string, color2: string, weight: StringNumber) => {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  let r1 = parseInt(color1.substring(1, 3), 16)
  let g1 = parseInt(color1.substring(3, 5), 16)
  let b1 = parseInt(color1.substring(5, 7), 16)
  let r2 = parseInt(color2.substring(1, 3), 16)
  let g2 = parseInt(color2.substring(3, 5), 16)
  let b2 = parseInt(color2.substring(5, 7), 16)
  let r: StringNumber = Math.round(r1 * (1 - weight) + r2 * weight)
  let g: StringNumber = Math.round(g1 * (1 - weight) + g2 * weight)
  let b: StringNumber = Math.round(b1 * (1 - weight) + b2 * weight)
  r = ('0' + (r || 0).toString(16)).slice(-2)
  g = ('0' + (g || 0).toString(16)).slice(-2)
  b = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + r + g + b
}

// 改变主题 TODO
export function changeTheme(color: string) {
  writeNewStyle(createNewStyle(color))
  const body = document.documentElement
  setTheme(color)
  body.style.setProperty('--el-color-primary-active', shadeBgColor(color))
}
// 暗黑主题
export function darkTheme(isDark, theme?: string) {
  const color = theme || getTheme()
  const node = document.documentElement
  // 变量前缀
  const pre = '--el-color-primary'
  // 黑色混合色
  const mixBlackOrWhite = isDark ? '#000000' : '#ffffff'
  node.style.setProperty(pre, color)
  node.style.setProperty('--el-color-primary-active', shadeBgColor(color))
  // 暗色模式的遮罩层
  for (let i = 1; i < 10; i += 1) {
    node.style.setProperty(`${pre}-light-${i}`, mix(color, mixBlackOrWhite, i * 0.1))
  }
}
// Return newRoutes
export function setRoutes(routes: RouteRecordRaw[]) {
  // 去除errorpage
  const newRoutess: RouteRecordRaw[] = [routes[0]]
  const newRoutes = newRoutess
    .map((res: RouteRecordRaw) => {
      return res.children?.filter((item: any) => Boolean(item.meta.isShow))
    })
    .flat(1)
  return newRoutes
}

type TreeListRow = {
  id?: string
  pid?: string
  name?: string
  url?: string
  icon?: string
  children?: Array<TreeListRow>
}
// tree to list
export function treeToList(tree: Array<TreeListRow | any>) {
  const newTree: TreeListRow[] = tree.concat([])
  const data = []
  while (newTree.length !== 0) {
    let shift = <TreeListRow>newTree.pop() // stack.pop()
    data.unshift(shift)
    let children = shift['children']
    if (children) {
      for (let i = 0; i < children.length; i++) {
        newTree.unshift(children[i])
      }
    }
  }
  return data
}

type ListRow = {
  id?: string
  pid?: string
  name?: string
  url?: string
  children?: ListRow[]
}
type TagsProps = {
  [propName: string]: Array<ListRow>
}
// list to tree
// pid = 0 为起始节点
export function getTrees(list: ListRow[], parentId = '0', pKey = 'pid', cKey = 'id') {
  let items: TagsProps = {}
  // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
  for (let i = 0; i < list.length; i++) {
    let key: string = (list[i] as any)[pKey]
    if (items[key]) {
      items[key].push(list[i])
    } else {
      items[key] = []
      items[key].push(list[i])
    }
  }
  return formatTree(items, parentId, cKey)
}

// 利用递归格式化每个节点
export function formatTree(items: ListRow, parentId: string, cKey: string) {
  let result: any[] = []
  if (!(items as any)[parentId]) {
    return result
  }
  for (let t of (items as any)[parentId]) {
    const temp = formatTree(items, t[cKey], cKey)
    if (temp.length > 0) {
      t.children = temp
    }
    result.push(t)
  }
  return result
}

// 判断设备是是移动端还是PC端
export function isMobile(): boolean {
  const { body }: Document = document
  const WIDTH: number = 1024
  const RATIO: number = 3
  const rect = body.getBoundingClientRect() as DOMRect
  return rect.width - RATIO < WIDTH
}
// 检测设备类型(手机返回true,反之)
export const deviceDetection = () => {
  const sUserAgent: deviceInter = navigator.userAgent.toLowerCase()
  // const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
  const bIsMidp = sUserAgent.match(/midp/i) == 'midp'
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
  const bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
  const bIsAndroid = sUserAgent.match(/android/i) == 'android'
  const bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
  const bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
  return bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM
}

// print-js
export function printJs({ ...org }) {
  return printJS({ ...org })
}

/**
 * Convert an Array-like object to a real Array.
 */
export function toArray(list: any[], start = 0) {
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    // eslint-disable-line no-plusplus
    ret[i] = list[i + start]
  }
  return ret
}

// 对vue进行类型补充说明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    addSum: any
  }
}

const methd: any = {
  mix,
  changeTheme,
  setRoutes,
  treeToList,
  getTrees,
  formatTree,
  isMobile,
  printJs,
  ...newObj,
}

export const install = {
  install: function (Vue: App, options: any) {
    Object.keys(methd).forEach((res: any) => {
      Vue.config.globalProperties[res] = methd[res]
    })
  },
}
export default {
  ...methd,
}
