<template>
  <el-popover ref="target" v-bind="$attrs" placement="top-start" title="Title" :width="200" trigger="click"
    content="this is content, this is content, this is content">
    <template #reference>
      <el-button>Hover to activate</el-button>
    </template>
    <div>
      nihaosdfadf
    </div>
  </el-popover>
</template>

<script setup lang="ts">
// 此popover使用的是outsideclick解决点击内部进行关闭，点击外部也可以进行关闭的问题。
import { ref, Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const target: Ref<null> = ref(null)


</script>