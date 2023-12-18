<template>
  <div class="flex gap-12">
    <template v-for="(item, index) in props.formList" :key="index + 'kosd'">
      <div>
        <component :is="item.name" v-model="formDate[item.models]" v-bind="item.props"></component>
      </div>
    </template>
    <template v-for="(res, inds) in props.btnList" :key="inds + 'nld'">
      <CustomButton v-bind="res" @handlerBtn="handlerBtn(res)">
        <svg-icon type="mdi" :path="$midIcon[res.iconName]" :size="20"></svg-icon>
        <span>{{ res.name }}</span>
      </CustomButton>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    default: () => {},
  },
  formList: {
    type: Array as PropType<any>,
    default: () => [],
  },
  btnList: {
    type: Array as PropType<any>,
    default: () => [],
  },
})
const emits = defineEmits(['update:modelValue'])
const formDate = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  },
})

const handlerBtn = res => {
  res.fun(formDate)
}
</script>

<style></style>
