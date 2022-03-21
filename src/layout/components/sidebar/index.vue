<template>
  <div class="h-screen border-r shadow">
    <el-menu class="el-menu-vertical-demo" :default-active="activeMenu" mode router :collapse="isCollapse">
      <template v-for="(item, index) in routess" :key="index + '1'">
        <el-menu-item :index="item.path">
          <app-svg-icon :icon-name="item.meta.iconName" class="w-20 h-20"></app-svg-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRefs, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { isCollapse } = toRefs(props)
    const store = useStore()
    const activeMenu = ref('/test')
    const route: any = useRoute()
    const state: any = reactive({
      routess: store.state.routes,
    })
    watch(
      [() => route.path],
      (newVal: any, oldVal: any) => {
        if (newVal[0] !== oldVal[0]) {
          activeMenu.value = newVal[0]
        } else {
          activeMenu.value = oldVal[0]
        }
      },
      { immediate: true, deep: true }
    )

    return {
      isCollapse,
      activeMenu,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-top: 1px solid var(--color-gray-200);
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
::v-deep(.is-active) {
  background: var(--el-color-primary-light-9);
}
</style>