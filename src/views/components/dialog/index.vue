<template>
  <div>
    <main-card>
      <el-button size="small" @click="openDialog">
        点开侧边栏
      </el-button>
    </main-card>
    <custom-drawer v-if="visible" v-model:visible="visible">
      <template #title>
        <span>设置修改</span>
      </template>
    </custom-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const openDialog = () => {
  visible.value = true
}

</script>