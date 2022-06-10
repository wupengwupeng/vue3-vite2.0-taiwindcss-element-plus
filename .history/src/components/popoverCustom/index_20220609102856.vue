<template>
  <el-popover v-bind="$attrs" placement="top-start" :visible="visible" :width="200" trigger="click"
    content="this is content, this is content, this is content">
    <template #reference>
      <slot name="header" />
    </template>
    <div class="p-12" ref="target">
      <slot />
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