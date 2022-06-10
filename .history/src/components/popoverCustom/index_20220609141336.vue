<template>
  <el-popover v-bind="$attrs" ref="popoverRef">
    <template #reference>
      <slot name="header">插槽header</slot>
    </template>
    <div :class="classContent" ref="target">
      <slot>default</slot>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
// 此popover使用的是outsideclick解决点击内部进行关闭，点击外部也可以进行关闭的问题。
import { ref, Ref, onMounted } from 'vue'
import { defaultProps } from './props'
import { onClickOutside } from '@vueuse/core'
const props = defineProps(defaultProps)
const emits = defineEmits(['update:visible'])

const target: Ref<null> = ref(null)
const popoverRef: Ref<null> = ref(null)

onClickOutside(target, (event) => emits('update:visible', false))

onMounted(() => {
  popoverRef.value.visible = true
  console.log(popoverRef.value)
})

</script>


<style lang="scss">
.el-popover.el-popper {
  padding: 0;
}
</style>