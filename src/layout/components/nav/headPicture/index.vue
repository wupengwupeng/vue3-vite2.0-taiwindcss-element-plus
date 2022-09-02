<template>
  <popover-custom v-model:visible="visible">
    <template #header>
      <div class="headPicture" @click="visible = true">
        <el-avatar :size="40" :src="circleUrl" />
        <span>wupeng</span>
      </div>
    </template>
    <template #default>
      <div>
        退出系统
      </div>
    </template>
  </popover-custom>
</template>

<script  lang="ts">
import { defineComponent, ref } from 'vue'
import circleUrl from '@/assets/logo.png'
export default defineComponent({
  setup() {
    const visible = ref(false)
    return {
      circleUrl,
      visible,
    }
  }
})
</script>

<style lang="scss" scoped>
.headPicture {
  min-width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &>span {
    margin: 0px 5px;
  }

  &:hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }
}
</style>