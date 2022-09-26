<template>
  <el-input v-onlyNumber:[arg] v-bind="$attrs" v-model="val">
    <template v-for="(index, name) in slots" :key="index + 'g'" #[name]>
      <slot :name="name"></slot>
    </template>
  </el-input>
</template>

<script setup lang="ts" name="OnlyNumberInput">
import { ref, computed, useSlots, PropType, Ref } from 'vue'
export type Arg = {
  maxLength?: number
  reg?: RegExp
}
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  argOptions: {
    type: Object as PropType<Arg | any>,
    default: () => {
      // maxLength: 5,
      // reg: /[^\d\,]/g
    },
  },
})
const emit = defineEmits(['update:modelValue'])
const arg = stringifyJson(props.argOptions)
const slots = useSlots()
const val = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emit('update:modelValue', v)
  },
})

/**
 * json对象转json字符串
 * @param { Object } json json对象
 */
function stringifyJson(json: { [key: string]: any }) {
  return JSON.stringify(json, (k, v) => {
    // 将正则对象转换为正则字符串
    if (v instanceof RegExp) {
      return v.toString()
    }

    return v
  })
}
</script>
