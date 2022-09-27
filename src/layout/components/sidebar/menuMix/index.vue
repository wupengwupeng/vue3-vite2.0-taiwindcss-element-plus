<template>
  <div class="app-content-menu">
    <logoVue :isCollapse="isCollapse" :isHorizontalNav="isMenuThreeNav"></logoVue>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu class="el-menu-vertical-demo" menu-trigger="click" :default-active="route.path" unique-opened router :collapse="isCollapse">
        <mixSideBarItemVue v-for="routes in menuDate" :key="routes.path" :item="routes" :base-path="routes.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" name="MenuMix">
import { defineComponent, PropType, ref, reactive, watch, toRefs, computed, onMounted, nextTick } from 'vue'
import mixSideBarItemVue from '../sidebarItem.vue'
import logoVue from '../../nav/logo.vue'
import { useRoute, RouteRecordRaw } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    mixSideBarItemVue,
    logoVue,
  },
  props: {
    menuDate: {
      type: Array as PropType<RouteRecordRaw[]>,
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
    isMenuThreeNav: {
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
