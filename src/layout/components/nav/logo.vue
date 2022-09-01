<template>
  <div class="h-60 w-full flex items-center justify-center">
    <img :style="elImage" :src="imgSrc" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, CSSProperties, Ref } from 'vue'
import logoUrl from '@/assets/logo.png'
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  },
  isHorizontalNav: {
    type: Boolean,
    default: false
  }
})
const elImage: Ref<CSSProperties> = computed(() => {
  return !props.isCollapse && props.isHorizontalNav ? { width: '200px', height: '60px' } : { width: '63px', height: '60px', objectFit: 'contain' }
})
const imgSrc = ref(logoUrl)
</script>