<template>
  <div class="w-full">
    <el-row>
      <el-col :span="24">
        <div class="select-item" :class="{ isActive: isActiveShow }" :style="selectItem" @click.stop="handlerClickItem(props.item)">
          <app-svg-icon v-if="props.item.children && props.item.children.length" :class="isExpand ? '' : '-rotate-90'" icon-name="icon-select-down"></app-svg-icon>
          <span class="select-item-title">{{ props.item.name }}</span>
        </div>
        <template v-if="props.item && props.item.children && props.item.children.length && isExpand">
          <tree-list
            v-for="(res, index) in props.item.children"
            :key="index + res.name"
            :item="res"
            :depth="props.depth + 1"
            :id="listItemId(res.name)"
            :is-active="props.isActive"
            :handlerClick="props.handlerClick"
          ></tree-list>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="TreeList">
import { ref, computed, watch } from 'vue'
const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => {},
  },
  depth: {
    type: Number,
    default: 1,
  },
  id: {
    type: String,
    default: '',
  },
  isActive: {
    type: String,
    default: '',
  },
  handlerClick: {
    type: Function,
    required: true,
  },
})
const isExpand = ref(false)

// 子集拼接id
const listItemId = name => {
  return props.id + '^' + name
}
const isActiveShow = computed(() => {
  const hasChildren = props.item.children && props.item.children.length > 0
  return props.isActive === props.id
})
const selectItem = computed(() => {
  return {
    paddingLeft: `${props.depth * 12}px`,
  }
})
// - 是否展开组件形式 二 使用字段展示
const handlerClickItem = item => {
  props.handlerClick(item)
  if (item.children && item.children.length) {
    isExpand.value = !isExpand.value
  }
}
</script>

<style lang="scss" scoped>
.select-item {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  border-radius: 6px;
  &-title {
    margin-left: 5px;
  }
  &:hover {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
}
.isActive {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
