<template>
  <div class="px-12 w-full h-full flex flex-col items-center">
    <!-- <div class="flex justify-center items-center">
      <change-theme />
      <span>配置主题</span>
    </div> -->
    <div class="flex flex-wrap gap-12 mt-12">
      <el-button @click="toast">El Message</el-button>
      <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
      <el-button type="success" @click="count++">count is: {{ count }}</el-button>
      <el-button type="warning" @click="count++">count is: {{ count }}</el-button>
      <el-button type="danger" @click="count++">count is: {{ count }}</el-button>
      <el-button type="info" @click="count++">count is: {{ count }}</el-button>
    </div>
    <el-button>
      <template #icon>
        <app-svg-icon icon-name="fn-shezhiq" class="w-20 h-20"></app-svg-icon>
      </template>
      <span>{{ '配置' }}</span>
    </el-button>

    <div class="flex-1 w-full mt-12 flex flex-col items-center">
      <el-button @click="handlerOpen">打开弹框</el-button>
      <div class="">
        <el-link href="https://element.eleme.io" target="_blank">default</el-link>
        <el-link type="primary">primary</el-link>
        <el-link type="success">success</el-link>
        <el-link type="warning">warning</el-link>
        <el-link type="danger">danger</el-link>
        <el-link type="info">info</el-link>
      </div>

      <div><a href="https://www.baidu.com">asdfasdfa</a>asdfasdfa</div>
      <div class="h-100 w-full bg-yellow-300" v-loading="true"></div>
    </div>

    <DetialDialog v-if="visible" v-model:visible="visible"></DetialDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { successMessage } from '@/components/dialog/DialogMessage'
import DetialDialog from './DetialDialog.vue'
export default defineComponent({
  name: 'Test',
  components: {
    DetialDialog,
  },
  setup() {
    const count = ref(0)
    const visible = ref(false)
    function toast() {
      successMessage('sdf', {})
    }
    function handlerOpen() {
      visible.value = true
    }
    return {
      count,
      visible,
      toast,
      handlerOpen,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
