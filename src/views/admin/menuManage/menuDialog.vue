<template>
  <div>
    <Dialog :visible="visible" width="600px" title="新增菜单" @close="handlerClose" @handler-save="handlerSave"> 你好 </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, defineProps, defineEmits } from 'vue'

const emits = defineEmits(['update:visible'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const handlerSave = () => {
  console.log('save')
}

const handlerClose = () => {
  emits('update:visible', false)
}
</script>

<style></style>
