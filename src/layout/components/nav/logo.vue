<template>
  <div class="logo-bg">
    <app-svg-icon :style="elImage" icon-name="logo"></app-svg-icon>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, CSSProperties, Ref } from 'vue'
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
  isHorizontalNav: {
    type: Boolean,
    default: false,
  },
})
const elImage: Ref<CSSProperties> = computed(() => {
  return !props.isCollapse && props.isHorizontalNav ? { width: '200px', height: '58px' } : { width: '63px', height: '58px', objectFit: 'contain' }
})
</script>
