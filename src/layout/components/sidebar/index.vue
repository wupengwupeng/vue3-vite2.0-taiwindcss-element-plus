<template>
  <div class="w-240 h-screen bg-gray-100">
    <el-menu :default-active="activeMenu" router :collapse="isCollapse">
      <el-menu-item index="/test">
        <app-svg-icon icon-name="fn-shezhiq" class="w-20 h-20"></app-svg-icon>
        <span>测试</span>
      </el-menu-item>
      <el-menu-item index="/menuTwo">
        <span>菜单二</span>
      </el-menu-item>
      <el-menu-item index="/menuThree">
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
::v-deep(.is-active) {
  background: var(--el-color-primary-light-9);
}
.aa {
  color: var(--el-color-primary);
}
::v-deep(.el-menu-item:hover) {
  // background: #ede9fe;
}
::v-deep(.el-menu-item:active) {
  // background: #ede9fe;
}
::v-deep(.el-menu-item:focus) {
  // background: #ede9fe;
}
</style>