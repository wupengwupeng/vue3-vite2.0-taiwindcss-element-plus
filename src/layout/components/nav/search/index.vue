<template>
  <div class="search-menu" @click="handlerClick">
    <app-svg-icon class="mr-4" icon-name="nav-search"></app-svg-icon>
    <span class="text-gray-300 dark:text-white">Search</span>
    <span>Shift+P</span>
  </div>
  <SearchDialog v-if="visible" v-model:visible="visible"></SearchDialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import SearchDialog from './components/searchDialog.vue'
const emits = defineEmits(['openSearch'])
const visible = ref(false)
const downKeyShift = ref(false)
const downKeyP = ref(false)
const handlerClick = () => {
  visible.value = true
  emits('openSearch')
}
const keyBoardShift = () => {
  downKeyShift.value = true
  setTimeout(() => {
    downKeyShift.value = false
  }, 100)
}
const keyBoardP = () => {
  downKeyP.value = true
  setTimeout(() => {
    downKeyP.value = false
  }, 100)
}
watch([downKeyP, downKeyShift], () => {
  if (downKeyP.value && downKeyShift.value) {
    visible.value = true
    emits('openSearch')
  }
})
onKeyStroke(['Shift'], keyBoardShift)
onKeyStroke(['P', 'p'], keyBoardP)
</script>

<style lang="scss" scoped>
.search-menu {
  min-width: 100px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 500;
  span {
    margin: 0px 5px;
  }
  span:nth-child(3) {
    padding: 0 3px;
    border: 1px solid var(--color-gray-300);
    border-radius: 4px;
    color: var(--color-gray-300);
  }

  &:hover {
    // color: #000;
    cursor: pointer;
    span {
      color: var(--color-gray-600);
    }
    span:nth-child(3) {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
    }
  }
}
</style>
