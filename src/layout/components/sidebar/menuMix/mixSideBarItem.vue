<template>
  <el-menu-item
    v-if="hasOneShowingChild(props.item.children, props.item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)"
    :index="resolvePath(onlyOneChild.path)"
    @click="handlerMenuItem(props.item, basePath)"
  >
    <app-svg-icon :icon-name="onlyOneChild.meta.icon + ''"></app-svg-icon>
    <template #title>
      <span>{{ onlyOneChild.meta?.title }}</span>
    </template>
  </el-menu-item>
  <template v-else>
    <el-sub-menu :index="resolvePath(props.item!.path)" popper-append-to-body>
      <template #title>
        <app-svg-icon :icon-name="item.meta.icon + ''"></app-svg-icon>
        <span>{{ item?.meta?.title }}</span>
      </template>
      <MixSideBarItem v-for="child in item?.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)"></MixSideBarItem>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="MixSideBarItem">
import { PropType, inject, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import type { childrenType } from '../../../index.type'
import path from 'path'
const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => {},
  },
  basePath: {
    type: String,
    default: '',
  },
})
const onlyOneChild = ref()
const mixSideBarDate: Function = inject('mixSideBarDate')
const route = useRoute()
function handlerMenuItem(item, basePath) {
  if (item.children && item.children.length) {
    mixSideBarDate(item)
  }
}
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
    console.log(path.resolve(props.basePath, routePath), 'resolvePath')
    return path.resolve(props.basePath, routePath)
  }
}
watch(route, () => {
  console.log(route.path, 'route.pat')
  // console.log(resolvePath(props.item?.children[1]?.path + ''), 'basePath')
})
</script>

<style></style>
