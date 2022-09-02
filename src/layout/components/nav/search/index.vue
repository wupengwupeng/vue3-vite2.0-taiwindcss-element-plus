<template>
  <div class="search-menu" @click="handlerClick">
    <app-svg-icon icon-name="nav-search"></app-svg-icon>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["openSearch"])
const handlerClick = () => {
  emits("openSearch")
}
</script>

<style lang="scss" scoped>
.search-menu {
  width: 40px;
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