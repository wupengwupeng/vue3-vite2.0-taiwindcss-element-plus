<template>
  <div class="setting-drawer" @click="handlerClick">
    <app-svg-icon icon-name="fn-shezhiq"></app-svg-icon>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['openSetting'])
const handlerClick = () => {
  emits('openSetting')
}
</script>

<style lang="scss" scoped>
.setting-drawer {
  width: 40px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover {
    background-color: #f6f6f6;
    color: #000;
    cursor: pointer;
    svg {
      color: #000;
    }
  }
}
</style>
