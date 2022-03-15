<template>
  <div class="h-screen bg-gray-100">
    <el-menu class="el-menu-vertical-demo" :default-active="activeMenu" router :collapse="isCollapse">
      <el-menu-item index="/test">
        <app-svg-icon icon-name="fn-shezhiq" class="w-20 h-20"></app-svg-icon>
        <span>测试</span>
      </el-menu-item>
      <el-menu-item index="/menuTwo">
        <app-svg-icon icon-name="fn-pen" class="w-20 h-20"></app-svg-icon>
        <span>菜单二</span>
      </el-menu-item>
      <el-menu-item index="/menuThree">
        <app-svg-icon icon-name="fn-pen" class="w-20 h-20"></app-svg-icon>
        <span>菜单三</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { isCollapse } = toRefs(props)
    const activeMenu = ref('/test')
    const route: any = useRoute()
    const router = useRouter()
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
    }
  },
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-top: 1px solid var(--color-gray-200);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
::v-deep(.is-active) {
  background: var(--el-color-primary-light-9);
}
</style>