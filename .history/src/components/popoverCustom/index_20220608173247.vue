<template>
  <div class="content">
    <el-popover v-bind="$attrs" placement="top-start" title="Title" :width="200" trigger="click"
      content="this is content, this is content, this is content">
      <template #reference>
        <el-button>Hover to activate</el-button>
      </template>
      <div ref="target">
        nihaosdfadf
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
// 此popover使用的是outsideclick解决点击内部进行关闭，点击外部也可以进行关闭的问题。
import { ref, Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const target: Ref<null> = ref(null)


onClickOutside(target, (event) => console.log(event, 890))

</script>


<style lang="scss">
.content {
  .el-popover.el-popper {
    padding: 0;
  }
}
</style>