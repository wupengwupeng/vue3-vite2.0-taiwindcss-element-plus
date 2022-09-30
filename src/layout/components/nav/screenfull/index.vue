<script setup lang="ts" name="ScreenFull">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <el-tooltip :show-after="500" :enterable="false" :content="'全屏'">
    <div class="nav-right-button" @click="toggle">
      <app-svg-icon :icon-name="isFullscreen ? 'full_screen' : 'exit_screen'"></app-svg-icon>
    </div>
  </el-tooltip>
</template>
