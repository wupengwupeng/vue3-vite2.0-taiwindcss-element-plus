<template>
  <div class="h-screen w-screen flex" v-resize>
    <div class="flex flex-col" v-if="isHideSideBar && isHorizontalNav">
      <logoVue :isCollapse="isCollapse" :isHorizontalNav="isHorizontalNav"></logoVue>
      <SideBar :isCollapse="isCollapse" />
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <NavBar v-model="isCollapse" :isHorizontalNav="!isHorizontalNav" />
      <div class="flex-1 overflow-hidden">
        <AppMain></AppMain>
      </div>
    </div>
    <three-d></three-d>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, computed, watch } from 'vue'
import SideBar from './components/sidebar/index.vue'
import NavBar from './components/nav/index.vue'
import logoVue from './components/nav/logo.vue'
import AppMain from './components/appMain/index.vue'
import { emitter } from "@/utils/mitt";
import { deviceDetection } from '@/utils/index'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    SideBar,
    NavBar,
    AppMain,
    logoVue,
  },
  setup() {
    const isCollapse = ref()
    const isHideSideBar = ref(true)
    const isMobile = deviceDetection()
    const store = useStore()
    const isHorizontalNav = computed(() => {
      return store.state.config.nav === '1'
    })

    // 监听容器
    emitter.on("resize", ({ detail }) => {
      if (isMobile) return;
      let { width } = detail;
      /** width app-wrapper类容器宽度
       * 0 < width <= 760 隐藏侧边栏
       * 760 < width <= 990 折叠侧边栏
       * width > 990 展开侧边栏
       */
      if (width > 0 && width <= 760) {
        isHideSideBar.value = false
      } else if (width > 760 && width <= 990) {
        isCollapse.value = true
        isHideSideBar.value = true
      } else if (width > 990) {
        isHideSideBar.value = true
        isCollapse.value = false
      }
    });
    return {
      isHorizontalNav,
      isCollapse,

      isHideSideBar,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
