<template>
  <div class="overflow-hidden flex items-center">
    <el-button class="border-none bg-opacity-30" size="small">
      <app-svg-icon iconName="arrow-left" @click="handleScroll(180)"></app-svg-icon>
    </el-button>
    <div class="flex-1 overflow-hidden px-5 flex-nowrap" ref="scrollbarDom">
      <div class="flex flex-nowrap gap-8 overflow-visible" ref="tabDom" :style="getTabStyle">
        <el-check-tag v-for="(item, index) in options" :checked="item.checked" @change="(val: any) => changeItem(val, item)" :ref="'dynamic' + index" :key="index" size="small">
          {{ item.name }}
        </el-check-tag>
      </div>
    </div>
    <el-button @click="handleScroll(-180)" class="rotate-180 border-none bg-opacity-30" size="small">
      <app-svg-icon iconName="arrow-left"></app-svg-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
// 标签超出滚动
import { ref, computed, nextTick, getCurrentInstance } from 'vue'
import { OptionsRaw, defaultProps } from './props'
const props = defineProps(defaultProps)
const emits = defineEmits(['changeItem'])
const tabNavPadding = 12
const { ctx: that }: any = getCurrentInstance()
const scrollbarDom = ref()
const tabDom = ref()
const translateX = ref(0)
const getTabStyle = computed(() => {
  return { transform: `translateX(${translateX.value}px)` }
})

const handleScroll = (offset: number) => {
  const scrollbarDomWidth = scrollbarDom.value ? scrollbarDom.value?.offsetWidth : 0
  // It has problem if you use offsetWidth property in dialog. Pleace use scrollWidth property instead of it
  const tabDomWidth = tabDom.value ? tabDom.value.scrollWidth : 0
  if (offset > 0) {
    translateX.value = Math.min(0, translateX.value + offset)
  } else {
    if (scrollbarDomWidth < tabDomWidth) {
      if (translateX.value >= -(tabDomWidth - scrollbarDomWidth)) {
        translateX.value = Math.max(translateX.value + offset, scrollbarDomWidth - tabDomWidth - 10)
      }
    } else {
      translateX.value = 0
    }
  }
}

const moveToView = async (index: number) => {
  await nextTick()
  // TODO development and production is different
  let tabItemEl
  if (process.env.NODE_ENV === 'development') {
    tabItemEl = that.$refs['dynamic' + index][0]?.$el
  } else {
    tabItemEl = that._.refs['dynamic' + index][0]?.$el
  }
  const tabItemElOffsetLeft = (tabItemEl as HTMLElement)?.offsetLeft
  const tabItemOffsetWidth = (tabItemEl as HTMLElement)?.offsetWidth

  // 标签页导航栏可视长度（不包含溢出部分）
  const scrollbarDomWidth = scrollbarDom.value ? scrollbarDom.value?.offsetWidth : 0
  // 已有标签页总长度（包含溢出部分）
  // It has problem if you use offsetWidth property in dialog. Pleace use scrollWidth property instead of it
  const tabDomWidth = tabDom.value ? tabDom.value?.scrollWidth : 0
  if (tabDomWidth < scrollbarDomWidth || tabItemElOffsetLeft === 0) {
    translateX.value = 0
  } else if (tabItemElOffsetLeft < -translateX.value) {
    // 标签在可视区域左侧
    translateX.value = -tabItemElOffsetLeft + tabNavPadding
  } else if (tabItemElOffsetLeft > -translateX.value && tabItemElOffsetLeft + tabItemOffsetWidth < -translateX.value + scrollbarDomWidth) {
    // 标签在可视区域
    translateX.value = Math.min(0, scrollbarDomWidth - tabItemOffsetWidth - tabItemElOffsetLeft - tabNavPadding)
  } else {
    // 标签在可视区域右侧
    translateX.value = -(tabItemElOffsetLeft - (scrollbarDomWidth - tabNavPadding - tabItemOffsetWidth))
  }
}

const changeItem = (val: boolean, item: OptionsRaw) => {
  item.checked = val
  emits('changeItem', { val, item })
}

defineExpose({
  moveToView,
})
</script>

<style lang="scss" scoped>
.el-check-tag {
  background: white;
  border: 1px solid #e6e9ed;
  font-size: 12px;
  border-radius: 9999px;
  color: #111826;
  height: 28px;
}

.el-check-tag:hover {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-color: var(--el-color-primary-light-9);
}

.is-checked {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-color: var(--el-color-primary-light-9);
}
</style>
