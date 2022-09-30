<template>
  <el-tooltip :show-after="500" :enterable="false" :content="'设置'">
    <div class="nav-right-button" @click="handlerClick">
      <app-svg-icon icon-name="fn-shezhiq"></app-svg-icon>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
const emits = defineEmits(['openSetting'])
const handlerClick = () => {
  emits('openSetting')
}
</script>
