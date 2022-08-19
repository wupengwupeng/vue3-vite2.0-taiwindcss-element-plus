<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api'
import utils from '@/utils';
type Button = "default" | "small" | "large"
const small = ref<Button>('default')
console.log(api, "api")
</script>
<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
</script>

<style>
body {
  background: var(--background);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
