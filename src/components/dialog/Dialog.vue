<template>
  <el-dialog v-model="visible" :title="title" destroy-on-close :center="false" v-bind="$attrs" @close="handlerClose">
    <slot />
    <template #footer>
      <el-button size="small" @click="handlerCansole">取消</el-button>
      <el-button size="small" type="primary" @click="handlerSave">保存</el-button>
    </template>
  </el-dialog>
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
  },
  emits: ['submit', 'close', 'update:visible'],
  setup(props, { emit, attrs }) {
    const { visible, title } = useVModels(props, emit)

    function handlerClose() {
      visible.value = false
      emit('close')
    }
    function handlerCansole() {
      handlerClose()
    }
    function handlerSave() {
      emit('submit')
    }
    return {
      visible,
      title,
      ...toRefs(attrs),
      handlerClose,
      handlerCansole,
      handlerSave,
    }
  },
})
</script>