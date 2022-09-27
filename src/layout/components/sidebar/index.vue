<template>
  <div class="app-content-menu">
    <logoVue :isCollapse="isCollapse" :isHorizontalNav="isHorizontalNav"></logoVue>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu class="el-menu-vertical-demo" menu-trigger="click" :default-active="route.path" unique-opened router :collapse="isCollapse">
        <SideBarItem v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRefs, computed, onMounted, nextTick } from 'vue'
import SideBarItem from '@/layout/components/sidebar/sidebarItem.vue'
import logoVue from '../nav/logo.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { routes as defaultRoutes } from '@/router/modules/index'
export default defineComponent({
  components: {
    SideBarItem,
    logoVue,
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
    isHorizontalNav: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { isCollapse } = toRefs(props)
    const store = useStore()
    const route: any = useRoute()
    const state = reactive({
      routess: store.state.routes as any,
      tags: store.state.tags,
      menuData: defaultRoutes,
    })
    return {
      route,
      isCollapse,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped></style>
