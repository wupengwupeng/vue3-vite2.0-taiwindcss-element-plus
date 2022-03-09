<template>
  <div class="h-screen bg-red-200 overflow-auto">
    <div class="h-500" v-for="item in 3" :key="item">
      asdf
      <app-svg-icon iconName="icon-edit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>
