<template>
  <main-card>
    <div class="px-12 w-full h-full flex flex-col items-center">
      <!-- <div class="flex justify-center items-center">
      <change-theme />
      <span>配置主题</span>
      </div>-->
      <div class="flex flex-wrap gap-12 mt-12">
        <el-button size="large" @click="toast">El Message</el-button>
        <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
        <el-button type="success" @click="count++">count is: {{ count }}</el-button>
        <el-button type="warning" @click="count++">count is: {{ count }}</el-button>
        <el-button type="danger" @click="count++">count is: {{ count }}</el-button>
        <el-button type="info" @click="count++">count is: {{ count }}</el-button>
      </div>
      <div>
        <el-tag v-for="tag in tags" :key="tag.name" class="mx-1" closable :type="tag.type">{{ tag.name }}</el-tag>
      </div>
      <el-button>
        <template #icon>
          <app-svg-icon icon-name="fn-shezhiq" class="w-20 h-20"></app-svg-icon>
        </template>
        <span>{{ '配置' }}</span>
      </el-button>

      <div class="flex-1 w-full mt-12 flex flex-col items-center">
        <el-button @click="handlerOpen">打开弹框</el-button>
        <div class>
          <el-link href="https://element.eleme.io" target="_blank">default</el-link>
          <el-link type="primary">primary</el-link>
          <el-link type="success">success</el-link>
          <el-link type="warning">warning</el-link>
          <el-link type="danger">danger</el-link>
          <el-link type="info">info</el-link>
        </div>
        <div><a href="https://www.baidu.com/s?wd=vue3">asdfasdfa</a>asdfasdfa</div>
        <div class="h-100 w-full bg-yellow-300" v-loading="true"></div>
      </div>
    </div>
  </main-card>
  <DetialDialog v-if="visible" v-model:visible="visible"></DetialDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { successMessage } from '@/components/Dialog/DialogMessage'
import DetialDialog from './DetialDialog.vue'
export default defineComponent({
  name: 'Test',
  components: {
    DetialDialog,
  },
  setup() {
    const count = ref(0)
    const visible = ref(false)
    const tags = ref<any>([
      { name: 'Tag 1', type: '' },
      { name: 'Tag 2', type: 'success' },
      { name: 'Tag 3', type: 'info' },
      { name: 'Tag 4', type: 'warning' },
      { name: 'Tag 5', type: 'danger' },
    ])
    const a = ref('099999sdddddddd')

    function computedLength() {
      const arr = a.value.split('')
      const newArr = arr
        .map((res, index) => {
          if (arr[index] + '' !== arr[index + 1] + '') {
            return index + 1
          }
        })
        .filter(Boolean)
      const ab = [0, ...newArr]
      const newB = ab
        .map((res, index) => {
          return ab[index + 1] - ab[index]
        })
        .filter(res => !isNaN(res))
      return Math.max(...newB)
    }
    const len = computedLength()
    console.log(len, 'len')

    function test() {
      const name = 'abcabcbb' //需要验证的字符串
      let lcontinuity = 0 //用于连贯个数的计数
      for (var i = 1; i < name.length; i++) {
        if (name[i].charCodeAt(0) - name[i - 1].charCodeAt(0) == 1 || name[i].charCodeAt(0) - name[i - 1].charCodeAt(0) == -1) {
          //1正序连贯；-1倒序连贯
          lcontinuity += 1 //存在连贯：计数+1
        }
      }
      return lcontinuity
    }
    console.log(test(), 'test')
    function toast() {
      successMessage('sdf', {})
    }
    function handlerOpen() {
      visible.value = true
      console.log(visible.value, 'value')
    }
    return {
      tags,
      count,
      visible,
      toast,
      handlerOpen,
    }
  },
})
</script>

<style lang="scss" scoped></style>
