<template>
  <div class="search-menu" @click="handlerClick">
    <app-svg-icon icon-name="nav-search"></app-svg-icon>
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
