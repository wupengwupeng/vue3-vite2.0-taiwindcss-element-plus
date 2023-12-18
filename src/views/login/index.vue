<template>
  <div class="w-full h-screen flex flex-col md:flex-row overflow-hidden">
    <div class="h-1/2 w-full bg-white md:h-full md:w-3/5">
      <el-image style="width: 100%; height: 100%" :src="url" :fit="'fill'" />
    </div>
    <div class="flex-1 flex items-center justify-center">
      <vueLogin />
    </div>
  </div>
</template>

<script lang="ts" setup>
import vueLogin from './components/login.vue'
import { ref } from 'vue'
const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
</script>

<style lang="scss" scoped></style>
