<template>
  <el-input v-bind="$attrs" v-model="val"></el-input>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const val = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emit('update:modelValue', v)
  }
})
</script>