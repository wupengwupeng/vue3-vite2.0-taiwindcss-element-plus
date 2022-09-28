<script setup lang="ts">
import { ref, watch, unref } from 'vue'
const txt = ref('sdfsdsdfsdf')
</script>

<template>
  <main-card>
    <div class="pt-24">
      <wang-editor v-model="txt"></wang-editor>
    </div>
  </main-card>
</template>
