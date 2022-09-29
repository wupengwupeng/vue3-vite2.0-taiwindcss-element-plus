<template>
  <main-card>
    <div class="w-full h-25">
      <ul class="flex gap-x-12 items-center group">
        <li
          class="w-30 h-30 flex items-center justify-center group-hover: cursor-pointer"
          v-for="(item, index) in styleArr"
          :key="item"
          :style="{ background: item }"
          :class="isActive === index ? 'themActive' : ''"
          @click="handerClickItem(index)"
        ></li>
      </ul>
      <h1 class="font-extrabold text-60">asdasdfasfasf</h1>
      <span>asdfasdfadf</span>
      <a href="">nihao</a>

      <custom-ellipsis-box>
        <li class="w-100 h-24 bg-red-500 flex-shrink-0">kkkkkkkkkkkkk</li>
        <li class="w-100 h-24 bg-yellow-400 flex-shrink-0">kkkkkkkkkkk</li>
        <li class="w-100 h-24 bg-yellow-400 flex-shrink-0">adoooooooo</li>
        <li class="w-100 h-24 bg-yellow-400 flex-shrink-0">ayyyyyyyyy</li>
        <li class="w-100 h-24 bg-yellow-400 flex-shrink-0">adrrrrrrrrrrf</li>
        <li class="w-100 h-24 bg-yellow-400 flex-shrink-0">adrrrrrrrrrrf</li>
        <li class="w-100 h-24 flex-shrink-0">
          <div>
            <el-button class="w-100" size="small" @click="handlerAdd(1)">打开我</el-button>
          </div>
        </li>
        <li class="w-100 h-24 flex-shrink-0">
          <div>
            <el-button class="w-100" size="small" @click="handlerAdd(2)">打开我</el-button>
          </div>
        </li>
        <li class="w-100 h-24 flex-shrink-0">
          <div>
            <el-button class="w-100" size="small" @click="handlerAdd(3)">打开我</el-button>
          </div>
        </li>
      </custom-ellipsis-box>
      <div class="mt-100">
        <el-scrollbar wrap-class="box" :min-size="1" :always="true" ref="scroll" @wheel.native.prevent="changeScroll">
          <div class="content">
            <div class="content-item" v-for="item in 40">
              <span>{{ item }}kkkkkasd</span>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </main-card>
</template>

<script setup lang="ts">
import { ref, Ref, unref, reactive } from 'vue'
const styleArr = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
const isActive = ref(0)

const scroll: Ref<HTMLElement | any> = ref()
const power0 = ref(0)
const power1 = ref(1)
const power2 = ref(2)
const power3 = ref(3)
const power4 = ref(4)
const power5 = ref(5)
const power6 = ref(6)
const power7 = ref(7)
const objReactive = reactive({
  power0: 0,
  power1: 1,
  power2: 2,
  power3: 3,
  power4: 4,
  power5: 5,
  power6: 6,
  power7: 7,
})
const arr = Array(7).fill(4)
const obj = {}
arr.forEach((res, index) => {
  obj['item' + index] = objReactive[`power${index}`]
  // obj['item' + index] = unref(eval(`power${index}`))
})
console.log(obj, 'obj')

const handerClickItem = (index: number) => {
  isActive.value = index
}
const changeScroll = e => {
  console.log(e)
  console.log(scroll.value, 'scroll')
  let wrap = scroll.value.$refs.wrap$
  wrap.scrollLeft = wrap.scrollLeft - e.wheelDelta
}

const handlerAdd = item => {
  console.log(item)
}
</script>

<style lang="scss" scoped>
.themActive {
  border: 2px solid var(--el-color-primary);
}
.content {
  display: flex;
  width: 600px;
  height: 30px;
  .content-item {
    flex-shrink: 0;
    width: 100px;
    height: 30px;
    background-color: red;
    margin-right: 10px;
  }
}
.box {
  &::-webkit-scrollbar {
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    height: 10px;
    background-color: blue;
  }
}
</style>
