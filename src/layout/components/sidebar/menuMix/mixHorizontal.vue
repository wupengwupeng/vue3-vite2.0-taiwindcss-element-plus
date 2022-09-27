<template>
  <div class="mix-horizontal">
    <el-menu class="mix-horizontal-content" :default-active="defaultActive" menu-trigger="hover" unique-opened router mode="horizontal">
      <el-menu-item v-for="item in defaultRoutes" :key="item.path" :index="resolvePath(item) || item.redirect" @click="handlerRoute(item)">
        <app-svg-icon :icon-name="item.meta.icon + ''"></app-svg-icon>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { routes as defaultRoutes } from '@/router/modules/index'
import { getParentPaths, findRouteByPath } from '@/utils/modules/common'
import { emitter } from '@/utils/mitt'
import { navUse } from '../navUse'

const { handlerRouteAddTags } = navUse()

const route = useRoute()
let defaultActive = ref(null)
function getDefaultActive(routePath) {
  // 当前路由的父级路径
  const parentRoutes = getParentPaths(routePath, defaultRoutes)[0]
  // 获取当前路由的激活父级路径
  defaultActive.value = findRouteByPath(parentRoutes, defaultRoutes)?.children[0]?.path
}
// 获取当前路由的寻找祖父级路由信息
function getRouteParents() {
  // 获取第一级的路径
  const parentRoutes = getParentPaths(route.path, defaultRoutes)[0]
  for (let i = 0; i < defaultRoutes.length; i++) {
    if (defaultRoutes[i].path === parentRoutes) {
      return defaultRoutes[i]
    }
  }
}
function resolvePath(route) {
  const httpReg = /^http(s?):\/\//
  const routeChildPath = route.children[0]?.path
  if (httpReg.test(routeChildPath)) {
    return route.path + '/' + routeChildPath
  } else {
    return routeChildPath
  }
}
function handlerRoute(item) {
  const defaultRoute = item.children[0]
  handlerRouteAddTags(defaultRoute)
  emitsCustom(item)
}
function emitsCustom(obj) {
  emitter.emit('emitsCustom', obj)
}
onMounted(() => {
  getDefaultActive(route.path)
  const obj = getRouteParents()
  emitsCustom(obj)
})
</script>

<style></style>
