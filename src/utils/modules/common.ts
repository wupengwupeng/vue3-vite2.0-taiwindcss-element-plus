

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
export function debounce(func: any, wait: any, that: any, immediate: boolean) {
  let timeout: any, params: any, context: any, timestamp: any, result: any;

  context = that;

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, params);
        if (!timeout) context = params = null;
      }
    }
  };
  return function (...args: any) {
    // context = this;
    params = args;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // console.log(timeout, "timeout")
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}



// 节流 函数多次触发，按照一定的时间间隔执行 在一定的时间内，限制一个动作只执行一次。

/**
 * 节流
 * @param fn 执行函数
 * @param gapTime 间隔事件
 */
export function throttle(fn: any, gapTime: number) {
  let _lastTime: any = 0;
  return function (...arg: any) {
    const _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || _lastTime === 0) {
      fn(arg);
      _lastTime = _nowTime;
    }
  };
}

// 函数柯里化效果
export function currying(fn: any) {
  var slice = Array.prototype.slice,
    __args = slice.call(arguments, 1);
  return function () {
    var __inargs = slice.call(arguments);
    return fn.apply(null, __args.concat(__inargs));
  };
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









