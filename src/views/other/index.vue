<template>
  <div>
    provide和inject的测试
    <parent></parent>
    <el-button type="primary" @click="handlerClick">点击我</el-button>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import parent from './parent.vue'
const data = ref({
  name: '李四',
  age: 0,
})
let num = 0
const handlerClick = () => {
  num++
  data.value = {
    name: '张三',
    age: num,
  }
}
provide('my-data', data)
</script>
