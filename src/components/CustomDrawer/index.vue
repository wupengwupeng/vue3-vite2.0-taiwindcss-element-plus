<template>
  <el-drawer v-model="props.visible" v-bind="$attrs" @close="handlerClose">
    <template v-for="(index, name) in slots" :key="index + 'gg'" #[name]>
      <slot :name="name"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="CustomDrawer">
import { useSlots } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:visible', 'close'])
const slots = useSlots()
const handlerClose = () => {
  emits('update:visible', false)
  emits('close')
}
</script>
