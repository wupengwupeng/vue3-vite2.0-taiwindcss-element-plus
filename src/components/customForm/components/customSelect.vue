<template>
  <el-select v-bind="$attrs" v-model="val">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      <slot v-if="slots.option" name="option" :item="item"></slot>
    </el-option>
    <template v-if="slots.prefix" #prefix>
      <slot name="prefix">头部</slot>
    </template>
    <!-- 无选项列表的时候 -->
    <template v-if="slots.empty" #empty>
      <slot name="empty"></slot>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref, PropType, computed, useSlots } from 'vue'
type OptionRaw = Array<{
  value: string
  label: string
  disabled?: boolean
}>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<OptionRaw>,
    default: () => []
  }
})
const emits = defineEmits(['update:modelValue'])

const slots = useSlots()
const val = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  }
})
</script>