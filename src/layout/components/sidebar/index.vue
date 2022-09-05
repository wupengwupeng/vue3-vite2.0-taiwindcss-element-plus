<template>
  <div class="h-screen overflow-auto shadow app-content">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu class="el-menu-vertical-demo" menu-trigger="click" :default-active="route.path" unique-opened router
        :collapse="isCollapse">
        <SideBarItem v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRefs, computed, onMounted, nextTick } from 'vue'
import SideBarItem from '@/layout/components/sidebar/sidebarItem.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { routes as defaultRoutes } from '@/router/modules/index'
export default defineComponent({
  components: {
    SideBarItem
  },
  props: {
    isCollapse: {
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
      menuData: defaultRoutes
    })
    return {
      route,
      isCollapse,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
.app-content {
  // background: var(--backgroudcolor);
  border-right: 1px solid var(--color-gray-200);
}

.scrollbar-wrapper {
  border-right: 1px solid #272a36;
}

.el-menu-vertical-demo {
  border-top: 1px solid var(--color-gray-200);
  border-right: none;

  &:not(.el-menu--collapse) {
    width: 200px;
    height: calc(100vh - 260px);
  }

  ::v-deep(.el-menu-item.is-active) {
    background: var(--el-color-primary-light-9);
  }

}
</style>