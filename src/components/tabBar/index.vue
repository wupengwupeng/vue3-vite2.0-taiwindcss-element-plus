<template>
  <div class="w-full h-40 flex items-center px-24 border-b">
    <div
      class="flex items-center mr-24 h-40 hover:cursor-pointer text-14 font-medium"
      :class="{ isActive: isActive === index }"
      v-for="(item, index) in list"
      :key="index"
      @click="handlerClickItem(item, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import type { State, ListItem } from './type'
export default defineComponent({
  name: 'TabBar',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'handlerActive'],
  setup(props, { emit }) {
    const state: State = reactive({
      isActive: 0,
    })
    function handlerClickItem(item: ListItem, index: number) {
      state.isActive = index
      emit('update:modelValue', index)
      emit('handlerActive', index)
    }
    return {
      ...toRefs(state),
      handlerClickItem,
    }
  },
})
</script>

<style lang="scss" scoped>
.isActive {
  color: var(--primary);
  font-weight: 500;
  border-bottom: 1px solid var(--primary);
}
</style>
