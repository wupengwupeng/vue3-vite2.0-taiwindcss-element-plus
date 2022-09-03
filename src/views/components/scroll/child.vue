<script setup lang="ts">
import { defineProps, defineEmits, unref, toRefs } from 'vue';

const props = defineProps({
  info: {
    type: String,
    default: '你好'
  }
})
const emits = defineEmits(['submit'])
const submit = (): void => {
  emits('submit', "Okay")
}
</script>


<template>
  <div>
    <h1 class="text-30">{{ info }}</h1>
    <el-button @click="submit">submit</el-button>
  </div>
</template>