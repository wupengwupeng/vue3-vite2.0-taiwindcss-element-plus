<template>
  <Dialog :visible="visible" :title="'新增'" width="60%" draggable @submit="handlerSave" @close="handlerClose"> sdfasdfas </Dialog>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, reactive } from 'vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const { visible } = toRefs(props)
    function handlerSave() {
      console.log('保存')
    }
    function handlerClose() {
      emit('update:visible', false)
    }
    return {
      visible,
      handlerSave,
      handlerClose,
    }
  },
})
</script>
