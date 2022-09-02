<template>
  <popover-custom v-model:visible="visible">
    <template #header>
      <div class="notice" @click="visible = true">
        <el-badge :value="12" class="item">
          <app-svg-icon icon-name="notification"></app-svg-icon>
        </el-badge>
      </div>
    </template>
    <template #default>
      <div>
        消息通知
      </div>
    </template>
  </popover-custom>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>

<style lang="scss" scoped>
.notice {
  min-width: 56px;
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