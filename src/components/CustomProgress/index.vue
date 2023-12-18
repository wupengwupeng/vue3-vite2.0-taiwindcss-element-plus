<template>
  <div class="w-full h-full flex flex-col content-progress">
    <div>
      <div class="w-full">
        <el-steps :active="activeNum" :finish-status="'finish'" :process-status="'finish'">
          <el-step title="Step 1">
            <template #icon>
              <svg-icon type="mdi" :path="$midIcon.mdiReload" :size="20"></svg-icon>
            </template>
          </el-step>
          <el-step title="Step 2" />
          <el-step title="Step 3" />
        </el-steps>
      </div>
    </div>
    <div class="flex-1 overflow-hidden flex">content</div>
    <div class="w-full h-60 flex justify-center items-center">
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="handlerNext(-1)">上一步</el-button>
      <el-button type="primary" @click="handlerNext(1)">下一步</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, defineProps, PropType } from 'vue'

const props = defineProps({
  steps: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
})
const activeNum: Ref<number> = ref(0)
function handlerNext(item) {
  if (item > 0) {
    activeNum.value += 1
    console.log(activeNum, 'sdf')
  } else {
    if (activeNum.value <= 0) return
    activeNum.value -= 1
  }
}
</script>

<style lang="scss" scoped>
.content-progress {
  ::v-deep(.el-step__line) {
    background: transparent;
    border: 2px dashed;
    ::v-deep(.el-step__line-inner) {
      border-width: 0px !important;
    }
  }
}
</style>
