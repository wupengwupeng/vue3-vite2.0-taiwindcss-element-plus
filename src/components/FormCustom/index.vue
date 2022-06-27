<template>
  <div>
    <span>nihao </span>
    <component :is="typeComponent" v-model="name">
    </component>
  </div>
</template>

<script setup lang="ts">
// import CustomInput from '@/components/customForm/index.vue'
const props = defineProps({
  name: [String],
  typeComponent: {
    type: String,
    default: ''
  }
})
</script>