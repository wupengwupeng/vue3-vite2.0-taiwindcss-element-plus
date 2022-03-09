<template>
  <div class="px-12 flex flex-col items-center">
    <div class="flex justify-center items-center">
      <change-theme />
      <span>配置主题</span>
    </div>
    <div class="flex flex-wrap gap-12 mt-12">
      <el-button @click="toast">El Message</el-button>
      <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
      <el-button type="success" @click="count++">count is: {{ count }}</el-button>
      <el-button type="warning" @click="count++">count is: {{ count }}</el-button>
      <el-button type="danger" @click="count++">count is: {{ count }}</el-button>
      <el-button type="info" @click="count++">count is: {{ count }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { successMessage } from '@/components/dialog/DialogMessage'
export default defineComponent({
  name: 'Test',
  setup() {
    const count = ref(0)
    function toast() {
      successMessage('sdf', {})
    }
    return {
      count,
      toast,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
