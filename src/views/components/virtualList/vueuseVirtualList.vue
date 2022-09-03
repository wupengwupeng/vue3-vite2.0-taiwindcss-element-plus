<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { useVirtualList } from '@vueuse/core'
const index: Ref = ref()
const search = ref('')
const allItems = Array.from(Array(99999).keys())
  .map(i => ({
    height: i % 2 === 0 ? 42 : 84,
    size: i % 2 === 0 ? 'small' : 'large',
  }))
const filteredItems = computed(() => {
  return allItems.filter(i => i.size.startsWith(search.value.toLowerCase()))
})
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  filteredItems,
  {
    itemHeight: 10,
    overscan: 10,
  },
)
const handleScrollTo = () => {
  scrollTo(index.value)
}
</script>

<template>
  <div class="w-500 h-500 bg-red-50">
    <div v-bind="containerProps" class="w-full h-full">
      <div v-bind="wrapperProps">
        <div v-for="item in list" :key="item.index" style="height: 10px">
          {{ item.index }} Row: {{ item.data }}
        </div>
      </div>
    </div>
  </div>
</template>