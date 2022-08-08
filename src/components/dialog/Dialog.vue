<template>
  <div v-elDraggableDialog:[isDraggable]>
    <el-dialog v-model="visible" :title="title" destroy-on-close v-bind="$attrs" @close="handlerClose">
      <slot />
      <template #footer>
        <el-button size="small" @click="handlerCansole">{{ cancelText }}</el-button>
        <el-button size="small" type="primary" @click="handlerSave">{{ confirmText }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue'
import { useVModels } from '@vueuse/core'
export default defineComponent({
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '保存'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    isDraggable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['handlerSave', 'close'],
  setup(props, { emit, attrs }) {

    const { visible, title, confirmText, cancelText, isDraggable } = useVModels(props, emit)

    function handlerClose() {
      visible.value = false
      emit('close')
    }
    function handlerCansole() {
      handlerClose()
      emit('close')
    }
    function handlerSave() {
      emit('handlerSave')
    }
    return {
      visible,
      title,
      confirmText,
      cancelText,
      isDraggable,
      ...toRefs(attrs),
      handlerClose,
      handlerCansole,
      handlerSave,
    }
  },
})
</script>