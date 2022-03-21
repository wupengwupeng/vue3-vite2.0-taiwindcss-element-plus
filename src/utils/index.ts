import { setTheme } from '@/utils/storage/index'
import { RouteRecordRaw } from 'vue-router'




type StringNumber = string | number
export const mix = (color1: string, color2: string, weight: StringNumber) => {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  let r1 = parseInt(color1.substring(1, 3), 16);
  let g1 = parseInt(color1.substring(3, 5), 16);
  let b1 = parseInt(color1.substring(5, 7), 16);
  let r2 = parseInt(color2.substring(1, 3), 16);
  let g2 = parseInt(color2.substring(3, 5), 16);
  let b2 = parseInt(color2.substring(5, 7), 16);
  let r: StringNumber = Math.round(r1 * (1 - weight) + r2 * weight);
  let g: StringNumber = Math.round(g1 * (1 - weight) + g2 * weight);
  let b: StringNumber = Math.round(b1 * (1 - weight) + b2 * weight);
  r = ("0" + (r || 0).toString(16)).slice(-2);
  g = ("0" + (g || 0).toString(16)).slice(-2);
  b = ("0" + (b || 0).toString(16)).slice(-2);
  return "#" + r + g + b;
};


// 改变主题
export function changeTheme(color: string) {
  const node = document.documentElement
  // 变量前缀
  const pre = '--el-color-primary'
  // 白色混合色
  const mixWhite = '#ffffff'
  // 黑色混合色
  const mixBlack = '#000000'
  node.style.setProperty(pre, color)
  setTheme(color)
  node.style.setProperty('--el-color-paimary', color)
  // 这里是覆盖原有颜色的核心代码
  for (let i = 1; i < 10; i += 1) {
    node.style.setProperty(`${pre}-light-${i}`, mix(color, mixWhite, i * 0.1))
    node.style.setProperty(`--el-color-primary-dark-${i}`, mix(color, mixBlack, 0.1))
  }
}
// Return newRoutes
export function setRoutes(routes: RouteRecordRaw[]) {
  const newRoutes = routes.map((res: RouteRecordRaw) => {
    return res.children?.filter((item: any) => Boolean(item.meta.isShow))
  }).flat(1)
  return newRoutes
}



