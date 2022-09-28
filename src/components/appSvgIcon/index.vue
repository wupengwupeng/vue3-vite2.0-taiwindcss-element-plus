<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  iconName: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <svg class="el-icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + iconName" />
  </svg>
</template>
