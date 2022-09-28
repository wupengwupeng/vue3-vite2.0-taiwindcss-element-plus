<template>
  <article>
    <el-button v-bind="$attrs" :loading="loading" @click="handlerTest">
      <slot>按钮</slot>
    </el-button>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from './fetch'
import { defaultProps } from './props'
const props = defineProps(defaultProps)
const emits = defineEmits(['backData'])

const loading = ref(false)

const handlerTest = () => {
  if (props.fun instanceof Function && props.fun) props.fun()
  if (!props.url) return
  loading.value = true
  api(props.url, props.methods)
    .fetch({})
    .then(([res, data]) => {
      if (res?.code === '1001') {
        loading.value = false
        emits('backData', res)
      } else {
        emits('backData', data)
      }
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 2000)
    })
}
</script>
