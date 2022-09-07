<template>
  <div>
    <app-svg-icon v-if="isCollapse" class="hover: cursor-pointer rotate-180" icon-name="nav-cebianlan" @click="handlerChangeIcon(false)" />
    <app-svg-icon v-else class="hover: cursor-pointer" icon-name="nav-cebianlan" @click="handlerChangeIcon(true)" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:modelValue', 'handlerClickIcon'])

const isCollapse = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  },
})

function handlerChangeIcon(data: boolean) {
  isCollapse.value = data
  emits('handlerClickIcon', data)
}
</script>
