<template>
  <Dialog :visible="visibles" :title="'新增'" width="60%" @submit="handlerSave" @close="handlerClose">
    sdfasdfas
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, reactive, computed, unref, watch, isReactive, isRef } from 'vue'
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const visibles = computed(() => { // isRef? true
      const { visible } = props
      return visible
    })
    // const {visible} = props  // isRef? false
    // const {visible} = toRefs(props) // isRef? true
    //console.log(isRef(visibles))
    //console.log(unref(visibles))
    function handlerSave() {
      //console.log('保存')
    }
    function handlerClose() {
      emit('update:visible', false)
    }

    return {
      visibles,
      handlerSave,
      handlerClose,
    }
  },
})
</script>
