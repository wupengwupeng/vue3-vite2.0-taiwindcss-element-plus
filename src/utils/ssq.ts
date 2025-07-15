/*
 * 双色球统计工具 + 智能选号策略校验
 * --------------------------------------------------
 * 用于 Vue3 / Element‑Plus 前端的智能选号器功能。
 */

export interface Draw {
  id: string | number
  date: Date
  reds: number[]
  blue: number
}

export interface Stats {
  hotCold: HotCold
  oddEven: {
    distribution: OddEvenDistribution
    latest: {
      odd: number
      even: number
    }
  }
  interval: {
    distribution: IntervalDistribution
    latest: [number, number, number]
  }
  blueFreq: BlueFrequency
}

export interface HotCold {
  hot: number[]
  warm: number[]
  cold: number[]
}

export interface OddEvenDistribution {
  [ratio: string]: number
}

export interface IntervalDistribution {
  [pattern: string]: number
}

export interface BlueFrequency {
  freq: number[]
}

export function calcAllStats(
  history: Draw[],
  options?: {
    hotWindow?: number
    oddEvenWindow?: number
    intervalWindow?: number
    blueWindow?: number
    hotThresh?: number
    warmThresh?: number
  }
): Stats {
  if (!history?.length) {
    throw new Error('history is empty')
  }
  const { hotWindow = 30, oddEvenWindow = 200, intervalWindow = 200, blueWindow = 30, hotThresh = 4, warmThresh = 2 } = options || {}

  const hotCold = classifyHotCold(history, hotWindow, hotThresh, warmThresh)
  const oddEven = oddEvenStats(history, oddEvenWindow)
  const interval = intervalStats(history, intervalWindow)
  const blueFreq = blueFrequency(history, blueWindow)

  return { hotCold, oddEven, interval, blueFreq }
}

function classifyHotCold(history: Draw[], window: number, hotThresh: number, warmThresh: number): HotCold {
  const freq = Array<number>(34).fill(0)
  history.slice(0, window).forEach(d => {
    d.reds.forEach(n => {
      if (n >= 1 && n <= 33) freq[n] += 1
    })
  })
  const hot: number[] = [],
    warm: number[] = [],
    cold: number[] = []
  for (let n = 1; n <= 33; n++) {
    const c = freq[n]
    if (c >= hotThresh) hot.push(n)
    else if (c >= warmThresh) warm.push(n)
    else cold.push(n)
  }
  return { hot, warm, cold }
}

function oddEvenStats(
  history: Draw[],
  window: number
): {
  distribution: OddEvenDistribution
  latest: { odd: number; even: number }
} {
  const distribution: OddEvenDistribution = {}
  history.slice(0, window).forEach(d => {
    const oddCnt = d.reds.filter(n => n % 2 === 1).length
    const evenCnt = 6 - oddCnt
    const key = `${oddCnt}:${evenCnt}`
    distribution[key] = (distribution[key] || 0) + 1
  })
  const latest = history[0]
  const latestOdd = latest.reds.filter(n => n % 2 === 1).length
  return {
    distribution,
    latest: { odd: latestOdd, even: 6 - latestOdd },
  }
}

function intervalStats(
  history: Draw[],
  window: number
): {
  distribution: IntervalDistribution
  latest: [number, number, number]
} {
  const distribution: IntervalDistribution = {}
  history.slice(0, window).forEach(d => {
    const counts = countIntervals(d.reds)
    const key = counts.join('-')
    distribution[key] = (distribution[key] || 0) + 1
  })
  return {
    distribution,
    latest: countIntervals(history[0].reds),
  }
}

function countIntervals(reds: number[]): [number, number, number] {
  const counts: [number, number, number] = [0, 0, 0]
  reds.forEach(n => {
    if (n <= 11) counts[0]++
    else if (n <= 22) counts[1]++
    else counts[2]++
  })
  return counts
}

function blueFrequency(history: Draw[], window: number): BlueFrequency {
  const freq = Array<number>(17).fill(0)
  history.slice(0, window).forEach(d => {
    if (d.blue >= 1 && d.blue <= 16) freq[d.blue] += 1
  })
  return { freq }
}

/* ========== 智能选号策略校验器 ========== */

export function validateRedStrategy(reds: number[]): string[] {
  const errors: string[] = []
  if (reds.length !== 6) {
    errors.push('红球数量必须为 6 个')
    return errors
  }
  // 奇偶
  const odd = reds.filter(n => n % 2 === 1).length
  if (odd < 2 || odd > 4) {
    errors.push(`奇偶比偏离，当前 ${odd}:${6 - odd}`)
  }
  // 区间分布
  const [a, b, c] = countIntervals(reds)
  const total = [a, b, c].join('-')
  if (total !== '2-2-2' && total !== '3-2-1' && total !== '3-1-2') {
    errors.push(`区间分布异常：${total}`)
  }
  // 连号
  const sorted = [...reds].sort((a, b) => a - b)
  let lian = 0
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] + 1) lian++
  }
  if (lian > 2) errors.push(`连号过多：${lian} 组`)
  // 同尾
  const tails = sorted.map(n => n % 10)
  const repeatTails = new Set(tails.filter((t, i, arr) => arr.indexOf(t) !== i))
  if (repeatTails.size > 2) errors.push(`同尾号过多：${[...repeatTails].join(',')}`)

  return errors
}

export function validateBlueStrategy(blue: number): string[] {
  const errors: string[] = []
  if (blue < 1 || blue > 16) {
    errors.push('蓝球超出范围')
    return errors
  }
  if (blue % 2 === 0) {
    errors.push('蓝球为偶数，可考虑奇数策略')
  }
  if (blue <= 8) {
    errors.push('蓝球为小号，可考虑大小互换')
  }
  return errors
}
