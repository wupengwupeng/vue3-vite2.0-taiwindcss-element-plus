<template>
  <template v-if="
    hasOneShowingChild(props.item!.children, props.item!) &&
    (!onlyOneChild.children || onlyOneChild.noShowingChildren)
  ">
    <el-menu-item v-bind="$attrs" :index="resolvePath(onlyOneChild.path)">
      <template #title>
        <app-svg-icon :icon-name="onlyOneChild.meta.icon"></app-svg-icon>
        <span>{{  onlyOneChild.meta?.title  }}</span>
      </template>
    </el-menu-item>
  </template>
  <el-sub-menu v-else v-bind="$attrs" :index="resolvePath(props.item!.path)" popper-append-to-body>
    <template #title>
      <app-svg-icon :icon-name="item.meta.icon"></app-svg-icon>
      <span>{{  item?.meta?.title  }}</span>
    </template>
    <SideBarItem v-for="child in item?.children" :key="child.path" :is-nest="true" :item="child"
      :base-path="resolvePath(child.path)" class="nest-menu"></SideBarItem>
  </el-sub-menu>
</template>

<script setup lang="ts" name="SideBarItem">
import { ref, PropType } from 'vue'
import path from "path"
import type { childrenType } from '../../index.type'
const props = defineProps({
  item: {
    type: Object as PropType<childrenType>
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ""
  }
});

const onlyOneChild: childrenType = ref(null);

function hasOneShowingChild(
  children: childrenType[] = [],
  parent: childrenType
) {
  const showingChildren = children.filter((item: any) => {
    onlyOneChild.value = item;
    return true;
  });

  if (showingChildren[0]?.meta?.showParent) {
    return false;
  }

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
}

function resolvePath(routePath: any) {
  const httpReg = /^http(s?):\/\//;
  if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
    return routePath || props.basePath;
  } else {
    console.log(props.basePath, routePath, "path")
    console.log(path.resolve(props.basePath, routePath), "routePath")
    return path.resolve(props.basePath, routePath);
  }
}
</script>
