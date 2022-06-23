<template>
  <el-input v-bind="$attrs" v-model="val">
    <template v-for="(index, name) in slots" :key="index + 'g'" #[name]>
      <slot :name="name"></slot>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const slots = useSlots()
const val = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emit('update:modelValue', v)
  }
})
</script>