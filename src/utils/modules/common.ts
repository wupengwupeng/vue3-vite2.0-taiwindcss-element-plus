

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
    obj[cur[key]] ? '' : obj[cur[key]] = true && pre.push(cur)
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







