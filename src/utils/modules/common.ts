import { RouteComponent, RouteRecordRaw } from 'vue-router'
// 数组去重(基本类型的数组，或者对象数组)
export function unique(list: any[], key?: any) {
  if (!Array.isArray(list)) new Error('请输入一个正确的数组！！')
  if (key === undefined) return [...new Set(list)]
  // 方法一
  // const map: any = {
  //   'string': (e: any) => e[key],
  //   'function': (e: any) => key(e),
  // }
  // const fn = map[typeof key] as any
  // const obj = list.reduce((o, e) => (o[fn(e)] = e, o), {})
  // return Object.values(obj)
  // 方法二
  // const obj: any = {}
  // const arr: any = []
  // list.forEach(res => {
  //   obj[res[key]] ? '' : obj[res[key]] = true && arr.push(res)
  // })
  // return arr
  // 方法三 推荐
  const obj: any = {}
  return list.reduce((pre, cur) => {
    obj[cur[key]] ? '' : (obj[cur[key]] = true && pre.push(cur))
    return pre
  }, [])
}

// 数组进行分组 根据property(某个属性)进行分组
export function groupArr(arr: Array<any>, property: string) {
  return arr.reduce((pre, cur) => {
    let key = cur[property]
    if (!pre[key]) {
      pre[key] = []
    }
    pre[key].push(cur)
    return pre
  }, {})
}

// 数组进行分组
export function groupArrAuth(list: Array<any>, property: string) {
  const obj: any = {}
  list.forEach((res: any) => {
    if (obj.hasOwnProperty(property)) {
      obj[property].push(res)
    } else {
      obj[property] = [res]
    }
  })
}

// 判断是否是空对象
export function isEmportyObject(obj: any): boolean {
  if (!obj) return true
  return !Object.keys(obj).length
}

// 防抖 -- 多次触发最后只触发一次，会重新开始计算时间
/**
 * 防抖
 * @param func 执行方法
 * @param wait 延时
 * @param that 执行上下文
 * @param immediate 是否立即执行
 */
export function debounce(func: any, wait: any, that?: any, immediate?: boolean) {
  let timeout: any, params: any, context: any, timestamp: any, result: any

  context = that

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      // 大于就执行
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, params)
        if (!timeout) context = params = null
      }
    }
  }
  return function (...args: any) {
    // context = this;
    params = args
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // console.log(timeout, "timeout")
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 节流 函数多次触发，按照一定的时间间隔执行 在一定的时间内，限制一个动作只执行一次。

/**
 * 节流
 * @param fn 执行函数
 * @param gapTime 间隔事件
 */
export function throttle(fn: any, gapTime: number) {
  let _lastTime: any = 0
  return function (...arg: any) {
    const _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || _lastTime === 0) {
      fn(arg)
      _lastTime = _nowTime
    }
  }
}

// 函数柯里化效果
export function currying(fn: any) {
  var slice = Array.prototype.slice,
    __args = slice.call(arguments, 1)
  return function () {
    var __inargs = slice.call(arguments)
    return fn.apply(null, __args.concat(__inargs))
  }
}

// 类数组转数组
export function toArray(arg: any) {
  try {
    return Array.prototype.slice.call(arg)
  } catch (error) {
    const arr = []
    for (let i = 0, len = arg.length; i < len; i++) {
      arr[i] = arg[i]
    }
    return arr
  }
}

/**
 * 解决JSON.stringify和JSON.parse不能转换RegExp的问题
 * @author gqk
 * @see JSON.parse();JSON.stringify()
 */

/**
 * json字符串转json对象
 * @param { String } jsonStr json字符串
 */
export function parseJson(jsonStr: string) {
  return JSON.parse(jsonStr, (k, v) => {
    try {
      // 将正则字符串转成正则对象
      if (eval(v) instanceof RegExp) {
        return eval(v)
      }
    } catch (e) {
      // nothing
    }

    return v
  })
}

/**
 * json对象转json字符串
 * @param { Object } json json对象
 */
export function stringifyJson(json: { [key: string]: any }) {
  return JSON.stringify(json, (k, v) => {
    // 将正则对象转换为正则字符串
    if (v instanceof RegExp) {
      return v.toString()
    }

    return v
  })
}

// 过滤meta中isAuth为false的路由
export function filterTree(data: RouteComponent[]) {
  const newTree = data.filter((v: { meta: { isAuth: boolean } }) => v.meta?.isAuth !== false)
  newTree.forEach((v: { children }) => v.children && (v.children = filterTree(v.children)))
  return newTree
}

// 通过path获取父级路径
export function getParentPaths(path: string, routes: RouteRecordRaw[]) {
  // 深度遍历查找
  function dfs(routes: RouteRecordRaw[], path: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i]
      // 找到path则返回父级path
      if (item.path === path) return parents
      // children不存在或为空则不递归
      if (!item.children || !item.children.length) continue
      // 往下查找时将当前path入栈
      parents.push(item.path)

      if (dfs(item.children, path, parents).length) return parents
      // 深度遍历查找未找到时当前path 出栈
      parents.pop()
    }
    // 未找到时返回空数组
    return []
  }

  return dfs(routes, path, [])
}

// 查找对应path的路由信息
export function findRouteByPath(path: string, routes: RouteRecordRaw[]) {
  let res = routes.find((item: { path: string }) => item.path == path)
  if (res) {
    return res
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].children instanceof Array && routes[i].children.length > 0) {
        res = findRouteByPath(path, routes[i].children)
        if (res) {
          return res
        }
      }
    }
    return null
  }
}
