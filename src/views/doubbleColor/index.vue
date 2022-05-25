<script setup lang="ts">
import { reactive, Ref, ref, unref } from 'vue'

const maxNum: number = 6 // 红色球或者蓝色球的最大个数
const redArr: Ref<Array<string>> = ref([])
const blueArr: Ref<Array<string>> = ref([])

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
</script>


<template>
  <main-card class="flex flex-col items-center justify-center">
    <div class="flex justify-center items-center gap-10 w-full">
      <el-button @click="handlerClickDoubleColor">点击我生成双色球</el-button>
      <el-button>随机生成2注</el-button>
      <el-button>随机生成5注</el-button>
    </div>
    <div class="border flex w-450 h-60 justify-center items-center mt-40">
      <div class="flex-1 flex items-center justify-center gap-20">
        <div class="w-40 h-40 rounded-full bg-red-400 text-white flex justify-center items-center"
          v-for="item in redArr">{{ item }}
        </div>
      </div>
      <div class="border-l w-60 h-40 flex items-center justify-center">
        <div class="w-40 h-40 rounded-full bg-blue-400 text-white flex justify-center items-center"
          v-for="item in blueArr">{{ item }}</div>
      </div>
    </div>
  </main-card>
</template>

<style lang="scss" scoped>
</style>