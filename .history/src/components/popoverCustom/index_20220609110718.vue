<template>
  <el-popover v-bind="$attrs" :visible="visible">
    <template #reference>
      <slot name="header">插槽header</slot>
    </template>
    <div :class="classContent" ref="target">
      <slot>hello你好哇</slot>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
// 此popover使用的是outsideclick解决点击内部进行关闭，点击外部也可以进行关闭的问题。
import { ref, Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  classContent: {
    type: String,
    default: 'p-12'
  }
})
const emits = defineEmits(['update:visible'])

const target: Ref<null> = ref(null)

onClickOutside(target, (event) => emits('update:visible', false))

</script>


<style lang="scss">
.el-popover.el-popper {
  padding: 0;
}
</style>