<script setup lang="ts">
import { ref } from 'vue'
type Button = "default" | "small" | "large"
const small = ref<Button>('default')
</script>
<template>
  <el-config-provider :size="small">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
