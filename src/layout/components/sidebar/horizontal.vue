<template>
  <div class="w-full h-full flex items-center">
    <div class="w-200 h-full">
      <logoVue :isCollapse="isCollapse" :isHorizontalNav="isHorizontalNav"></logoVue>
    </div>
    <el-menu class="flex-1 overflow-hidden" :default-active="route.path" unique-opened router mode="horizontal"
      menu-trigger="click" background-color="#272a36" text-color="#fff">
      <sidebarItemVue v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import sidebarItemVue from './sidebarItem.vue';
import logoVue from '../nav/logo.vue';
import { routes as defaultRoutes } from '@/router/modules/index'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  },
  isHorizontalNav: {
    type: Boolean,
    default: false
  }
})
const route = useRoute()
const menuData = ref(defaultRoutes)


</script>