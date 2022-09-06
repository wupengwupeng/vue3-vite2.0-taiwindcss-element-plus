<script setup lang="ts" name="ScreenFull">
import { useFullscreen } from "@vueuse/core";

const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <div class="screen-full" @click="toggle">
    <app-svg-icon :icon-name="isFullscreen ? 'full_screen' : 'exit_screen'"></app-svg-icon>
  </div>
</template>

<style lang="scss" scoped>
.screen-full {
  width: 40px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover {
    background-color: #f6f6f6;
    color: #000;
    cursor: pointer;
  }
}
</style>
