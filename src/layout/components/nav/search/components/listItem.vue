<template>
  <div class="w-full">
    <el-row>
      <el-col :span="24">
        <div class="menu-item" :class="{ isActive: props.isActive === props.id }" :style="itemStyle" @click="handlerClick(props.item)">
          <app-svg-icon class="rotate-180 text-red-300" icon-name="icon-back-down"></app-svg-icon>
          <span class="ml-5" v-html="replaceSearchTitle(props?.item?.meta?.title)"> </span>
        </div>
        <template v-if="props.item && props.item.children && props.item.children.length > 1">
          <ListItem
            class="w-full"
            v-for="(res, inx) in props.item.children"
            :item="res"
            :depth="props.depth + 1"
            :id="listItemId(inx)"
            :is-active="props.isActive"
            :search-title="props.searchTitle"
            :handlerClick="props.handlerClick"
          />
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="ListItem">
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
  // 搜索的关键字
  searchTitle: {
    type: String,
    defualt: '',
  },
  id: {
    type: String,
    default: '0-0',
  },
  isActive: {
    type: String,
    default: '0-0',
  },
  handlerClick: {
    type: Function,
    required: true,
  },
})
const itemStyle = computed(() => {
  return {
    paddingLeft: `${props.depth * 12}px`,
  }
})
// 替换关键字并添加class
const replaceSearchTitle = (title: string) => {
  const re = title.replace(props.searchTitle, `<span class="active-title">${props.searchTitle}</span>`)
  return re
}

// 子集拼接id
const listItemId = inx => {
  return props.id + '-' + inx
}
const handlerClick = item => {
  props.handlerClick(item)
}
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
  ::v-deep(.active-title) {
    color: var(--el-color-primary) !important;
  }
}
.isActive {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
