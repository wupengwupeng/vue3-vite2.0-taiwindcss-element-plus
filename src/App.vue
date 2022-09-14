<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { messages, locale }: { messages: any; locale: any } = useI18n({
  useScope: 'global',
})
</script>
<template>
  <el-config-provider :locale="messages[locale]">
    <router-view />
  </el-config-provider>
</template>

<style>
body {
  background: var(--background);
  color: #000 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
