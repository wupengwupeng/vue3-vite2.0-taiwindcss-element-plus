<template>
  <div class="h-screen overflow-auto shadow bg-[#272a36]">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu class="el-menu-vertical-demo" menu-trigger="click" background-color="#272a36" text-color="#e7e7e7"
        :default-active="activeMenu" unique-opened router :collapse="isCollapse">
        <template v-for="(group, index) in routess" :key="index + '1'">
          <!-- <el-sub-menu v-if="group.children && group.children.length > 0" :key="group.id" :index="group.id">
            <template #title>
              <app-svg-icon icon-name="fn-pen" class="w-20 h-20"></app-svg-icon>
              <span>{{ group.name }}</span>
            </template>
            <el-menu-item v-for="menu in group.children" :key="menu.id" :index="menu.url">
              <i class="icon iconfont icon-pointer" style="vertical-align: baseline" />
              {{ menu.name }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :key="group.id" :index="group.url">
            <app-svg-icon icon-name="fn-pen" class="w-20 h-20"></app-svg-icon>
            <span>{{ group.name }}</span>
          </el-menu-item>-->
          <el-menu-item :index="group.path" @click="handlerRouteAddTags(group)">
            <app-svg-icon :icon-name="group.meta.iconName" class="w-20 h-20"></app-svg-icon>
            <template #title>
              <span>{{ group.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRefs, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { RootMutations } from '@/store/type'
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
    const state = reactive({
      routess: store.state.routes as any,
      tags: store.state.tags
    })
    function handlerRouteAddTags(tag: any) {
      const tags = {
        name: tag.meta.title,
        path: tag.path,
        type: '',
        color: '#fff'
      }
      store.commit(RootMutations.SET_TAGS, tags)
    }
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
      handlerRouteAddTags
    }
  },
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-top: 1px solid var(--color-gray-200);
  border-right: none;
}

.scrollbar-wrapper {
  border-right: 1px solid #272a36;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100vh - 260px);
}

::v-deep(.is-active) {
  color: #fff !important;
  background: var(--el-color-primary);
}
</style>