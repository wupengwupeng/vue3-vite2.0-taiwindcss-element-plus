<template>
  <div class="w-240 h-screen aa">
    <el-menu :default-active="activeMenu" router>
      <el-menu-item index="/test">
        <span>测试</span>
      </el-menu-item>
      <el-menu-item index="/menuTwo">
        <span>菜单二</span>
      </el-menu-item>
      <el-menu-item index="/menuThree">
        <span>菜单三</span>
      </el-menu-item>
      <!-- <el-menu-item index="/test">
        <span>测试</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  setup() {
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
      activeMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.aa {
  // background: var(--el-color-primary-light-5);
}
::v-deep(.is-active) {
  background: var(--el-color-primary-light-9);
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