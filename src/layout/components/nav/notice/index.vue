<template>
  <el-tooltip :show-after="500" :enterable="false" :content="'通知'">
    <div class="nav-right-button-notice" @click="visible = true">
      <el-badge :value="12" class="item">
        <app-svg-icon icon-name="notification"></app-svg-icon>
      </el-badge>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>

<style lang="scss" scoped></style>
