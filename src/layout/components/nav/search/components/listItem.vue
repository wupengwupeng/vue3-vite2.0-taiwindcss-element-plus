<template>
  <div class="w-full">
    <el-row>
      <el-col :span="24">
        <div class="menu-item" :class="{ isActive: props.isActive === props.id }" :style="itemStyle">
          <app-svg-icon class="rotate-180 text-red-300" icon-name="icon-back-down"></app-svg-icon>
          <span class="ml-5">{{ props?.item?.meta?.title }}</span>
        </div>
        <template v-if="props.item && props.item.children && props.item.children.length > 1">
          <list-item class="w-full" v-for="(res, inx) in props.item.children" :item="res" :depth="props.depth + 1" :id="listItemId(inx)" :is-active="props.isActive" />
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw | any>,
  },
  depth: {
    type: Number,
    default: 0,
  },
  id: {
    type: String,
    default: '0-0',
  },
  isActive: {
    type: String,
    default: '0-0',
  },
})
const itemStyle = computed(() => {
  return {
    paddingLeft: `${props.depth * 12}px`,
  }
})

// 子集拼接id
const listItemId = inx => {
  return props.id + '-' + inx
}
console.log(props.id, 'id')
</script>

<style lang="scss" scoped>
.menu-item {
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 8px;
  margin-top: 8px;
  &:hover {
    cursor: pointer;
    border: 1px solid var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
}
.isActive {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
