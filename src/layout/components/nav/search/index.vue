<template>
  <div class="search-menu" @click="handlerClick">
    <app-svg-icon icon-name="nav-search"></app-svg-icon>
  </div>
  <SearchDialog v-if="visible" v-model:visible="visible"></SearchDialog>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchDialog from './components/searchDialog.vue'
const emits = defineEmits(["openSearch"])
const visible = ref(false)
const handlerClick = () => {
  visible.value = true
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
    color: #000;
    cursor: pointer;
  }
}
</style>