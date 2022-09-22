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

</style>
