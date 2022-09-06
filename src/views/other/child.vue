<template>
  <div>
    孙子
    {{ data.name }}
    {{ data.age }}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
  name: 'Child',
  setup() {
    const data: any = inject('my-data')

    return {
      data,
    }
  },
})
</script>
