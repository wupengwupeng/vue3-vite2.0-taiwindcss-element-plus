<script setup lang="ts">
import WangEditor from 'wangeditor'
import { defineExpose, defineEmits, defineProps, onMounted, onBeforeUnmount, ref, unref, Ref, toRefs } from 'vue'
const props = defineProps({
  options: {
    type: Object,
    default: {},
  },
  modelValue: {
    type: String,
    default: '我是WangEditor',
  },
})
const emits = defineEmits(['update:modelValue'])

const { options, modelValue } = toRefs(props)
const editor = ref<Ref<HTMLElement> | null>(null)
let instance: WangEditor
function initEditor() {
  instance = new WangEditor(unref(editor))
  Object.assign(instance.config, {
    onchange() {
      emits('update:modelValue', instance.txt.html())
    },
    ...unref(options),
  })
  instance.create()
  instance.txt.html(unref(modelValue))
}
defineExpose({
  editor,
})
onMounted(initEditor)
onBeforeUnmount(() => {
  instance.destroy()
})
</script>

<template>
  <div ref="editor"></div>
</template>
