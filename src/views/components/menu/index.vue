<template>
  <div class="w-full  grid  grid-cols-2  gap-12">
    <el-menu default-active="2" class="w-200">
      <el-sub-menu index="1">
        <template #title>
          <app-svg-icon icon-name="fn-pen"></app-svg-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1-1">
          <app-svg-icon icon-name="fn-shezhiq"></app-svg-icon>
          <span>item one</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <app-svg-icon icon-name="fn-shezhiq"></app-svg-icon>
          <span>item two</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <app-svg-icon icon-name="fn-shezhiq"></app-svg-icon>
          <span>item three</span>
        </el-menu-item>
        <el-sub-menu index="1-4">
          <template #title>
            <app-svg-icon icon-name="fn-shezhiq"></app-svg-icon>
            <span>item four</span>
          </template>
          <el-menu-item index="1-4-1">
            <app-svg-icon icon-name="fn-shezhiq"></app-svg-icon>
            <span> one</span>
          </el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu class="w-400" :default-active="route.path" unique-opened router mode="vertical">
        <SideBarItem v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path" />
      </el-menu>
    </el-scrollbar>
    <el-menu :default-active="route.path" unique-opened router mode="horizontal">
      <SideBarItem v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import SideBarItem from '@/layout/components/sidebar/sidebarItem.vue'
import { routes as menuData } from "@/router/modules/index"
import { useRoute } from "vue-router";
console.log(menuData, "menuData")

const route = useRoute()
console.log(route, "route")
</script>