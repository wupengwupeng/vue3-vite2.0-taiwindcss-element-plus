<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  index: {
    type: Number,
  },
  source: { // here is: {uid: 'unique_1', text: 'abc'}
    type: Object,
    default() {
      return {}
    }
  }

})
</script>

<template>
  <div>
    <div>{{ index }} - {{ source.text }}</div>
  </div>
</template>