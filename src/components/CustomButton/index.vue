<template>
  <div>
    <el-button v-bind="$attrs" @click="handlerBtn">
      <slot></slot>
    </el-button>
  </div>
</template>

<script setup lang="ts" name="CustomButton">
import { defineExpose, defineEmits } from 'vue'

const emits = defineEmits(['handlerBtn'])
const handlerBtn = () => {
  emits('handlerBtn')
}
</script>

<style></style>
