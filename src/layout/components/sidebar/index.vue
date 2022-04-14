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
          <el-menu-item :index="group.path">
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
    })
    /*
    {
          id: '1',
          pid: '0',
          name: '工作台',
          url: '/dashboard',
          icon: 'el-icon-s-platform',
          children: [],
        },
        {
          id: '2',
          pid: '0',
          name: '教务管理',
          icon: 'el-icon-s-opportunity',
          children: [
            {
              id: '21',
              pid: '2',
              name: '学员中心',
              url: '/educate/student',
            },
            {
              id: '22',
              pid: '2',
              name: '班级管理',
              url: '/educate/class',
            },
            {
              id: '23',
              pid: '2',
              name: '课程管理',
              url: '/educate/course',
            },
            {
              id: '24',
              pid: '2',
              name: '课表管理',
              url: '/educate/table',
            },
          ],
        },
        {
          id: '3',
          pid: '0',
          name: '系统设置',
          icon: 'el-icon-s-opportunity',
          children: [
            {
              id: '31',
              pid: '3',
              name: '基础信息',
              url: '/setting/base',
            },
            {
              id: '32',
              pid: '3',
              name: '职员管理',
              url: '/setting/user',
            },
            {
              id: '33',
              pid: '3',
              name: '岗位管理',
              url: '/setting/role',
            },
          ],
        },
    */
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

.scrollbar-wrapper {
  border-right: 1px solid #272a36;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: calc(100vh - 60px);
}

::v-deep(.is-active) {
  background: var(--el-color-primary-light-9);
}
</style>