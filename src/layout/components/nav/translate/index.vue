<template>
  <popover-custom v-model:visible="visible">
    <template #header>
      <div class="translate" @click="visible = true">
        <app-svg-icon icon-name="globalization"></app-svg-icon>
      </div>
    </template>
    <template #default>
      <div>
        中文
      </div>
    </template>
  </popover-custom>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>

<style lang="scss" scoped>
.translate {
  min-width: 40px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }
}
</style>