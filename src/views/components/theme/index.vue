<template>
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
    <h1 class="text-black font-extrabold text-60">asdasdfasfasf</h1>
    <span>asdfasdfadf</span>
    <a href="">nihao</a>

    <custom-ellipsis-box>
      <li class="w-100 h-full bg-red-500 aa">asdfasdfa</li>
      <li class="w-100 h-full bg-yellow-400 aa">kkkkkkkkkkk</li>
      <li class="w-100 h-full bg-yellow-400 aa">adoooooooo</li>
      <li class="w-100 h-full bg-yellow-400 aa">ayyyyyyyyy</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
    </custom-ellipsis-box>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const styleArr = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
const isActive = ref(0)

const handerClickItem = (index: number) => {
  isActive.value = index
}
</script>

<style lang="scss" scoped>
.themActive {
  border: 2px solid var(--el-color-primary);
}
</style>
