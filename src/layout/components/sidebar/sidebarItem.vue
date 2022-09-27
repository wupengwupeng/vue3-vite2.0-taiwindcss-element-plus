<template>
  <template
    v-if="
    hasOneShowingChild(props.item!.children, props.item!) &&
    (!onlyOneChild.children || onlyOneChild.noShowingChildren)
  "
  >
    <el-menu-item :index="resolvePath(onlyOneChild.path)" @click="handlerMenuItem(onlyOneChild, basePath)">
      <app-svg-icon :icon-name="onlyOneChild.meta.icon"></app-svg-icon>
      <template #title>
        <span>{{ onlyOneChild.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
  <el-sub-menu v-else :index="resolvePath(props.item!.path)" popper-append-to-body>
    <template #title>
      <app-svg-icon :icon-name="item.meta.icon + ''"></app-svg-icon>
      <span>{{ item?.meta?.title }}</span>
    </template>
    <SideBarItem v-for="child in item?.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)"></SideBarItem>
  </el-sub-menu>
</template>

<script setup lang="ts" name="SideBarItem">
import { ref, PropType, Ref } from 'vue'
import path from 'path'
import { RouteRecordRaw } from 'vue-router'
import type { childrenType } from '../../index.type'
import { navUse } from './navUse'
const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw | any>,
    default: () => {},
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['handlerItem'])
const { handlerRouteAddTags } = navUse()
const onlyOneChild: Ref<childrenType> = ref(null)

function hasOneShowingChild(children: childrenType[] = [], parent: childrenType) {
  const showingChildren = children.filter((item: any) => {
    onlyOneChild.value = item
    return true
  })

  if (showingChildren[0]?.meta?.showParent) {
    return false
  }

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}

function resolvePath(routePath: any) {
  const httpReg = /^http(s?):\/\//
  if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
    return routePath || props.basePath
  } else {
    return path.resolve(props.basePath, routePath)
  }
}
function handlerMenuItem(data: childrenType, basePath: string) {
  const newDate = { ...data, path: basePath }
  handlerRouteAddTags(newDate)
}
</script>

<style lang="scss"></style>
