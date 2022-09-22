<template>
  <div class="w-full gap-12">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu class="w-400 h-400" :default-active="route.path" unique-opened router mode="vertical">
        <SideBarItem v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path" />
      </el-menu>
    </el-scrollbar>
    <el-menu class="h-58" :default-active="route.path" unique-opened router mode="horizontal">
      <SideBarItem v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path" />
    </el-menu>
    <div class="h-100"></div>
    <custom-ellipsis-box>
      <li class="w-100 h-full bg-red-500 aa">asdfasdfa</li>
      <li class="w-100 h-full bg-yellow-400 aa">kkkkkkkkkkk</li>
      <li class="w-100 h-full bg-yellow-400 aa">adoooooooo</li>
      <li class="w-100 h-full bg-yellow-400 aa">ayyyyyyyyy</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
      <li class="w-100 h-full bg-yellow-400 aa">adrrrrrrrrrrf</li>
    </custom-ellipsis-box>
  </div>
</template>

<script setup lang="ts">
import SideBarItem from '@/layout/components/sidebar/sidebarItem.vue'
import { routes as menuData } from '@/router/modules/index'
import { useRoute } from 'vue-router'
console.log(menuData, 'menuData')
const route = useRoute()
</script>
<style lang="scss" scoped>
.aa {
  border-right: 1px solid var(--el-color-primary);
}
</style>
