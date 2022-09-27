<template>
  <div class="horizontal">
    <div class="logo-vue" v-if="isShowBreadCrumb">
      <logoVue :isCollapse="isCollapse" :isHorizontalNav="isHorizontalNav"></logoVue>
    </div>
    <el-menu class="horizontal-content" :default-active="route.path" menu-trigger="hover" unique-opened router mode="horizontal">
      <sidebarItemVue v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import sidebarItemVue from './sidebarItem.vue'
import logoVue from '../nav/logo.vue'
import { routes as defaultRoutes } from '@/router/modules/index'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
  isHorizontalNav: {
    type: Boolean,
    default: false,
  },
  isShowBreadCrumb: {
    type: Boolean,
    default: true,
  },
})
const route = useRoute()
const menuData = ref(defaultRoutes)
</script>

<style lang="scss" scoped></style>
