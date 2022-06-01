<script setup lang="ts">
import { reactive, Ref, ref, unref, onBeforeMount, toRefs, computed } from 'vue'
import { dataAll } from './data'

type BlueObj = {
  [key: string]: string[] | any
}
type Key = 'blueObj' | 'redObj' | 'newRedObj'
const maxNum: number = 6 // 红色球或者蓝色球的最大个数
const redArr: Ref<Array<string>> = ref([])
const blueArr: Ref<Array<string>> = ref([])
const blueColorAll: Ref<Array<string>> = ref([])
const redColorAll: Ref<Array<string>> = ref([])
const state: Record<Key, BlueObj> & { tableData: any[] } = reactive({
  blueObj: {},
  redObj: {},
  newRedObj: {},
  tableData: []
})
const isShowAllData: Ref<boolean> = ref(false)


const getBall = (min: number, max: number, maxNumber: number = maxNum) => {
  const arr: string[] = []
  while (arr.length < maxNumber) {
    let num: string
    num = parseInt((Math.random() * (max - min + 1) + min) as any, 10) + ''
    if (Number(num) < 10) num = '0' + num
    if (!arr.includes(num)) arr.push(num)
  }
  const numSort = (a: string, b: string) => {
    return Number(a) - Number(b)
  }
  const newArr = arr.sort(numSort)
  return newArr
}
const handlerClickDoubleColor = () => {
  redArr.value = getBall(1, 33)
  blueArr.value = getBall(1, 16, 1)
}

const dealData = (num: number = 100) => {
  blueColorAll.value = []
  redColorAll.value = []
  state.blueObj = {}
  for (let i = 0, len = dataAll.length; i < len; i++) {
    blueColorAll.value[i] = dataAll[i].blue
    redColorAll.value[i] = dataAll[i].red
    if (i >= num) break
  }
  mathDate()
}
const mathDate = () => {
  for (let i = 0; i < blueColorAll.value.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(state.blueObj, blueColorAll.value[i])) {
      state.blueObj[unref(blueColorAll)[i]] = [unref(blueColorAll)[i]]
    } else {
      state.blueObj[unref(blueColorAll)[i]].push(unref(blueColorAll)[i])
    }
    const arr = unref(redColorAll)[i].split(',')
    for (let v = 0, key: string; v < arr.length; v++) {
      key = '0' + (v + 1)
      if (!Object.prototype.hasOwnProperty.call(state.redObj, key)) {
        state.redObj[key] = [arr[v]]
      } else {
        state.redObj[key].push(arr[v])
      }
    }
  }
  Object.keys(state.redObj).forEach(res => {
    if (!Object.prototype.hasOwnProperty.call(state.newRedObj, res)) {
      state.newRedObj[res] = {}
      state.redObj[res].forEach((r: any) => {
        if (!Object.prototype.hasOwnProperty.call(state.newRedObj[res], r)) {
          state.newRedObj[res][r] = [r]
        } else {
          state.newRedObj[res][r].push(r)
        }
      })
    }
  })
  console.log(state.newRedObj, "redObjjjj")
}

// 处理蓝色球和红色球的个数
const dealBlueAndRed = (num: number = 16) => {
  const arr: string[] = []
  for (let i = 0; i < num; i++) {
    if (i <= 8) {
      arr.push('0' + (i + 1))
    }
    else {
      arr.push((i + 1) + '')
    }
  }
  return arr

}
const handlerClickChnageAll = () => {
  isShowAllData.value = !isShowAllData.value
  isShowAllData.value ? dealData(100) : dealData(30)
}

const backNum = computed(() => {

})

onBeforeMount(() => {
  dealData()
})
console.log(blueColorAll, 'b')
console.log(redColorAll, "r")

console.log(state.blueObj, "blueObj")
</script>


<template>
  <main-card>
    <div class="flex flex-col items-center overflow-y-auto">
      <div class="flex justify-center items-center gap-10 w-full">
        <el-button @click="handlerClickDoubleColor">点击我生成双色球</el-button>
        <el-button>随机生成2注</el-button>
        <el-button>随机生成5注</el-button>
        <el-button @click="handlerClickChnageAll">{{ isShowAllData ? '100天数据' : '30天数据' }}
        </el-button>
      </div>
      <div class="border flex w-450 h-80 justify-center items-center mt-40">
        <div class="flex-1 overflow-hidden flex items-center justify-center gap-20">
          <div class="w-40 h-40 rounded-full bg-red-400 text-white flex justify-center items-center"
            v-for="item in redArr" :key="item + 'asd'">{{ item }}
          </div>
        </div>
        <div class="border-l w-60 h-40 flex items-center justify-center">
          <div class="w-40 h-40 rounded-full bg-blue-400 text-white flex justify-center items-center"
            v-for="item in blueArr" :key="item + 'sdf'">{{ item }}</div>
        </div>
      </div>
      <div class="flex w-full flex-col mt-20">
        <div class="flex flex-col w-full" v-if="true">
          <span class="text-40 font-bold text-red-400">red 概率</span>
          <div class="flex justify-around w-full border">
            <div v-for="res in 6" :key="res + 'e3'">
              <span class="text-30 font-bold">{{ res }}</span>
              <div class="flex flex-col gap-10">
                <div class="text-20 font-bold flex flex-col" v-for="item in dealBlueAndRed(33)">
                  <span>{{ item }}:{{ (state.newRedObj['0' + res][item]?.length) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <span class="text-40 font-bold text-blue-400">blue 概率</span>
          <div class="text-20 font-bold" v-for="item in dealBlueAndRed(16)" :key="item + 'jk'">{{ item }}----{{
              state.blueObj[item]
          }}
            ----{{ (state.blueObj[item].length / 16) * 100 + '%' }}</div>
        </div>
      </div>

      <div class="w-full  h-auto flex flex-col">
        <span class="text-40 font-bold text-red-400">red 概率</span>
        <el-table border :data="state.tableData" style="width: 100%">
          <el-table-column prop="23" :label="item" :key="item + 'lkj'" v-for="item in dealBlueAndRed(6)" />
        </el-table>
      </div>
    </div>

  </main-card>
</template>

<style lang="scss" scoped>
</style>